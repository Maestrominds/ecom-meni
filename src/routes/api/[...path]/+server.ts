import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const BACKEND_URL = env.PUBLIC_API_URL || 'http://localhost:8080';

export const fallback: RequestHandler = async ({ request, cookies, params, fetch }) => {
    const path = params.path || '';
    const url = new URL(request.url);
    
    // Safely combine BACKEND_URL and the path without stripping paths in BACKEND_URL
    let base = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
    let route = path.startsWith('/') ? path : `/${path}`;
    const backendUrl = new URL(`${base}${route}${url.search}`);

    // Prepare headers
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('origin');
    headers.delete('referer');
    headers.delete('connection');

    // Inject JWT token from cookies
    const userToken = cookies.get('user_token');
    const adminToken = cookies.get('admin_token');
    
    let token = '';
    if (path.startsWith('admin/')) {
        token = adminToken || '';
    } else if (path.startsWith('customer/')) {
        token = userToken || '';
    } else {
        token = adminToken || userToken || '';
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await fetch(backendUrl.toString(), {
            method: request.method,
            headers,
            body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined,
            duplex: 'half' // Needed for streaming bodies in Node.js
        });

        // Create a new response with the backend's data and status
        const responseHeaders = new Headers(response.headers);
        // Clean up some headers that might cause issues when proxying
        responseHeaders.delete('content-encoding');
        responseHeaders.delete('content-length');
        responseHeaders.delete('transfer-encoding');

        if (response.status === 401) {
            // If backend rejects the token, force clear it on the frontend to prevent infinite 401 loops
            responseHeaders.append('Set-Cookie', 'admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
            responseHeaders.append('Set-Cookie', 'user_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
        }
        
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });
    } catch (e) {
        console.error('API Proxy Error:', e);
        throw error(502, 'Bad Gateway: Cannot connect to backend API');
    }
};
