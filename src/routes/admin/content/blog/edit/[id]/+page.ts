import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';
    
    try {
        const res = await fetch(`${baseUrl}/public/blogs`);
        if (res.ok) {
            const blogs = await res.json();
            const blog = blogs.find((b: any) => b.ID === params.id);
            if (blog) return { blog };
        }
    } catch (e) {
        console.error(e);
    }
    
    return { blog: null };
};
