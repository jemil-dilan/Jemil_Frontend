import * as React from 'react';
import { authKey, secureStoreOptions } from './auth/store';

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

function useUpload() {
  const [loading, setLoading] = React.useState(false);

  const uploadToServer = React.useCallback(async (input) => {
    const headers = {};
    try {
      const { SecureStore } = require('expo-secure-store');
      const authStr = await SecureStore.getItemAsync(authKey, secureStoreOptions);
      if (authStr) {
        const auth = JSON.parse(authStr);
        if (auth?.jwt) headers["authorization"] = `Bearer ${auth.jwt}`;
      }
    } catch {}

    const endpoint = `${baseURL}/api/upload`;

    if ("reactNativeAsset" in input && input.reactNativeAsset) {
      const asset = input.reactNativeAsset;
      const FileSystem = require("expo-file-system/legacy");
      const uploadResult = await FileSystem.uploadAsync(endpoint, asset.uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        headers,
      });
      if (uploadResult.status < 200 || uploadResult.status >= 300) {
        throw new Error(`Upload failed (${uploadResult.status}): ${uploadResult.body}`);
      }
      const data = JSON.parse(uploadResult.body);
      return { url: data.url, mimeType: data.mimeType || null };
    }

    let response;
    if ("url" in input) {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ url: input.url })
      });
    } else if ("base64" in input) {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ base64: input.base64 })
      });
    } else {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream", ...headers },
        body: input.buffer
      });
    }
    if (!response || !response.ok) {
      if (response?.status === 413) {
        throw new Error("Upload failed: File too large.");
      }
      const body = await response?.text().catch(() => "");
      throw new Error(`Upload failed (${response?.status ?? "no response"}): ${body}`);
    }
    const data = await response.json();
    return { url: data.url, mimeType: data.mimeType || null };
  }, []);

  const upload = React.useCallback(async (input) => {
    try {
      setLoading(true);
      return await uploadToServer(input);
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return { error: uploadError.message };
      }
      if (typeof uploadError === "string") {
        return { error: uploadError };
      }
      return { error: "Upload failed" };
    } finally {
      setLoading(false);
    }
  }, [uploadToServer]);

  return [upload, { loading }];
}

export { useUpload };
export default useUpload;