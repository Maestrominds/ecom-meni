import { writable } from 'svelte/store';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

// Svelte 5 Runes-based shared state
class GlobalState {
  // Cart
  cartItems = $state<CartItem[]>([]);
  isCartOpen = $state(false);
  
  // Quiz
  isQuizOpen = $state(false);
  quizStep = $state(0);
  quizAnswers = $state<Record<string, string>>({});

  // Loading Simulator
  isLoading = $state(false);

  // Admin Auth
  isAdminLoggedIn = $state(false);

  // Cart actions
  async loadCart() {
    if (typeof window === 'undefined') return;
    if (!document.cookie.includes('user_token=')) return; // Prevent harmless 401 console errors for guests
    
    try {
      const res = await fetch('/api/customer/cart');
      if (res.ok) {
        const data = await res.json();
        // Assuming data is an array of items
        this.cartItems = data || [];
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }

  async addToCart(item: Omit<CartItem, 'quantity'>) {
    // Optimistic update
    const existing = this.cartItems.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.isCartOpen = true;

    // Sync with backend
    if (typeof window !== 'undefined') {
      try {
        await fetch('/api/customer/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: item.id, quantity: 1 })
        });
      } catch (e) {
        console.error('Failed to sync cart', e);
      }
    }
  }

  async removeFromCart(id: string) {
    // Optimistic update
    this.cartItems = this.cartItems.filter(i => i.id !== id);

    // Sync with backend
    if (typeof window !== 'undefined') {
      try {
        await fetch('/api/customer/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: id, quantity: 0 })
        });
      } catch (e) {
        console.error('Failed to sync cart', e);
      }
    }
  }

  async updateQuantity(id: string, delta: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    
    // Optimistic update
    item.quantity = newQuantity;
    if (item.quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    // Sync with backend
    if (typeof window !== 'undefined') {
      try {
        await fetch('/api/customer/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: id, quantity: newQuantity })
        });
      } catch (e) {
        console.error('Failed to sync cart', e);
      }
    }
  }

  get cartTotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get cartCount() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Quiz actions
  openQuiz() {
    this.isQuizOpen = true;
    this.quizStep = 0;
    this.quizAnswers = {};
  }

  closeQuiz() {
    this.isQuizOpen = false;
  }

  // Trigger skeleton loader simulator
  triggerLoading(duration = 1000) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, duration);
  }
}

export const store = new GlobalState();
