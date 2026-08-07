import { env } from '$env/dynamic/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
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

    const announcement = await fetchGracefully(`${baseUrl}/public/announcement`, { Text: '', LinkUrl: '', IsActive: false });

    return {
        announcement
    };
};
