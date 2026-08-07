import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    let reviews = [];
    try {
        const res = await fetch('/api/admin/content/reviews');
        if (res.ok) {
            const data = await res.json();
            reviews = data || [];
        }
    } catch (e) {
        console.error('Error fetching reviews:', e);
        reviews = [];
    }
    
    // Ensure reviews is an array before sorting
    if (Array.isArray(reviews)) {
        // Sort reviews by newest first on the frontend initially. 
        // Backend will handle pagination and sorting soon.
        reviews.sort((a: any, b: any) => new Date(b.CreatedAt || 0).getTime() - new Date(a.CreatedAt || 0).getTime());
    } else {
        reviews = [];
    }

    return {
        reviews
    };
};
