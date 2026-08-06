<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { api } from '$lib/data/mockApi';

  let allProducts = $state<any[]>([]);
  let isLoading = $state(true);

  let query = $derived(page.url.searchParams.get('q') || '');

  let filteredProducts = $derived(
    query.trim() === '' ? [] : allProducts.filter((p: any) => 
      (p.Name || p.name || '').toLowerCase().includes(query.toLowerCase()) || 
      (p.Category || p.category || '').toLowerCase().includes(query.toLowerCase())
    )
  );

  onMount(async () => {
    try {
      allProducts = await api.products.getAll();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="search-page">
  <div class="container py-12">
    <div class="search-header">
      {#if query}
        <h1 class="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
        <p class="text-muted mb-8">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
      {:else}
        <h1 class="text-3xl font-bold mb-8">Search Products</h1>
      {/if}
    </div>

    {#if isLoading}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Searching...</p>
      </div>
    {:else if filteredProducts.length > 0}
      <div class="products-grid">
        {#each filteredProducts as product}
          <ProductCard {product} />
        {/each}
      </div>
    {:else if query}
      <div class="no-results">
        <h2>No exact matches found</h2>
        <p>Try checking your spelling or use more general terms.</p>
        <a href="/shop" class="btn-primary mt-6 inline-block" style="text-decoration: none;">Browse All Products</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .search-page {
    min-height: 60vh;
    background-color: var(--background);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .text-3xl {
    font-size: 1.875rem;
    color: var(--text-dark);
  }

  .font-bold {
    font-weight: 700;
  }

  .mb-2 { margin-bottom: 0.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mt-6 { margin-top: 1.5rem; }
  
  .text-muted {
    color: var(--text-muted);
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }

  .loading-state, .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .no-results h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(240, 81, 57, 0.2);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1s ease-in-out infinite;
    margin: 0 auto 1rem;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    display: inline-block;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
