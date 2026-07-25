import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('admin_token');

    try {
        const [couponsRes, templatesRes] = await Promise.all([
            fetch(`${env.PUBLIC_API_URL}/admin/coupons`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`${env.PUBLIC_API_URL}/admin/templates`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        const coupons = couponsRes.ok ? await couponsRes.json() : [];
        const templates = templatesRes.ok ? await templatesRes.json() : [];
        
        return {
            coupons: coupons || [],
            templates: templates || []
        };
    } catch (err) {
        console.error('Error fetching marketing data:', err);
        return {
            coupons: [],
            templates: []
        };
    }
};
