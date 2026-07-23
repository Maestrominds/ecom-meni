import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('admin_token');

    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/admin/customers`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch customers: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transform backend data to match frontend expectations if necessary
        // Assuming backend returns an array of customers
        return {
            customers: data || []
        };
    } catch (err) {
        console.error('Error fetching customers:', err);
        return {
            customers: []
        };
    }
};
