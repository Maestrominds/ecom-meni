import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = '/api';

    try {
        const res = await fetch(`${baseUrl}/admin/orders`);
        if (!res.ok) {
            throw new Error('Failed to fetch orders');
        }
        
        const orders = await res.json();
        return { orders: Array.isArray(orders) ? orders : [] };
    } catch (e) {
        console.error('Error fetching orders:', e);
        return {
            orders: []
        };
    }
};
