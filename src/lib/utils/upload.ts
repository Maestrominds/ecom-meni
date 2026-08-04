import { env } from '$env/dynamic/public';

const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

export async function uploadToR2(file: File): Promise<string> {
  // 1. Get the upload presigned URL from our backend
  const presignRes = await fetch(`${baseUrl}/admin/upload/r2-presigned-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, content_type: file.type })
  });
  
  if (!presignRes.ok) {
    throw new Error('Failed to get R2 presigned URL from backend');
  }
  
  const { upload_url, public_url } = await presignRes.json();
  
  // 2. Upload directly to Cloudflare R2 using the presigned URL (S3 compatible PUT)
  const uploadRes = await fetch(upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type
    },
    body: file
  });
  
  if (!uploadRes.ok) {
    throw new Error('Failed to upload file to Cloudflare R2');
  }
  
  // Return the public URL to be saved in the database
  return public_url;
}
