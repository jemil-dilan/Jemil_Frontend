async function upload({ url, buffer, base64 } = {}) {
  // TODO: Replace with your own upload solution (e.g. Uploadcare, Cloudinary, S3)
  // The previous implementation used api.anything.com which is no longer available.
  if (url) {
    return { url, mimeType: null };
  }
  throw new Error('Upload not configured. Set up your own upload endpoint.');
}
export { upload };
export default upload;