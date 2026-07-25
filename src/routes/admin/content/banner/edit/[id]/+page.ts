import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const bannerId = params.id;
    const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api/v1';

    // If 'new', we return an empty template
    if (bannerId === 'new') {
        return {
            banner: null,
            isNew: true
        };
    }

    try {
        const res = await fetch(`${baseUrl}/admin/content/banners`);
        if (!res.ok) {
            console.error('Failed to fetch banners');
            return { banner: null, isNew: false };
        }
        
        const banners = await res.json();
        const banner = banners.find((b: any) => b.ID === bannerId);
        
        return {
            banner,
            isNew: false
        };
    } catch (e) {
        console.error('Error fetching banner:', e);
        return { banner: null, isNew: false };
    }
};
