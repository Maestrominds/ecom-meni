<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { X, Trash2, ShoppingBag, Plus, Minus } from '@lucide/svelte';
  import { env } from '$env/dynamic/public';
  
  let checkoutSuccess = $state(false);
  let isCheckingOut = $state(false);
  const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api';

  async function handleCheckout() {
    if (store.cartItems.length === 0) return;
    
    isCheckingOut = true;
    try {
      const payload = {
        user_id: "00000000-0000-0000-0000-000000000000", // Mock valid UUID until Phase 4 (Auth)
        items: store.cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipping_address: {
          line1: "123 Wellness Ave",
          city: "Mumbai",
          state: "MH",
          country: "India",
          pincode: "400001"
        }
      };

      const res = await fetch(`${baseUrl}/customer/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to create order');

      const data = await res.json();
      
      // Initialize Razorpay
      const options = {
        key: "rzp_test_placeholder", // Replace with real key in production
        amount: data.total_amount * 100, // Amount in paise
        currency: "INR",
        name: "MENI Wellness",
        description: "Test Transaction",
        order_id: data.razorpay_order_id,
        handler: function (response: any) {
          // In a real app, verify signature on backend via webhook or explicit API call
          checkoutSuccess = true;
          setTimeout(() => {
            store.cartItems = [];
            store.isCartOpen = false;
            checkoutSuccess = false;
          }, 3500);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#F05139"
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(response.error.description);
      });
      rzp.open();

    } catch (e) {
      console.error(e);
      alert("Checkout failed. Make sure products match the backend database.");
    } finally {
      isCheckingOut = false;
    }
  }
</script>

{#if store.isCartOpen}
  <div class="drawer-backdrop" onclick={() => store.isCartOpen = false} role="presentation">
    <div class="drawer" onclick={(e) => e.stopPropagation()} role="presentation">
      <div class="drawer-header">
        <div class="title-row">
          <ShoppingBag size={20} />
          <h2>Your Cart ({store.cartCount})</h2>
        </div>
        <button class="close-btn" onclick={() => store.isCartOpen = false}>
          <X size={20} />
        </button>
      </div>

      {#if checkoutSuccess}
        <div class="checkout-success-view">
          <div class="success-icon">🎉</div>
          <h3>Order Placed Successfully!</h3>
          <p>Thank you for shopping with MENI. Your order details will be sent shortly.</p>
        </div>
      {:else if store.cartItems.length === 0}
        <div class="empty-cart-view">
          <div class="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button class="shop-now-btn" onclick={() => store.isCartOpen = false}>
            Continue Shopping
          </button>
        </div>
      {:else}
        <div class="cart-items-list">
          {#each store.cartItems as item}
            <div class="cart-item">
              <div class="item-img-placeholder">
                {#if item.image}
                  <img src={item.image} alt={item.name} />
                {:else}
                  <div class="empty-img-box">
                    <span>{item.category[0] || 'P'}</span>
                  </div>
                {/if}
              </div>
              <div class="item-details">
                <div class="name-row">
                  <h4>{item.name}</h4>
                  <button class="delete-btn" onclick={() => store.removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <p class="category-label">{item.category}</p>
                <div class="quantity-price-row">
                  <div class="quantity-controls">
                    <button class="q-btn" onclick={() => store.updateQuantity(item.id, -1)}>
                      <Minus size={12} />
                    </button>
                    <span class="q-val">{item.quantity}</span>
                    <button class="q-btn" onclick={() => store.updateQuantity(item.id, 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <span class="price-val">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="drawer-footer">
          <div class="summary-row">
            <span>Subtotal</span>
            <span class="total-price">₹{store.cartTotal.toLocaleString()}</span>
          </div>
          <p class="shipping-info">Shipping and taxes calculated at checkout.</p>
          <button class="checkout-btn" onclick={handleCheckout} disabled={isCheckingOut}>
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
  }

  .drawer {
    background: var(--white);
    width: 100%;
    max-width: 420px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 30px rgba(0,0,0,0.15);
    animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideLeft {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .drawer-header {
    padding: 24px;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .title-row h2 {
    font-size: 20px;
  }

  .close-btn {
    padding: 6px;
    border-radius: 50%;
    color: var(--text-muted);
  }

  .close-btn:hover {
    background: #f5f5f5;
    color: var(--text-dark);
  }

  .empty-cart-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    text-align: center;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-cart-view h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .empty-cart-view p {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 24px;
  }

  .shop-now-btn {
    background: var(--primary);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 600;
  }

  .shop-now-btn:hover {
    background: var(--primary-hover);
  }

  .cart-items-list {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cart-item {
    display: flex;
    gap: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-light);
  }

  .item-img-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    background: var(--bg-cream);
    overflow: hidden;
    flex-shrink: 0;
  }

  .item-img-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .empty-img-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-light);
    color: var(--primary);
    font-weight: 700;
    font-size: 20px;
  }

  .item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .name-row h4 {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }

  .delete-btn {
    color: var(--text-muted);
    padding: 4px;
  }

  .delete-btn:hover {
    color: #d32f2f;
  }

  .category-label {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .quantity-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-light);
    border-radius: 6px;
    padding: 2px;
  }

  .q-btn {
    padding: 6px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .q-btn:hover {
    color: var(--text-dark);
  }

  .q-val {
    width: 24px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
  }

  .price-val {
    font-weight: 700;
    color: var(--text-dark);
  }

  .drawer-footer {
    padding: 24px;
    border-top: 1px solid var(--border-light);
    background: #FAF9F6;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .total-price {
    font-size: 20px;
    color: var(--primary);
    font-weight: 700;
  }

  .shipping-info {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .checkout-btn {
    width: 100%;
    background: var(--primary);
    color: white;
    padding: 14px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
  }

  .checkout-btn:hover {
    background: var(--primary-hover);
  }

  .checkout-success-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    text-align: center;
  }

  .checkout-success-view h3 {
    color: #2e7d32;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .checkout-success-view p {
    font-size: 14px;
    color: var(--text-muted);
  }
</style>
