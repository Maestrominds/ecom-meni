import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';
    
    try {
        const res = await fetch(`${baseUrl}/public/products`);
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await res.json();
        return { products };
    } catch (e) {
        console.error('Error fetching products:', e);
        return { products: [] };
    }
};
