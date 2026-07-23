<script lang="ts">
  import { Heart } from 'lucide-svelte';
  
  // Since we haven't implemented a global store for wishlist yet, 
  // we'll leave this empty to show the empty state design.
  let wishlistItems: any[] = [];
</script>

<svelte:head>
  <title>Wishlist | MENI</title>
</svelte:head>

<div class="wishlist-page">
  <div class="page-header">
    <h1>Your Wishlist</h1>
    <p>Save your favorite items here and come back to them anytime.</p>
  </div>

  {#if wishlistItems.length > 0}
    <div class="products-grid">
      <!-- Would iterate over ProductCard here -->
    </div>
  {:else}
    <div class="empty-state">
      <div class="empty-icon">
        <Heart size={48} color="var(--primary)" />
      </div>
      <h2>Your wishlist is empty</h2>
      <p>Browse our collection of wellness products and add your favorites here.</p>
      <a href="/shop" class="btn btn-primary">Start Shopping</a>
    </div>
  {/if}
</div>

<style>
  .wishlist-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
    font-family: var(--font-heading);
    margin-bottom: 12px;
  }
  
  .page-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    background: #FAFAFA;
    border-radius: 24px;
    border: 1px dashed var(--border-light);
    max-width: 600px;
    margin: 0 auto;
  }

  .empty-icon {
    width: 96px;
    height: 96px;
    background: var(--primary-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
  }

  .empty-state h2 {
    font-size: 1.8rem;
    font-family: var(--font-heading);
    margin-bottom: 12px;
  }

  .empty-state p {
    color: var(--text-muted);
    margin-bottom: 32px;
    font-size: 1.1rem;
  }

  .btn {
    display: inline-block;
    padding: 14px 32px;
    border-radius: 30px;
    font-weight: 600;
    transition: var(--transition-smooth);
    text-decoration: none;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }
</style>
