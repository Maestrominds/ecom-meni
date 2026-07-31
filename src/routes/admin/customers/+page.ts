import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

    try {
        const res = await fetch(`${baseUrl}/admin/customers`);
        if (!res.ok) {
            throw new Error('Failed to fetch customers');
        }
        
        const customers = await res.json();
        return { customers: Array.isArray(customers) ? customers : [] };
    } catch (e) {
        console.error('Error fetching customers:', e);
        return {
            customers: []
        };
    }
};
