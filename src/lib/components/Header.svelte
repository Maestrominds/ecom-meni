<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { Search, User, Heart, ShoppingCart, Mic } from '@lucide/svelte';

  function handleNav(e: MouseEvent, path: string) {
    store.triggerLoading(800);
  }
</script>

<div class="top-banner">
  <div class="banner-track">
    <span>COD Available Across India</span>
  </div>
</div>

<header class="header">
  <div class="container flex align-center justify-between header-inner">
    <!-- Brand Logo -->
    <a href="/" onclick={(e) => handleNav(e, '/')} class="logo">
      <img src="/company_logo.png" alt="MENI" class="logo-img" />
    </a>

    <!-- Search Input -->
    <div class="search-bar">
      <div class="search-input-wrapper">
        <Search size={18} class="search-icon" />
        <input type="text" placeholder="Search for hair serums, shampoo, and combos..." />
      </div>
      <button class="voice-search-btn" aria-label="Voice search">
        <Mic size={18} />
      </button>
    </div>

    <!-- Actions -->
    <div class="header-actions">
      <a href="/account" onclick={(e) => handleNav(e, '/account')} class="action-btn">
        <User size={20} />
        <span>Account</span>
      </a>
      <a href="/wishlist" onclick={(e) => handleNav(e, '/wishlist')} class="action-btn">
        <Heart size={20} />
        <span>Wishlist</span>
      </a>
      <button class="action-btn cart-btn" onclick={() => store.isCartOpen = true}>
        <div class="cart-icon-wrapper">
          <ShoppingCart size={20} />
          {#if store.cartCount > 0}
            <span class="cart-badge">{store.cartCount}</span>
          {/if}
        </div>
        <span>Cart</span>
      </button>
    </div>
  </div>

  <!-- Navigation Menu Bar -->
  <nav class="nav-bar">
    <div class="container flex align-center justify-between nav-inner">
      <div class="nav-links">
        <a href="/" onclick={(e) => handleNav(e, '/')} class="nav-link">Home</a>
        <a href="/hair-wellness" onclick={(e) => handleNav(e, '/hair-wellness')} class="nav-link">Hair Wellness</a>
        <a href="/skin-wellness" onclick={(e) => handleNav(e, '/skin-wellness')} class="nav-link">Skin Wellness</a>
        <a href="/best-selling-combo" onclick={(e) => handleNav(e, '/best-selling-combo')} class="nav-link">Best Selling Combo</a>
        <a href="/shop" onclick={(e) => handleNav(e, '/shop')} class="nav-link">Shop</a>
      </div>

      <button class="quiz-btn" onclick={() => store.openQuiz()}>
        Take Quiz
      </button>
    </div>
  </nav>
</header>

<style>
  .top-banner {
    background: var(--primary);
    color: white;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    padding: 8px 0;
    letter-spacing: 0.05em;
  }

  .header {
    background: var(--white);
    border-bottom: 1px solid var(--border-light);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-inner {
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 24px;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo-img {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  .search-bar {
    flex: 1;
    max-width: 500px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .search-input-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .search-input-wrapper :global(.search-icon) {
    position: absolute;
    left: 16px;
    color: var(--text-muted);
    pointer-events: none;
  }

  .search-bar input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid var(--border-light);
    border-radius: 30px;
    font-family: var(--font-body);
    font-size: 14px;
    background: #FAF9F6;
    outline: none;
    transition: var(--transition-smooth);
  }

  .search-bar input:focus {
    border-color: var(--primary);
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(229, 91, 60, 0.1);
  }

  .voice-search-btn {
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .voice-search-btn:hover {
    color: var(--primary);
    background: var(--primary-light);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-dark);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .action-btn:hover {
    color: var(--primary);
  }

  .cart-icon-wrapper {
    position: relative;
  }

  .cart-badge {
    position: absolute;
    top: -6px;
    right: -10px;
    background: var(--primary);
    color: white;
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid var(--white);
  }

  .nav-bar {
    border-top: 1px solid var(--border-light);
    background: var(--white);
  }

  .nav-inner {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .quiz-btn {
    background: var(--primary);
    color: white;
    font-weight: 700;
    font-size: 14px;
    padding: 8px 24px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(229, 91, 60, 0.2);
  }

  .quiz-btn:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .header-inner {
      flex-direction: column;
      gap: 16px;
    }
    .search-bar {
      max-width: 100%;
    }
    .nav-links {
      gap: 16px;
      flex-wrap: wrap;
    }
  }
</style>
