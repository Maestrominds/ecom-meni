import { api } from '$lib/data/mockApi';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const product = await api.products.getById(params.id);
    
    if (!product) {
        throw error(404, 'Product not found');
    }

    return {
        product
    };
};
