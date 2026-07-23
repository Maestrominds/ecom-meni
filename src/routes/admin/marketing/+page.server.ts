import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('admin_token');

    try {
        const response = await fetch(`${env.PUBLIC_API_URL}/admin/coupons`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch coupons: ${response.statusText}`);
        }

        const data = await response.json();
        
        return {
            coupons: data || []
        };
    } catch (err) {
        console.error('Error fetching coupons:', err);
        return {
            coupons: []
        };
    }
};
