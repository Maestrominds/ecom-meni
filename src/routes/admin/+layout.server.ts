import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, url }) => {
    const token = cookies.get('admin_token');
    const isLoginPage = url.pathname.startsWith('/admin/login');

    if (!token && !isLoginPage) {
        throw redirect(303, '/admin/login');
    }

    // Optionally pass the token to child pages if they need to make client-side requests,
    // but typically we'll use server-side load functions to fetch data securely.
    return {
        hasToken: !!token
    };
};
