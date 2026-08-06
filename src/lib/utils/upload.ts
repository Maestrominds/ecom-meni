import { env } from '$env/dynamic/public';

const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

export async function uploadImage(file: File): Promise<string> {
  // 1. Get the upload signature from our backend
  const signRes = await fetch(`${baseUrl}/admin/upload/presigned-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, content_type: file.type })
  });
  
  if (!signRes.ok) {
    throw new Error('Failed to get upload signature from backend');
  }
  
  const { timestamp, signature, api_key, cloud_name } = await signRes.json();
  
  // 2. Upload to Cloudinary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', api_key);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
    method: 'POST',
    body: formData
  });
  
  if (!uploadRes.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }
  
  const uploadData = await uploadRes.json();
  
  // Return the secure URL to be saved in the database
  return uploadData.secure_url;
}
