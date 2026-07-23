import { api } from '$lib/data/mockApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const products = await api.products.getByCategory('Hair Wellness');
    return { products };
};
