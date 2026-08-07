<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { Search, User, Heart, ShoppingCart, Mic, X } from '@lucide/svelte';
  import { page } from '$app/state';
  import companyLogo from '$lib/assets/company_logo.svg';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  function handleNav(e: MouseEvent, path: string) {
    store.triggerLoading(800);
  }

  let searchQuery = $state('');
  let allProducts = $state<any[]>([]);
  let isSearchFocused = $state(false);

  let searchResults = $derived(
    searchQuery.trim() === '' ? [] : allProducts.filter((p: any) => 
      (p.Name || p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.Category || p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
  );

  function handleSearchKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && searchQuery.trim().length > 0) {
      isSearchFocused = true;
    }
  }

  onMount(async () => {
    try {
      const res = await fetch(`${'/api'}/public/products`);
      if (res.ok) {
        allProducts = await res.json();
      }
    } catch (e) {
      console.error('Failed to load products for search');
    }
  });

  // Voice search state
  let isListening = $state(false);
  let showVoiceOverlay = $state(false);
  let interimTranscript = $state('');
  let voiceStatus = $state<'idle' | 'listening' | 'done'>('idle');
  let recognition: any = null;

  function openVoiceOverlay() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser. Please use Chrome.');
      return;
    }
    showVoiceOverlay = true;
    interimTranscript = '';
    voiceStatus = 'idle';
    // Auto-start listening immediately when overlay opens
    // Small delay to let the overlay render first
    setTimeout(() => startListening(), 100);
  }

  function closeVoiceOverlay() {
    if (recognition) {
      try { recognition.abort(); } catch(e) {}
      recognition = null;
    }
    showVoiceOverlay = false;
    isListening = false;
    interimTranscript = '';
    voiceStatus = 'idle';
  }

  function handleMicCenterClick() {
    if (isListening) {
      // Stop current recognition
      if (recognition) {
        try { recognition.abort(); } catch(e) {}
        recognition = null;
      }
      isListening = false;
      voiceStatus = 'idle';
    } else {
      // Start listening again
      interimTranscript = '';
      startListening();
    }
  }

  function startListening() {
    if (recognition) {
      try { recognition.abort(); } catch(e) {}
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListening = true;
      voiceStatus = 'listening';
      console.log('[Voice] Recognition started');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      interimTranscript = interim || final;
      console.log('[Voice] interim:', interim, 'final:', final);
      if (final) {
        searchQuery = final.trim().replace(/[.,!?]+$/, '');
        voiceStatus = 'done';
      }
    };

    recognition.onerror = (event: any) => {
      console.error('[Voice] Error:', event.error, event.message);
      isListening = false;
      voiceStatus = 'idle';
    };

    recognition.onend = () => {
      console.log('[Voice] Recognition ended, status:', voiceStatus);
      isListening = false;
      if (voiceStatus === 'done') {
        setTimeout(() => {
          closeVoiceOverlay();
          isSearchFocused = true;
        }, 800);
      } else {
        voiceStatus = 'idle';
      }
    };

    try {
      recognition.start();
      console.log('[Voice] recognition.start() called');
    } catch(e) {
      console.error('[Voice] Failed to start:', e);
    }
  }
</script>

