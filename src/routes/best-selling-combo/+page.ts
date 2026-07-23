import { api } from '$lib/data/mockApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const products = await api.products.getByCategory('Combo');
    return { products };
};
