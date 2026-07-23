import { api } from '$lib/data/mockApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const products = await api.products.getAll();
    const blogs = await api.blogs.getAll();

    return {
        products,
        blogs
    };
};
