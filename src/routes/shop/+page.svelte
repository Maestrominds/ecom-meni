<script lang="ts">
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  let { data } = $props();
  let { products } = data;
  
  let selectedCategory = $state('All');
  const categories = ['All', 'Hair Wellness', 'Skin Wellness', 'Combo'];
  
  let filteredProducts = $derived(selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory));
</script>

<svelte:head>
  <title>Shop | MENI Wellness</title>
</svelte:head>

<div class="shop-container">
  <div class="page-header">
    <h1>All Products</h1>
    <p>Discover our range of premium, science-backed wellness products.</p>
  </div>
  
  <div class="shop-layout">
    <aside class="filters">
      <h3>Categories</h3>
      <ul class="category-list">
        {#each categories as category}
          <li>
            <button 
              class:active={selectedCategory === category}
              onclick={() => selectedCategory = category}
            >
              {category}
            </button>
          </li>
        {/each}
      </ul>
    </aside>
    
    <div class="products-grid">
      {#each filteredProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
      
      {#if filteredProducts.length === 0}
        <div class="empty-state">
          <p>No products found in this category.</p>
          <button class="btn btn-secondary" onclick={() => selectedCategory = 'All'}>View All Products</button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .shop-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px;
    font-family: var(--font-body);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .page-header h1 {
    font-size: 3rem;
    font-family: var(--font-heading);
    margin-bottom: 16px;
    color: var(--text-dark);
  }
  
  .page-header p {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .shop-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 40px;
  }
  
  .filters {
    position: sticky;
    top: 100px;
    align-self: start;
    background: #FAFAFA;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border-light);
  }
  
  .filters h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-light);
  }
  
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .category-list li {
    margin-bottom: 10px;
  }
  
  .category-list button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px 16px;
    border-radius: 8px;
    background: transparent;
    color: var(--text-dark);
    font-weight: 500;
    font-size: 1rem;
    transition: var(--transition-smooth);
    border: none;
    cursor: pointer;
  }
  
  .category-list button:hover {
    background: var(--bg-cream);
    color: var(--primary);
  }
  
  .category-list button.active {
    background: var(--primary-light);
    color: var(--primary);
    font-weight: 600;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    background: #FAFAFA;
    border-radius: 16px;
    border: 1px dashed var(--border-light);
  }
  
  .empty-state p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 20px;
  }
  
  .btn-secondary {
    background: white;
    color: var(--text-dark);
    border: 1px solid var(--border-light);
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-smooth);
  }
  
  .btn-secondary:hover {
    background: var(--bg-cream);
    border-color: #D1D1D6;
  }
  
  @media (max-width: 900px) {
    .shop-layout {
      grid-template-columns: 1fr;
    }
    .filters {
      position: static;
    }
  }
</style>
