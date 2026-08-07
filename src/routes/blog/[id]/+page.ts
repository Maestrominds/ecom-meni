import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const baseUrl = '/api';

    try {
        const res = await fetch(`${baseUrl}/public/blogs`);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        
        const blogs = await res.json();
        const blog = blogs.find((b: any) => b.ID === params.id);
        const relatedBlogs = (blogs || [])
            .filter((b: any) => b.ID !== params.id)
            .map((b: any) => ({
                id: b.ID,
                date: new Date(b.CreatedAt || Date.now()).toLocaleDateString(),
                title: b.Title,
                excerpt: b.Body ? b.Body.substring(0, 80) + '...' : '',
                img: b.CoverImageUrl?.String || b.CoverImageUrl || ''
            }))
            .slice(0, 3);
        
        return {
            blog,
            relatedBlogs
        };
    } catch (e) {
        console.error('Error fetching blog:', e);
        return {
            blog: null,
            relatedBlogs: []
        };
    }
};
