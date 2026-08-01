// @ts-ignore
import { env } from '$env/dynamic/public';

export function getApiUrl(customUrl?: string): string {
    let url = (customUrl || (typeof env !== 'undefined' && env.PUBLIC_API_URL) || 'https://meni-server-sipl.onrender.com/api').trim();
    url = url.replace(/\/+$/, ''); // Remove trailing slash
    if (url.endsWith('/v1')) {
        url = url.slice(0, -3); // Strip /v1 if set in Vercel env vars
    }
    return url;
}
