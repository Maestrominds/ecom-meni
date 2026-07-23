import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = ({ cookies }) => {
    // If already logged in, redirect to dashboard
    if (cookies.get('admin_token')) {
        throw redirect(303, '/admin/dashboard');
    }
    return {};
};

export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return fail(400, { email, missing: true });
        }

        try {
            const response = await fetch(`${env.PUBLIC_API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const resData = await response.json().catch(() => null);
                return fail(response.status, { 
                    email, 
                    error: resData?.error || 'Invalid email or password.' 
                });
            }

            const resData = await response.json();
            
            // Set the JWT token in an HttpOnly cookie securely
            cookies.set('admin_token', resData.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

        } catch (err) {
            console.error('Login error:', err);
            return fail(500, { email, error: 'Internal server error while connecting to the API.' });
        }

        // Redirect to dashboard on success
        throw redirect(303, '/admin/dashboard');
    }
} satisfies Actions;
