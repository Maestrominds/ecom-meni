import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = '/api';

    try {
        const res = await fetch(`${baseUrl}/admin/analytics/dashboard`);
        if (!res.ok) {
            throw new Error('Failed to fetch dashboard stats');
        }
        
        const stats = await res.json();
        return { stats };
    } catch (e) {
        console.error('Error fetching dashboard stats:', e);
        // Fallback structure in case of backend failure so UI doesn't crash
        return {
            stats: {
                total_revenue: 0,
                total_orders: 0,
                average_order_value: 0,
                conversion_rate: 0,
                revenue_growth: 0,
                orders_growth: 0,
                aov_growth: 0,
                conversion_growth: 0,
                revenue_by_day: [],
                recent_sales: []
            }
        };
    }
};
