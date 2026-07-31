import { api } from '$lib/data/mockApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    try {
        const products = await api.products.getAll();
        return { products };
    } catch (e) {
        console.error('Error fetching products for shop:', e);
        return { products: [] };
    }
};
