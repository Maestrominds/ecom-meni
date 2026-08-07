import { api } from '$lib/data/mockApi';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const product = await api.products.getById(params.id);
    
    if (!product) {
        throw error(404, 'Product not found');
    }

    let reviews = [];
    try {
        const res = await fetch(`/api/public/products/${params.id}/reviews`);
        if (res.ok) {
            reviews = await res.json();
        }
    } catch (e) {
        console.error('Failed to load reviews', e);
    }

    return {
        product,
        reviews
    };
};
