<script lang="ts">
  import { Star } from 'lucide-svelte';
  import { store } from '$lib/store.svelte';
  
  export let product: any; // Accept product data
  
  // Calculate mock original price and savings
  const originalPrice = product.base_price * 1.3;
  const savings = originalPrice - product.base_price;
  const reviews = 124; // Mock
  const badge = product.stock < 100 ? 'Top Seller' : '';

  function handleAddToCart(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    store.addToCart({
      id: product.id,
      name: product.name,
      price: product.base_price,
      image: product.image_url,
      category: product.category
    });
  }
</script>

<div class="product-card">
  <a href={`/product/${product.id}`} class="product-link">
    <div 
      class="product-img-wrapper placeholder-img" 
      style="background-image: url('{product.image_url}'); background-size: cover; background-position: center;"
    >
      {#if badge}
        <span class="product-badge" class:trending={badge === 'Trending now'}>{badge}</span>
      {/if}
    </div>
  </a>
  
  <div class="product-info">
    <div class="product-rating">
      <Star size={14} fill="#f59e0b" color="#f59e0b"/>
      <Star size={14} fill="#f59e0b" color="#f59e0b"/>
      <Star size={14} fill="#f59e0b" color="#f59e0b"/>
      <Star size={14} fill="#f59e0b" color="#f59e0b"/>
      <Star size={14} fill="#e5e7eb" color="#e5e7eb"/>
      <span>{product.rating} ({reviews} Ratings)</span>
    </div>
    
    <a href={`/product/${product.id}`}>
      <h4 class="product-name">{product.name}</h4>
    </a>
    
    <p class="product-desc">{product.description.substring(0, 50)}...</p>
    
    <div class="product-price">
      <span class="current-price">₹{product.base_price.toFixed(2)}</span>
      <span class="original-price">₹{originalPrice.toFixed(2)}</span>
      <span class="savings">Save ₹{savings.toFixed(2)}</span>
    </div>
    
    <button class="btn-cart" onclick={handleAddToCart}>Add To Cart</button>
  </div>
</div>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .product-card {
    border: 1px solid var(--border-light);
    border-radius: 12px;
    overflow: hidden;
    padding: 15px;
    background: white;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
  
  .product-img-wrapper {
    aspect-ratio: 1/1;
    position: relative;
    margin-bottom: 15px;
    background-color: #eaeaea;
    border-radius: 8px;
  }
  
  .product-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #f59e0b;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
  }
  
  .product-badge.trending {
    background: #3b82f6;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  
  .product-rating span {
    margin-left: 5px;
  }
  
  .product-name {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
    height: 42px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: color 0.2s;
  }
  
  .product-name:hover {
    color: var(--primary);
  }
  
  .product-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    flex: 1;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0;
  }
  
  .current-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary);
  }
  
  .original-price {
    text-decoration: line-through;
    color: #999;
    font-size: 0.9rem;
  }
  
  .savings {
    color: #10b981;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .btn-cart {
    background: var(--primary);
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: auto;
  }
  
  .btn-cart:hover {
    background: var(--primary-hover);
  }
</style>
