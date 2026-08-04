import { getApiUrl } from '$lib/utils/apiUrl';

export async function load({ fetch }) {
    try {
        const res = await fetch(`${getApiUrl()}/admin/marketing/dashboard`);
        if (res.ok) {
            const data = await res.json();
            return {
                marketing: data
            };
        }
    } catch (e) {
        console.error('Failed to fetch marketing data:', e);
    }
    
    // Fallback empty data if backend is not ready
    return {
        marketing: {
            coupons: {
                activeCount: 0,
                freeShippingThreshold: 499,
                list: []
            },
            flashSale: {
                activeCount: 0,
                freeShippingThreshold: 499,
                endsIn: '00d 00h 00m'
            },
            referral: {
                totalReferrals: 0,
                revenue: 0,
                creditIssued: 0,
                conversionRate: '0%',
                rewardAmount: 100
            },
            affiliate: {
                totalAffiliates: 0,
                totalSales: 0,
                commissionPaid: 0,
                list: []
            },
            emailCampaigns: {
                total: 0,
                active: 0,
                avgOpenRate: '0%',
                clickRate: '0%',
                recent: [],
                templates: []
            },
            automation: {
                active: 0,
                recoveryRate: '0%',
                recoveredRevenue: 0,
                sentToday: 0,
                workflows: []
            }
        }
    };
}
