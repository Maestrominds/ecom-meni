<script lang="ts">
  import { Star, ShoppingBag } from 'lucide-svelte';
  import { store } from '$lib/store.svelte';
  
  let { product }: { product: any } = $props();
  
  const badge = product.badge || '';

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
    <a href={`/product/${product.id}`}>
      <h4 class="product-name">{product.name}</h4>
    </a>
    
    {#if product.description && product.description.trim() !== ''}
      <p class="product-desc">{(product.description || '').slice(0, 65)}{product.description.length > 65 ? '...' : ''}</p>
    {/if}
    
    <div class="product-price">
      <span class="current-price">₹{(product.base_price || 0).toFixed(0)}</span>
      {#if product.compare_price && product.compare_price > product.base_price}
        <span class="original-price">₹{product.compare_price.toFixed(0)}</span>
        <span class="savings">Save {Math.round(((product.compare_price - product.base_price) / product.compare_price) * 100)}%</span>
      {/if}
    </div>
    
    <button class="btn-cart" onclick={handleAddToCart}>
      <ShoppingBag size={16} />
      <span>Add To Cart</span>
    </button>
  </div>
</div>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .product-card {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    overflow: hidden;
    padding: 16px;
    background: white;
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }
  
  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(229, 91, 60, 0.12);
    border-color: rgba(229, 91, 60, 0.2);
  }

  .product-link {
    display: block;
    overflow: hidden;
    border-radius: 12px;
  }
  
  .product-img-wrapper {
    aspect-ratio: 1/1;
    position: relative;
    margin-bottom: 16px;
    background-color: #f7f7f8;
    border-radius: 12px;
    transition: transform 0.5s ease;
  }

  .product-card:hover .product-img-wrapper {
    transform: scale(1.05);
  }
  
  .product-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(225, 29, 72, 0.9);
    backdrop-filter: blur(8px);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .product-badge.trending {
    background: rgba(37, 99, 235, 0.9);
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
    gap: 4px;
    font-size: 0.8rem;
  }

  .rating-score {
    font-weight: 700;
    color: var(--text-dark);
  }

  .rating-count {
    color: var(--text-muted);
    font-size: 0.75rem;
  }
  
  .product-name {
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.35;
    height: 44px;
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
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.4;
    flex: 1;
  }
  
  .product-price {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin: 8px 0 12px;
  }
  
  .current-price {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--primary);
  }
  
  .original-price {
    text-decoration: line-through;
    color: #9CA3AF;
    font-size: 0.88rem;
  }
  
  .savings {
    color: #059669;
    font-size: 0.78rem;
    font-weight: 700;
    background: #ECFDF5;
    padding: 2px 6px;
    border-radius: 4px;
  }
  
  .btn-cart {
    background: var(--primary);
    color: white;
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: auto;
    box-shadow: 0 4px 12px rgba(229, 91, 60, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .btn-cart:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(229, 91, 60, 0.3);
  }

  .btn-cart:active {
    transform: translateY(0);
  }
</style>
