import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

    // Helper to gracefully fetch and return an empty array/object on failure
    const fetchGracefully = async (url: string, fallback: any) => {
        try {
            const res = await fetch(url);
            if (!res.ok) return fallback;
            return await res.json();
        } catch (e) {
            console.error(`Error fetching ${url}:`, e);
            return fallback;
        }
    };

    // Fetch all required data concurrently
    const [banners, announcement, reviews, socialLinks, blogs, videos] = await Promise.all([
        fetchGracefully(`${baseUrl}/admin/content/banners`, []),
        fetchGracefully(`${baseUrl}/admin/content/announcement`, { text: '', link_url: '', is_active: false }),
        fetchGracefully(`${baseUrl}/admin/content/reviews`, []),
        fetchGracefully(`${baseUrl}/admin/content/social-links`, []),
        fetchGracefully(`${baseUrl}/public/blogs`, []),
        fetchGracefully(`${baseUrl}/admin/videos`, [])
    ]);

    return {
        banners,
        announcement,
        reviews,
        socialLinks,
        blogs,
        videos
    };
};
