export interface Product {
    id: string;
    name: string;
    category: 'Hair Wellness' | 'Skin Wellness' | 'Combo';
    base_price: number;
    stock: number;
    description: string;
    image_url: string;
    rating: number;
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

// Mock Data Stores
export const mockProducts: Product[] = [
    {
        id: 'p-1',
        name: 'Advanced Hair Growth Serum',
        category: 'Hair Wellness',
        base_price: 49.99,
        stock: 120,
        description: 'Clinically proven to support thicker, fuller hair.',
        image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
        rating: 4.8
    },
    {
        id: 'p-2',
        name: 'Revitalizing Scalp Shampoo',
        category: 'Hair Wellness',
        base_price: 24.99,
        stock: 85,
        description: 'Deep cleansing shampoo infused with natural botanical extracts.',
        image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
        rating: 4.5
    },
    {
        id: 'p-3',
        name: 'Vitamin C Brightening Serum',
        category: 'Skin Wellness',
        base_price: 39.99,
        stock: 200,
        description: 'Powerful antioxidant serum for a radiant complexion.',
        image_url: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=600&auto=format&fit=crop',
        rating: 4.9
    },
    {
        id: 'p-4',
        name: 'Hydrating Night Cream',
        category: 'Skin Wellness',
        base_price: 34.99,
        stock: 60,
        description: 'Intense moisture lock technology for overnight skin repair.',
        image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
        rating: 4.7
    },
    {
        id: 'p-5',
        name: 'Ultimate Glow Combo',
        category: 'Combo',
        base_price: 65.00,
        stock: 45,
        description: 'The perfect pairing of our best-selling serum and night cream.',
        image_url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop',
        rating: 5.0
    }
];

export const mockBlogs: Blog[] = [
    {
        id: 'b-1',
        title: '5 Secrets to Naturally Thicker Hair',
        cover_image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
        body: 'Discover the holistic approach to achieving the thick, voluminous hair you have always wanted...',
        date: '2026-07-15',
        author: 'Dr. Sarah Jenkins'
    },
    {
        id: 'b-2',
        title: 'Demystifying Vitamin C for Your Skin',
        cover_image_url: 'https://images.unsplash.com/photo-1615397323136-1200155b1f5e?q=80&w=800&auto=format&fit=crop',
        body: 'Vitamin C is everywhere in skincare, but what does it actually do? Let us break down the science...',
        date: '2026-07-10',
        author: 'Emma Davis, Esthetician'
    }
];

// Mock API Service (to be replaced by direct Go Fiber API calls in +page.server.ts later)
export const api = {
    products: {
        getAll: async (): Promise<Product[]> => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            return [...mockProducts];
        },
        getById: async (id: string): Promise<Product | undefined> => {
            await new Promise(resolve => setTimeout(resolve, 200));
            return mockProducts.find(p => p.id === id);
        },
        getByCategory: async (category: string): Promise<Product[]> => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return mockProducts.filter(p => p.category === category);
        }
    },
    blogs: {
        getAll: async (): Promise<Blog[]> => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return [...mockBlogs];
        },
        getById: async (id: string): Promise<Blog | undefined> => {
            await new Promise(resolve => setTimeout(resolve, 200));
            return mockBlogs.find(b => b.id === id);
        }
    }
};
