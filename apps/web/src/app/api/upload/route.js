import { upload } from '../utils/upload';

export async function POST(request) {
  try {
    const contentType = request.headers.get('Content-Type') || '';

    if (contentType.includes('application/octet-stream')) {
      const buffer = await request.arrayBuffer();
      const result = await upload({ buffer: Buffer.from(buffer) });
      return Response.json(result);
    }

    const body = await request.json();
    const result = await upload({ url: body.url, base64: body.base64 });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    );
  }
}