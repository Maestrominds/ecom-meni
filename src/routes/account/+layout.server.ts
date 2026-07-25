import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
    const userToken = cookies.get('user_token');
    
    // Redirect to login if user is not authenticated
    if (!userToken) {
        throw redirect(303, '/login');
    }

    return {};
};