{#if page.data.announcement?.IsActive && page.data.announcement?.Text}
<div class="top-banner">
  <div class="banner-track">
    {#if page.data.announcement?.LinkUrl}
      <a href={page.data.announcement.LinkUrl} style="color: inherit; text-decoration: none;">
        <span>{page.data.announcement.Text}</span>
      </a>
    {:else}
      <span>{page.data.announcement.Text}</span>
    {/if}
  </div>
</div>
{/if}

<header class="header">
  <div class="container flex align-center justify-between header-inner">
    <!-- Brand Logo -->
    <a href="/" onclick={(e) => handleNav(e, '/')} class="logo">
      <img src={companyLogo} alt="MENI" class="logo-img" />
    </a>

    <!-- Search Input -->
    <div class="search-bar" style="position: relative;">
      <div class="search-input-wrapper">
        <Search size={18} class="search-icon" />
        <input 
          type="text" 
          placeholder="Search for hair serums, shampoo, and combos..." 
          bind:value={searchQuery}
          onfocus={() => isSearchFocused = true}
          onblur={() => setTimeout(() => isSearchFocused = false, 200)}
          onkeydown={handleSearchKeyDown}
        />
      </div>
      <button 
        class="voice-search-btn" 
        class:listening={isListening} 
        aria-label="Voice search"
        onclick={openVoiceOverlay}
      >
        <Mic size={18} />
      </button>

      <!-- Autocomplete Dropdown -->
      {#if isSearchFocused && searchQuery.length > 0}
        <div class="search-dropdown">
          {#if searchResults.length > 0}
            <div class="search-results-list">
              <span class="dropdown-header">Products</span>
              {#each searchResults as product}
                <a href={`/product/${product.ID || product.id}`} class="search-result-item" onclick={(e) => handleNav(e, `/product/${product.ID || product.id}`)}>
                  {#if product.ImageUrl || product.image_url}
                    <img src={product.ImageUrl || product.image_url} alt={product.Name || product.name} class="search-result-img" loading="lazy" />
                  {:else}
                    <div class="search-result-img placeholder"></div>
                  {/if}
                  <div class="search-result-info">
                    <span class="search-result-name">{product.Name || product.name}</span>
                    <span class="search-result-price">₹{parseFloat(product.BasePrice || product.base_price || 0).toFixed(0)}</span>
                  </div>
                </a>
              {/each}
            </div>
          {:else}
            <div class="search-empty">
              No products found for "{searchQuery}"
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Actions -->
    <div class="header-actions">
      <a href="/login" onclick={(e) => handleNav(e, '/login')} class="action-btn">
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
        <a href="/" onclick={(e) => handleNav(e, '/')} class="nav-link" class:active={page.url.pathname === '/'}>Home</a>
        <a href="/hair-wellness" onclick={(e) => handleNav(e, '/hair-wellness')} class="nav-link" class:active={page.url.pathname === '/hair-wellness'}>Hair Wellness</a>
        <a href="/skin-wellness" onclick={(e) => handleNav(e, '/skin-wellness')} class="nav-link" class:active={page.url.pathname === '/skin-wellness'}>Skin Wellness</a>
        <a href="/best-selling-combo" onclick={(e) => handleNav(e, '/best-selling-combo')} class="nav-link" class:active={page.url.pathname === '/best-selling-combo'}>Best Selling Combo</a>
        <a href="/blog" onclick={(e) => handleNav(e, '/blog')} class="nav-link" class:active={page.url.pathname.startsWith('/blog')}>Blogs</a>
      </div>

      <button class="quiz-btn" onclick={() => store.openQuiz()}>
        Take Quiz
      </button>
    </div>
  </nav>
</header>

<!-- Voice Search Overlay -->
{#if showVoiceOverlay}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="voice-overlay" onclick={(e) => { if (e.target === e.currentTarget) closeVoiceOverlay(); }}>
    <div class="voice-modal">
      <!-- Close button -->
      <button class="voice-close-btn" onclick={closeVoiceOverlay} aria-label="Close voice search">
        <X size={22} />
      </button>

      <!-- Animated mic rings -->
      <div class="mic-animation-wrapper" class:listening={isListening}>
        <div class="mic-ring ring-3"></div>
        <div class="mic-ring ring-2"></div>
        <div class="mic-ring ring-1"></div>
        <button 
          class="mic-center-btn" 
          class:active={isListening}
          onclick={handleMicCenterClick}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          <Mic size={36} />
        </button>
      </div>

      <!-- Status text -->
      <div class="voice-status-text">
        {#if voiceStatus === 'listening'}
          <p class="status-label listening-label">Listening…</p>
        {:else if voiceStatus === 'done'}
          <p class="status-label done-label">Got it!</p>
        {:else}
          <p class="status-label idle-label">Tap the mic to speak</p>
        {/if}
      </div>

      <!-- Live transcript -->
      {#if interimTranscript || searchQuery}
        <div class="voice-transcript">
          <span class="transcript-text">{interimTranscript || searchQuery}</span>
        </div>
      {/if}

      <!-- Waveform bars shown while listening -->
      {#if isListening}
        <div class="voice-waveform">
          {#each [1,2,3,4,5,6,7] as bar}
            <div class="waveform-bar" style="animation-delay: {bar * 0.1}s"></div>
          {/each}
        </div>
      {/if}

      <p class="voice-hint">Speak clearly • Tap mic again to stop</p>
    </div>
  </div>
{/if}

<style>
  .top-banner {
    background: linear-gradient(90deg, #E04F36 0%, #F59E0B 100%);
    color: white;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    padding: 10px 24px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }
  .top-banner a {
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.2s ease, text-shadow 0.2s ease;
  }
  .top-banner a:hover {
    opacity: 0.95;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
  .top-banner span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .header {
    background: var(--white);
    border-bottom: 1px solid var(--border-light);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
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
    height: 48px;
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
    position: relative;
    padding: 4px 0;
    transition: color 0.2s ease;
  }

  .nav-link:hover, .nav-link.active {
    color: var(--primary);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--primary);
    border-radius: 3px 3px 0 0;
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
  
  .search-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    z-index: 100;
    border: 1px solid var(--border-light);
    overflow: hidden;
  }
  
  .search-results-list {
    display: flex;
    flex-direction: column;
  }

  .dropdown-header {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-muted);
    padding: 12px 16px 4px;
    letter-spacing: 0.05em;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s;
  }

  .search-result-item:hover {
    background: var(--surface-light);
  }

  .search-result-img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
  }
  
  .search-result-img.placeholder {
    background: var(--surface-light);
  }

  .search-result-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .search-result-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-dark);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .search-result-price {
    font-size: 0.8rem;
    color: var(--primary);
    font-weight: 700;
  }

  .search-empty {
    padding: 20px;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* ===========================
     VOICE SEARCH OVERLAY
  =========================== */

  :global(.voice-overlay) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: overlayIn 0.25s ease-out;
  }

  :global(.voice-modal) {
    background: white;
    border-radius: 24px;
    padding: 48px 40px 36px;
    width: min(480px, 92vw);
    text-align: center;
    position: relative;
    box-shadow: 0 24px 80px rgba(0,0,0,0.3);
    animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  :global(.voice-close-btn) {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s;
  }

  :global(.voice-close-btn:hover) {
    background: #e5e7eb;
    color: #111;
  }

  /* Mic rings */
  :global(.mic-animation-wrapper) {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.mic-ring) {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    border: 3px solid rgba(240, 81, 57, 0.4);
    transition: all 0.3s;
  }

  :global(.mic-ring.ring-1) { width: 80px; height: 80px; }
  :global(.mic-ring.ring-2) { width: 100px; height: 100px; }
  :global(.mic-ring.ring-3) { width: 120px; height: 120px; }

  :global(.mic-animation-wrapper.listening .mic-ring.ring-1) {
    opacity: 1;
    animation: micPulse 1.5s ease-out infinite;
  }
  :global(.mic-animation-wrapper.listening .mic-ring.ring-2) {
    opacity: 1;
    animation: micPulse 1.5s ease-out 0.35s infinite;
  }
  :global(.mic-animation-wrapper.listening .mic-ring.ring-3) {
    opacity: 1;
    animation: micPulse 1.5s ease-out 0.7s infinite;
  }

  :global(.mic-center-btn) {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #f3f4f6;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9ca3af;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    z-index: 1;
  }

  :global(.mic-center-btn.active) {
    background: var(--primary);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(240, 81, 57, 0.4);
  }

  :global(.mic-center-btn:hover) {
    transform: scale(1.05);
  }

  /* Status label */
  :global(.voice-status-text) {
    margin-bottom: 16px;
    min-height: 32px;
  }

  :global(.status-label) {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    transition: all 0.3s;
  }

  :global(.listening-label) {
    color: var(--primary);
    animation: fadeInOut 2s ease-in-out infinite;
  }

  :global(.done-label) {
    color: #10b981;
  }

  :global(.idle-label) {
    color: #6b7280;
  }

  /* Transcript */
  :global(.voice-transcript) {
    background: #f9fafb;
    border-radius: 12px;
    padding: 14px 20px;
    margin-bottom: 20px;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.transcript-text) {
    font-size: 1.15rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
    font-style: italic;
    letter-spacing: -0.01em;
  }

  /* Waveform bars */
  :global(.voice-waveform) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 40px;
    margin-bottom: 16px;
  }

  :global(.waveform-bar) {
    width: 5px;
    background: var(--primary);
    border-radius: 4px;
    animation: waveBar 1s ease-in-out infinite alternate;
  }

  :global(.waveform-bar:nth-child(1)) { height: 12px; animation-delay: 0s; }
  :global(.waveform-bar:nth-child(2)) { height: 24px; animation-delay: 0.1s; }
  :global(.waveform-bar:nth-child(3)) { height: 36px; animation-delay: 0.2s; }
  :global(.waveform-bar:nth-child(4)) { height: 40px; animation-delay: 0.3s; }
  :global(.waveform-bar:nth-child(5)) { height: 36px; animation-delay: 0.2s; }
  :global(.waveform-bar:nth-child(6)) { height: 24px; animation-delay: 0.1s; }
  :global(.waveform-bar:nth-child(7)) { height: 12px; animation-delay: 0s; }

  :global(.voice-hint) {
    font-size: 0.8rem;
    color: #9ca3af;
    margin: 0;
    margin-top: 8px;
  }

  /* Keyframes */
  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.85) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes micPulse {
    0% { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  @keyframes waveBar {
    from { transform: scaleY(0.3); }
    to { transform: scaleY(1); }
  }

  @keyframes fadeInOut {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>
