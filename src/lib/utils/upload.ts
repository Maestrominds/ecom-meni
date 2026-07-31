import { env } from '$env/dynamic/public';

const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

export async function uploadToCloudinary(file: File): Promise<string> {
  // 1. Get the upload signature from our backend
  const presignRes = await fetch(`${baseUrl}/admin/upload/presigned-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, content_type: file.type })
  });
  
  if (!presignRes.ok) {
    throw new Error('Failed to get Cloudinary upload signature from backend');
  }
  
  const { timestamp, signature, api_key, cloud_name } = await presignRes.json();
  
  // 2. Upload directly to Cloudinary using the signature
  const formData = new FormData();
  formData.append('file', file);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('api_key', api_key);
  
  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, {
    method: 'POST',
    body: formData
  });
  
  if (!uploadRes.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }
  
  const uploadData = await uploadRes.json();
  return uploadData.secure_url;
}
