import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    // If the SvelteKit server is fetching from the local Go backend
    if (request.url.startsWith('http://localhost:8080/')) {
        const userToken = event.cookies.get('user_token');
        const adminToken = event.cookies.get('admin_token');
        const token = adminToken || userToken;
        
        if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
        }
    }
    return fetch(request);
};
