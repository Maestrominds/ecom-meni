import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = ({ cookies }: RequestEvent) => {
    // Delete the admin token
    cookies.delete('admin_token', { path: '/' });
    
    // Respond with a success JSON so the client can redirect
    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
    });
};
