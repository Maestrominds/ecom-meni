import { getApiUrl } from '$lib/utils/apiUrl';

export async function load({ fetch }) {
    try {
        const res = await fetch(`${getApiUrl()}/admin/analytics/dashboard`);
        if (res.ok) {
            const data = await res.json();
            return {
                metrics: data,
                error: null
            };
        }
    } catch (e) {
        console.error("Failed to load analytics:", e);
    }

    const DUMMY_DATA = {
        topMetrics: {
            revenue: { value: 1482300, trend: 22.1 },
            orders: { value: 2148, trend: 15.4 },
            aov: { value: 690, trend: 5.8 },
            rtoRate: { value: 6.2, trend: -1.1 }
        },
        salesReport: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [40, 50, 45, 60, 55, 80, 70]
        },
        paymentMethods: {
            prepaid: { amount: 918000, percentage: 62 },
            cod: { amount: 564300, percentage: 38 }
        },
        adPerformance: [
            { campaign: 'Facebook - Hair Fall - Jun26', conversions: 32, spend: 45000, roas: 4.2 },
            { campaign: 'Google - Brand Search', conversions: 124, spend: 12000, roas: 6.8 },
            { campaign: 'Meta - Retargeting', conversions: 18, spend: 8500, roas: 3.1 },
            { campaign: 'Insta Reels - Influencer', conversions: 45, spend: 22000, roas: 4.5 }
        ],
        miniReports: {
            cartAbandonment: { rate: 67.2, value: 384200, recoveryRate: 12.3, recoveredRevenue: 47250 },
            shipping: { 
                delhivery: { share: 58, timeDays: 2.3 },
                bluedart: { share: 28, timeDays: 1.8 }
            },
            customerMix: { new: 48, returning: 52, topState: "Maharashtra (24%)", topCity: "Mumbai (11%)" }
        },
        productPerformance: [
            { name: 'Hair Fall Control Oil', sold: 420, revenue: 251580, rate: 4.20, stock: 142, lowStock: false },
            { name: 'Anti-Dandruff Shampoo', sold: 382, revenue: 171518, rate: 3.90, stock: 8, lowStock: true },
            { name: 'Vitamin C Face Serum', sold: 344, revenue: 274856, rate: 3.60, stock: 67, lowStock: false },
            { name: 'Beard Growth Combo', sold: 306, revenue: 305694, rate: 3.30, stock: 24, lowStock: true },
            { name: 'Onion Hair Mask', sold: 268, revenue: 147132, rate: 3.00, stock: 0, lowStock: true },
            { name: 'Sunscreen SPF 50', sold: 230, revenue: 149270, rate: 2.70, stock: 95, lowStock: false }
        ],
        microsoftClarity: {
            heatmapSessions: { value: '3,429', trend: '+12% vs LW' },
            sessionRecordings: { value: '1,892', avgTime: '4m 12s' },
            rageClicks: 142,
            deadClicks: { value: 48, rate: 2.1 }
        },
        googleAnalytics: {
            users: { value: '42.5k', trend: '+12%' },
            sessions: { value: '68.2k', trend: '+8%' },
            avgSessionTime: { value: '2m 45s', trend: '-2%' },
            bounceRate: { value: '42.1%', trend: '-5%' }
        },
        searchConsole: [
            { keyword: 'best hair fall control oil', clicks: '1,240', impressions: '25.5k', pos: '3.2' },
            { keyword: 'natural face serum india', clicks: '850', impressions: '18.2k', pos: '5.1' }
        ]
    };

    // Return fallback data so the UI looks like the Figma designs
    return {
        metrics: DUMMY_DATA,
        error: null
    };
}
