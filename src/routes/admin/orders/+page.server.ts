import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('admin_token');

    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/admin/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        
        return {
            orders: data || []
        };
    } catch (err) {
        console.error('Error fetching orders:', err);
        return {
            orders: []
        };
    }
};
