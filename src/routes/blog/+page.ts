import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${baseUrl}/public/blogs`);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        
        const rawBlogs = await res.json();
        const blogs = (rawBlogs || []).map((b: any) => ({
            id: b.ID,
            title: b.Title,
            body: b.Body,
            excerpt: b.Body ? b.Body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 120) + '...' : '',
            cover_image_url: b.CoverImageUrl || '',
            created_at: b.CreatedAt
        }));
        return { blogs };
    } catch (e) {
        console.error(e);
        return { blogs: [] };
    }
};
