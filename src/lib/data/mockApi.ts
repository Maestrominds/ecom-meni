import { env } from '$env/dynamic/public';

export interface Product {
    id: string;
    name: string;
    category: string;
    base_price: number;
    compare_price?: number;
    sku?: string;
    stock: number;
    description: string;
    image_url: string;
    detail_tabs: any;
}

export interface Order {
    id: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total_amount: number;
    razorpay_order_id: string;
    date: string;
}

export interface Blog {
    id: string;
    title: string;
    cover_image_url: string;
    body: string;
    date: string;
    author: string;
}

declare const Buffer: any;

// Decode a Go []byte JSON field.
// The Go backend returns []byte fields as base64-encoded strings inside JSON.
// We need to: base64-decode → utf8 string → JSON.parse
function decodeGoBytes(raw: any): any {
    if (raw == null) return null;
    // Already a JS object/array
    if (typeof raw === 'object') return raw;
    if (typeof raw !== 'string') return null;

    let str = raw;

    // If it doesn't look like JSON, it's base64-encoded
    if (!str.startsWith('{') && !str.startsWith('[') && !str.startsWith('"')) {
        // Decode base64 → utf8
        try {
            if (typeof Buffer !== 'undefined') {
                // Node.js / SvelteKit SSR
                str = Buffer.from(str, 'base64').toString('utf8');
            } else {
                // Browser
                str = decodeURIComponent(
                    Array.from(atob(str))
                        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                        .join('')
                );
            }
        } catch {
            return null;
        }
    }

    // Now parse the JSON string
    try {
        return JSON.parse(str);
    } catch {
        // It decoded to a plain string (not JSON), return as-is
        return str;
    }
}

function mapProduct(p: any): Product {
    const price = parseFloat(p.BasePrice ?? p.base_price ?? p.Price ?? p.price) || 0;
    const comparePrice = parseFloat(p.ComparePrice ?? p.compare_price) || 0;

    // Decode description
    let description = '';
    try {
        const decoded = decodeGoBytes(p.DescriptionJson ?? p.description_json);
        if (typeof decoded === 'string') description = decoded;
    } catch { /* keep empty */ }
    if (!description && typeof p.description === 'string') {
        description = p.description;
    }

    // Decode detail_tabs
    let detail_tabs: any = null;
    try {
        detail_tabs = decodeGoBytes(p.DetailTabs ?? p.detail_tabs);
    } catch { /* keep null */ }

    const imageUrl = p.ImageUrl || p.image_url || detail_tabs?.image_url || detail_tabs?.gallery_images?.[0] || '';
    const sku = p.Sku || p.sku || detail_tabs?.sku || '';

    return {
        id: p.ID || p.id || '',
        name: p.Name || p.name || 'Unnamed Product',
        category: p.Category || p.category || '',
        base_price: price,
        compare_price: comparePrice > 0 ? comparePrice : (detail_tabs?.compare_price ? parseFloat(detail_tabs.compare_price) : undefined),
        sku: sku || undefined,
        stock: p.Stock ?? p.stock ?? 0,
        description,
        image_url: imageUrl,
        detail_tabs
    };
}

const getBaseUrl = () => env.PUBLIC_API_URL?.trim() || 'https://meni-server-sipl.onrender.com/api';

export const api = {
    products: {
        getAll: async (): Promise<Product[]> => {
            try {
                const res = await fetch(`${getBaseUrl()}/public/products`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                return (data || []).map(mapProduct);
            } catch (e) {
                console.error('[api] Failed to fetch products:', e);
                return [];
            }
        },
        getById: async (id: string): Promise<Product | undefined> => {
            // Fetch all and find — since no single-product endpoint exists yet
            const all = await api.products.getAll();
            return all.find(p => p.id === id);
        },
        getByCategory: async (category: string): Promise<Product[]> => {
            const all = await api.products.getAll();
            const term = category.toLowerCase().trim();
            return all.filter(p => {
                const cat = (p.category || '').toLowerCase();
                const name = (p.name || '').toLowerCase();
                if (term.includes('hair')) return cat.includes('hair') || name.includes('hair');
                if (term.includes('skin')) return cat.includes('skin') || name.includes('skin');
                if (term.includes('combo')) return cat.includes('combo') || name.includes('combo') || cat.includes('pack');
                return cat.includes(term) || name.includes(term);
            });
        }
    },
    blogs: {
        getAll: async (): Promise<Blog[]> => {
            return [];
        },
        getById: async (_id: string): Promise<Blog | undefined> => {
            return undefined;
        }
    }
};
