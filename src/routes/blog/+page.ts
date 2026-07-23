import { api } from '$lib/data/mockApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const blogs = await api.blogs.getAll();
    return { blogs };
};
