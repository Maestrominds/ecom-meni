import { api } from '$lib/data/mockApi';
import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = '/api';

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

    const [products, banners, socialLinks, blogs, videos] = await Promise.all([
        fetchGracefully(`${baseUrl}/public/products`, []),
        fetchGracefully(`${baseUrl}/public/banners`, []),
        fetchGracefully(`${baseUrl}/public/social-links`, []),
        fetchGracefully(`${baseUrl}/public/blogs`, []),
        fetchGracefully(`${baseUrl}/public/videos`, [])
    ]);

    return {
        products,
        banners,
        socialLinks,
        blogs,
        videos
    };
};
