<script lang="ts">
  import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, Check } from 'lucide-svelte';
  import { store } from '$lib/store.svelte';
  
  let { data } = $props();
  let { product } = data;
  
  let quantity = 1;
  let isAdding = false;
  let added = false;
  
  const originalPrice = product.base_price * 1.3;
  
  function increaseQuantity() {
    if (quantity < product.stock) quantity++;
  }
  
  function decreaseQuantity() {
    if (quantity > 1) quantity--;
  }
  
  function addToCart() {
    isAdding = true;
    setTimeout(() => {
      isAdding = false;
      added = true;
      
      for (let i = 0; i < quantity; i++) {
        store.addToCart({
          id: product.id,
          name: product.name,
          price: product.base_price,
          image: product.image_url,
          category: product.category
        });
      }
      
      setTimeout(() => added = false, 2000);
    }, 600);
  }
</script>

<svelte:head>
  <title>{product.name} | MENI</title>
</svelte:head>

<div class="product-page">
  <div class="breadcrumb">
    <a href="/">Home</a> <span>/</span> 
    <a href="/shop">Shop</a> <span>/</span> 
    <span class="current">{product.name}</span>
  </div>

  <div class="product-layout">
    <!-- Image Gallery Section -->
    <div class="product-gallery">
      <div class="main-image-container">
        <img src={product.image_url} alt={product.name} class="main-image" />
        {#if product.stock < 100}
          <div class="badge-top">Top Seller</div>
        {/if}
      </div>
      <!-- Thumbnails would go here if we had multiple images -->
      <div class="thumbnails">
        <div class="thumbnail active" style="background-image: url('{product.image_url}')"></div>
        <div class="thumbnail placeholder"></div>
        <div class="thumbnail placeholder"></div>
      </div>
    </div>

    <!-- Product Details Section -->
    <div class="product-details">
      <div class="category-tag">{product.category}</div>
      <h1 class="title">{product.name}</h1>
      
      <div class="reviews-summary">
        <div class="stars">
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <Star size={16} fill="#E5E7EB" color="#E5E7EB" />
        </div>
        <span class="rating-text">{product.rating} (124 reviews)</span>
      </div>
      
      <div class="pricing">
        <span class="current-price">₹{product.base_price.toFixed(2)}</span>
        <span class="original-price">₹{originalPrice.toFixed(2)}</span>
        <span class="discount-badge">Save {(30).toFixed(0)}%</span>
      </div>
      
      <p class="description">
        {product.description}
        Discover the perfect balance of science and nature with our meticulously crafted formula, designed for everyday wellness.
      </p>
      
      <div class="stock-status">
        <span class="indicator" class:low={product.stock < 50}></span>
        {#if product.stock > 50}
          In Stock ({product.stock} available)
        {:else if product.stock > 0}
          <span class="text-warning">Low Stock - Only {product.stock} left!</span>
        {:else}
          <span class="text-danger">Out of Stock</span>
        {/if}
      </div>
      
      <hr class="divider" />
      
      <div class="actions-wrapper">
        <div class="quantity-selector">
          <button onclick={decreaseQuantity} disabled={quantity <= 1}><Minus size={16} /></button>
          <input type="number" bind:value={quantity} min="1" max={product.stock} readonly />
          <button onclick={increaseQuantity} disabled={quantity >= product.stock}><Plus size={16} /></button>
        </div>
        
        <button 
          class="btn-add-cart" 
          class:adding={isAdding}
          class:added={added}
          disabled={product.stock === 0 || isAdding}
          onclick={addToCart}
        >
          {#if isAdding}
            <span class="loader"></span> Adding...
          {:else if added}
            <Check size={20} /> Added to Cart
          {:else}
            Add to Cart - ₹{(product.base_price * quantity).toFixed(2)}
          {/if}
        </button>
        
        <button class="btn-wishlist" aria-label="Add to wishlist">
          <Heart size={24} color="var(--text-muted)" />
        </button>
      </div>
      
      <div class="trust-badges">
        <div class="badge-item">
          <Truck size={20} color="var(--primary)" />
          <span>Free shipping over ₹500</span>
        </div>
        <div class="badge-item">
          <ShieldCheck size={20} color="var(--primary)" />
          <span>Secure checkout</span>
        </div>
      </div>
      
      <!-- Accordion for Details -->
      <div class="details-accordion">
        <details open>
          <summary>Ingredients & Benefits</summary>
          <div class="content">
            <p>Formulated with clinically proven botanical extracts and essential nutrients. Cruelty-free and dermatologist tested.</p>
          </div>
        </details>
        <details>
          <summary>How to Use</summary>
          <div class="content">
            <p>Apply consistently as part of your daily wellness routine for best results. Follow specific instructions provided on the packaging.</p>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>

<style>
  .product-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 24px 100px;
    font-family: var(--font-body);
  }
  
  .breadcrumb {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 30px;
  }
  
  .breadcrumb a {
    color: var(--text-dark);
    transition: color 0.2s;
  }
  
  .breadcrumb a:hover {
    color: var(--primary);
  }
  
  .breadcrumb span {
    margin: 0 8px;
  }
  
  .breadcrumb .current {
    color: var(--text-muted);
  }
  
  .product-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
  
  /* Gallery */
  .product-gallery {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .main-image-container {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: #F9FAFB;
    aspect-ratio: 4/5;
    border: 1px solid var(--border-light);
  }
  
  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .badge-top {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #3b82f6;
    color: white;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  
  .thumbnail {
    aspect-ratio: 1/1;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    cursor: pointer;
    background-color: #F3F4F6;
  }
  
  .thumbnail.active {
    border-color: var(--primary);
  }
  
  .thumbnail.placeholder {
    opacity: 0.5;
  }
  
  /* Details */
  .category-tag {
    font-size: 0.9rem;
    color: var(--primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
  
  .title {
    font-size: 2.5rem;
    font-family: var(--font-heading);
    color: var(--text-dark);
    line-height: 1.2;
    margin-bottom: 16px;
  }
  
  .reviews-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .stars {
    display: flex;
    gap: 4px;
  }
  
  .rating-text {
    font-size: 0.95rem;
    color: var(--text-muted);
  }
  
  .pricing {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  
  .current-price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-dark);
  }
  
  .original-price {
    font-size: 1.2rem;
    color: var(--text-muted);
    text-decoration: line-through;
  }
  
  .discount-badge {
    background: #FEF2F2;
    color: #DC2626;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 700;
  }
  
  .description {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }
  
  .stock-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #059669;
    margin-bottom: 32px;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #059669;
  }
  
  .indicator.low { background: #D97706; }
  .text-warning { color: #D97706; }
  .text-danger { color: #DC2626; }
  
  .divider {
    border: none;
    border-top: 1px solid var(--border-light);
    margin: 32px 0;
  }
  
  /* Actions */
  .actions-wrapper {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    height: 56px;
    background: white;
  }
  
  .quantity-selector button {
    width: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dark);
  }
  
  .quantity-selector button:disabled {
    color: #D1D1D6;
  }
  
  .quantity-selector input {
    width: 48px;
    text-align: center;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-dark);
    -moz-appearance: textfield;
  }
  
  .quantity-selector input::-webkit-outer-spin-button,
  .quantity-selector input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .btn-add-cart {
    flex: 1;
    background: var(--primary);
    color: white;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: var(--transition-smooth);
  }
  
  .btn-add-cart:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(229, 91, 60, 0.2);
  }
  
  .btn-add-cart.adding { background: #D04A2B; opacity: 0.8; }
  .btn-add-cart.added { background: #059669; }
  
  .btn-wishlist {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid var(--border-light);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-wishlist:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  /* Trust Badges */
  .trust-badges {
    display: flex;
    gap: 24px;
    margin-bottom: 40px;
    background: #FAFAFA;
    padding: 20px;
    border-radius: 12px;
  }
  
  .badge-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-dark);
  }
  
  /* Accordion */
  .details-accordion details {
    border-bottom: 1px solid var(--border-light);
  }
  
  .details-accordion summary {
    padding: 24px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-dark);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .details-accordion summary::-webkit-details-marker {
    display: none;
  }
  
  .details-accordion summary::after {
    content: '+';
    font-size: 1.5rem;
    font-weight: 400;
    transition: transform 0.2s;
  }
  
  .details-accordion details[open] summary::after {
    transform: rotate(45deg);
  }
  
  .details-accordion .content {
    padding-bottom: 24px;
    color: var(--text-muted);
    line-height: 1.6;
  }
  
  .loader {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 900px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
</style>
