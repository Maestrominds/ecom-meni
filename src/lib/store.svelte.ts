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
  addToCart(item: Omit<CartItem, 'quantity'>) {
    const existing = this.cartItems.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.isCartOpen = true; // Open cart drawer to show action
  }

  removeFromCart(id: string) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

  updateQuantity(id: string, delta: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(id);
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
