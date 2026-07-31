<script lang="ts">
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  let { data } = $props();
  let products = $derived(data.products || []);
</script>

<svelte:head>
  <title>Hair Wellness | MENI</title>
</svelte:head>

<div class="category-page">
  <div class="page-header">
    <span class="badge">CATEGORY</span>
    <h1>Hair Wellness</h1>
    <p>Discover scientifically formulated treatments to reduce hair fall, promote growth, and nourish your scalp.</p>
  </div>
  
  <div class="products-grid">
    {#each products as product (product.id)}
      <ProductCard {product} />
    {/each}
    
    {#if products.length === 0}
      <div class="empty-state">
        <p>New products are coming soon!</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .category-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: #fce8e5;
    color: var(--primary);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }
  
  .page-header h1 {
    font-size: 3.5rem;
    font-family: var(--font-heading);
    color: var(--text-dark);
    margin-bottom: 16px;
    line-height: 1.1;
  }
  
  .page-header p {
    font-size: 1.15rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    background: #FAFAFA;
    border-radius: 16px;
    border: 1px dashed var(--border-light);
    color: var(--text-muted);
    font-size: 1.1rem;
  }
</style>
