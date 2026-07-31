<script lang="ts">
  import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { store } from '$lib/store.svelte';
  
  let { data } = $props();
  let product = $derived(data.product);
  
  let quantity = $state(1);
  let isAdding = $state(false);
  let added = $state(false);
  
  let activeUserTab = $state('desc');
  let activeResultsSlide = $state(0);
  let selectedGalleryIdx = $state(0);
  
  let allGalleryImages = $derived(product.detail_tabs?.gallery_images?.length > 0 ? product.detail_tabs.gallery_images : (product.image_url ? [product.image_url] : []));
  let currentDisplayImage = $derived(allGalleryImages[selectedGalleryIdx] || product.image_url || '');
  
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
        {#if currentDisplayImage}
          <img src={currentDisplayImage} alt={product.name} class="main-image" />
        {:else}
          <div class="main-image placeholder-img flex-center">
            <span class="text-muted text-sm">No image</span>
          </div>
        {/if}
      </div>
      
      {#if allGalleryImages.length > 0}
        <div class="thumbnails">
          {#each allGalleryImages as img, idx}
            <button 
              type="button" 
              class="thumbnail" 
              class:active={selectedGalleryIdx === idx} 
              style="background-image: url('{img}')"
              onclick={() => selectedGalleryIdx = idx}
              aria-label={`View image ${idx + 1}`}
            ></button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Product Details Section -->
    <div class="product-details">
      <div class="category-tag">{product.category}</div>
      <h1 class="title">{product.name}</h1>
      
      <div class="pricing">
        <span class="current-price">₹{(product.base_price || 0).toFixed(2)}</span>
      </div>
      
      {#if product.description && product.description !== '""' && product.description.trim() !== ''}
        <p class="description">
          {product.description}
        </p>
      {/if}
      
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
      
      <div class="actions-wrapper">
        <div class="quantity-cart-row">
          <div class="quantity-selector">
            <button onclick={decreaseQuantity} disabled={quantity <= 1}><Minus size={20} /></button>
            <input type="number" bind:value={quantity} min="1" max={product.stock} readonly />
            <button onclick={increaseQuantity} disabled={quantity >= product.stock}><Plus size={20} /></button>
          </div>
          <button class="btn-add-cart" class:adding={isAdding} class:added={added} disabled={product.stock === 0 || isAdding} onclick={addToCart}>
            {#if isAdding} <span class="loader"></span> Adding... {:else if added} <Check size={24} /> Added to Cart {:else} Add to Cart - ₹{(product.base_price * quantity).toFixed(2)} {/if}
          </button>
        </div>
        <button class="btn-wishlist" aria-label="Add to wishlist">
          <Heart size={20} /> <span>Save to Wishlist</span>
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
    </div>
  </div><!-- End product-layout -->

  <!-- Rich Details Tabs (Full Width Below Top Layout - Matching Figma Image 1) -->
  <div class="rich-details-tabs-container">
    <div class="user-tabs-header">
      <button class="user-tab-btn" class:active={activeUserTab === 'desc'} onclick={() => activeUserTab = 'desc'}>Product Description</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'use'} onclick={() => activeUserTab = 'use'}>How to Use</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'works'} onclick={() => activeUserTab = 'works'}>How it Works</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'ingredients'} onclick={() => activeUserTab = 'ingredients'}>Key Ingredients</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'results'} onclick={() => activeUserTab = 'results'}>Results</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'certs'} onclick={() => activeUserTab = 'certs'}>Certificates</button>
    </div>

    <div class="user-tabs-content">
      <!-- 1. PRODUCT DESCRIPTION -->
      {#if activeUserTab === 'desc'}
        <div class="user-tab-pane">
          {#if product.detail_tabs?.product_description?.title}
            <h2 class="pane-title text-center">{product.detail_tabs.product_description.title}</h2>
          {/if}
          {#if product.detail_tabs?.product_description?.body}
            <p class="pane-body">{product.detail_tabs.product_description.body}</p>
          {/if}
          
          {#if product.detail_tabs?.product_description?.highlights && product.detail_tabs.product_description.highlights.length > 0}
            <div class="highlights-box">
              <h3>Key highlights:</h3>
              <ul>
                {#each product.detail_tabs.product_description.highlights as hl}
                  <li>{hl}</li>
                {/each}
              </ul>
            </div>
          {/if}

          {#if product.detail_tabs?.faqs && product.detail_tabs.faqs.length > 0}
            <div class="faq-section-user mt-12">
              <h3 class="faq-section-title text-center mb-6">Frequently Asked Questions</h3>
              <div class="faq-accordion-list">
                {#each product.detail_tabs.faqs as faq}
                  <div class="faq-item-card">
                    <h4 class="faq-question">Q: {faq.question}</h4>
                    <p class="faq-answer">{faq.answer}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- 2. HOW TO USE (Figma Alternating Zig-Zag Layout - Image 2) -->
      {#if activeUserTab === 'use'}
        <div class="user-tab-pane text-center">
          <h2 class="pane-title mb-2">
            {product.detail_tabs?.how_to_use?.section_title || 'How to Use'}
          </h2>
          <p class="pane-subtitle text-muted mb-8" style="max-width: 650px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Your step-by-step recovery journey, scientifically formulated for maximum follicular stimulation.
          </p>

          {#if product.detail_tabs?.how_to_use?.steps && product.detail_tabs.how_to_use.steps.length > 0}
            <div class="steps-zigzag-list">
              {#each product.detail_tabs.how_to_use.steps as step, idx}
                {@const stepImg = step.image_url || step.imageUrl || ''}
                <div class="step-row" class:row-reverse={idx % 2 === 1}>
                  <div class="step-img-box">
                    {#if stepImg}
                      <img src={stepImg} alt={step.title} />
                    {:else}
                      <div class="step-img-placeholder flex-center">
                        <span class="text-muted text-sm">Step {step.step_number || step.stepNumber || idx + 1} Image</span>
                      </div>
                    {/if}
                  </div>
                  <div class="step-content-box">
                    <div class="step-pill-wrapper mb-3">
                      <span class="step-pill">Step {step.step_number || idx + 1}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- 3. HOW IT WORKS (Figma Timeline - Image 1) -->
      {#if activeUserTab === 'works'}
        <div class="user-tab-pane">
          {#if product.detail_tabs?.how_it_works?.section_title}
            <h2 class="pane-title text-center mb-8">{product.detail_tabs.how_it_works.section_title}</h2>
          {/if}

          {#if product.detail_tabs?.how_it_works?.steps && product.detail_tabs.how_it_works.steps.length > 0}
            <div class="timeline-container">
              {#each product.detail_tabs.how_it_works.steps as step, idx}
                {@const tr = step.time_range || step.timeRange || ''}
                <div class="timeline-step">
                  <div class="timeline-badge-circle">
                    {idx + 1}
                  </div>
                  <div class="timeline-step-content">
                    {#if tr}
                      <span class="timeline-time-badge">{tr}</span>
                    {/if}
                    <h3 class="timeline-step-title">{step.title}</h3>
                    <p class="timeline-step-desc">{step.description}</p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          {#if product.detail_tabs?.how_it_works?.suitable_text}
            <div class="suitable-box-user mt-12 text-center">
              <h4>Suitable For:</h4>
              <p>{product.detail_tabs.how_it_works.suitable_text}</p>
            </div>
          {/if}
        </div>
      {/if}

      <!-- 4. KEY INGREDIENTS (Figma 3-Column Grid - Image 2) -->
      {#if activeUserTab === 'ingredients'}
        <div class="user-tab-pane">
          {#if product.detail_tabs?.key_ingredients && product.detail_tabs.key_ingredients.length > 0}
            <div class="ingredients-grid-3col">
              {#each product.detail_tabs.key_ingredients as ing}
                {@const img = ing.image_url || ing.imageUrl || ''}
                {@const desc = ing.benefit_description || ing.benefitDescription || ''}
                <div class="ingredient-card-clean">
                  <div class="ing-icon-circle flex-center">
                    {#if img}
                      <img src={img} alt={ing.name} />
                    {:else}
                      <span class="ing-emoji">🌿</span>
                    {/if}
                  </div>
                  <h4>{ing.name}</h4>
                  {#if desc}
                    <p>{desc}</p>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- 5. RESULTS GALLERY (Figma Large View - Image 3) -->
      {#if activeUserTab === 'results'}
        {@const results = (product.detail_tabs?.results_images || []).map((r: any) => typeof r === 'string' ? r : (r?.url || r?.image_url || r?.imageUrl || ''))}
        <div class="user-tab-pane">
          {#if results.length > 0}
            <div class="results-viewer-container">
              <button type="button" class="results-arrow left" onclick={() => activeResultsSlide = (activeResultsSlide - 1 + results.length) % results.length}>
                <ChevronLeft size={24} />
              </button>
              
              <div class="results-image-wrapper">
                <img src={results[activeResultsSlide]} alt="Visible result" class="results-main-image" />
              </div>

              <button type="button" class="results-arrow right" onclick={() => activeResultsSlide = (activeResultsSlide + 1) % results.length}>
                <ChevronRight size={24} />
              </button>
            </div>
            
            {#if results.length > 1}
              <div class="results-dots">
                {#each results as _, idx}
                  <button type="button" class="dot" class:active={idx === activeResultsSlide} onclick={() => activeResultsSlide = idx} aria-label={`Slide ${idx+1}`}></button>
                {/each}
              </div>
            {/if}
          {/if}
        </div>
      {/if}

      <!-- 6. CERTIFICATES -->
      {#if activeUserTab === 'certs'}
        <div class="user-tab-pane text-center">
          <h2 class="pane-title mb-6">Our Certifications</h2>
          <div class="certs-grid-user">
            <div class="cert-item-user">
              <div class="cert-icon-placeholder">🌿</div>
              <h4>100% Vegan</h4>
              <p>Made entirely from plant-based active formulations.</p>
            </div>
            <div class="cert-item-user">
              <div class="cert-icon-placeholder">🔬</div>
              <h4>Dermatologist Tested</h4>
              <p>Clinically proven safe for all scalp types.</p>
            </div>
            <div class="cert-item-user">
              <div class="cert-icon-placeholder">🛡️</div>
              <h4>Sulphate & Paraben Free</h4>
              <p>Free from harmful chemicals and preservatives.</p>
            </div>
            <div class="cert-item-user">
              <div class="cert-icon-placeholder">🐰</div>
              <h4>Cruelty Free</h4>
              <p>Never tested on animals.</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Base Variables and Polish */
  :root {
    --transition-bouncy: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --shadow-soft: 0 10px 40px -10px rgba(0,0,0,0.08);
    --shadow-glow: 0 12px 30px rgba(229, 91, 60, 0.25);
  }

  .product-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 24px 120px;
    font-family: var(--font-body);
  }
  
  /* Breadcrumbs */
  .breadcrumb {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }
  .breadcrumb a { color: var(--text-dark); transition: var(--transition-smooth); }
  .breadcrumb a:hover { color: var(--primary); }
  .breadcrumb span { margin: 0 12px; opacity: 0.5; }
  .breadcrumb .current { color: var(--text-muted); }
  
  /* Core Layout */
  .product-layout {
    display: grid;
    grid-template-columns: 55% 40%;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 60px;
  }
  
  .product-gallery { width: 100%; }
  .product-details { 
    position: sticky; 
    top: 120px; 
    padding-left: 20px;
  }

  /* Full Width Rich Details Tabs - Matching Figma Image 1 */
  .rich-details-tabs-container {
    width: 100%;
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .user-tabs-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    border-bottom: 2px solid #E5E7EB;
    margin-bottom: 48px;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 2px;
    scrollbar-width: none;
  }
  
  .user-tab-btn {
    background: transparent;
    border: none;
    font-size: 1.05rem;
    font-weight: 600;
    color: #6B7280;
    cursor: pointer;
    padding: 16px 8px;
    position: relative;
    transition: all 0.25s ease;
  }
  
  .user-tab-btn:hover { 
    color: var(--primary); 
    transform: translateY(-1px);
  }
  
  .user-tab-btn.active {
    color: var(--primary);
    font-weight: 800;
  }

  .user-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--primary);
    border-radius: 3px 3px 0 0;
    box-shadow: 0 2px 8px rgba(229, 91, 60, 0.4);
  }

  .user-tab-pane {
    animation: fadeInTab 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  @keyframes fadeInTab {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* How to Use - Figma Alternating Zig-Zag Layout (Image 2) */
  .steps-zigzag-list {
    display: flex;
    flex-direction: column;
    gap: 60px;
    max-width: 1000px;
    margin: 40px auto 0;
  }

  .step-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    text-align: left;
  }

  .step-row.row-reverse .step-img-box {
    order: 2;
  }

  .step-row.row-reverse .step-content-box {
    order: 1;
  }

  .step-img-box {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 24px;
    overflow: hidden;
    background: #F3F4F6;
    box-shadow: var(--shadow-soft);
  }

  .step-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .step-img-placeholder {
    width: 100%;
    height: 100%;
    background: #E5E7EB;
  }

  .step-content-box h3 {
    font-size: 1.85rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 16px;
    line-height: 1.25;
  }

  .step-content-box p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #4B5563;
    margin-bottom: 20px;
  }

  .step-pill {
    display: inline-block;
    background: linear-gradient(135deg, var(--primary) 0%, #D04A2B 100%);
    color: white;
    padding: 6px 18px;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  /* Gallery Reimagined */
  .main-image-container {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: #F8F9FA;
    aspect-ratio: 4/5;
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(0,0,0,0.03);
    margin-bottom: 24px;
  }
  
  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .main-image-container:hover .main-image {
    transform: scale(1.05);
  }
  
  .thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  
  .thumbnail {
    aspect-ratio: 1/1;
    border-radius: 16px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    cursor: pointer;
    background-color: #F8F9FA;
    transition: var(--transition-smooth);
    opacity: 0.7;
  }
  
  .thumbnail:hover, .thumbnail.active {
    opacity: 1;
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }
  
  /* Product Details Panel */
  .category-tag {
    font-size: 0.85rem;
    color: var(--primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 16px;
    display: inline-block;
    padding: 6px 14px;
    background: rgba(229, 91, 60, 0.1);
    border-radius: 20px;
  }
  
  .title {
    font-size: 2.25rem;
    font-weight: 800;
    color: #111827;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -0.01em;
  }
  
  .pricing {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .current-price {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--primary);
    letter-spacing: -0.01em;
  }
  
  .description {
    font-size: 1.05rem;
    color: #4B5563;
    line-height: 1.7;
    margin-bottom: 28px;
  }
  
  .stock-status {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #059669;
    margin-bottom: 40px;
    padding: 12px 20px;
    background: #F0FDF4;
    border-radius: 12px;
    border: 1px solid #DCFCE7;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #059669;
    box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.2);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(5, 150, 105, 0); }
    100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
  }
  
  .indicator.low { background: #D97706; box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.2); }
  .text-warning { color: #D97706; }
  .text-danger { color: #DC2626; }
  
  /* Add To Cart Area */
  .actions-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .quantity-cart-row {
    display: flex;
    gap: 16px;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    border: 2px solid #E5E7EB;
    border-radius: 16px;
    height: 64px;
    background: white;
    width: 140px;
    transition: var(--transition-smooth);
  }
  .quantity-selector:focus-within { border-color: var(--primary); }
  
  .quantity-selector button {
    width: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111827;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .quantity-selector button:hover { color: var(--primary); }
  
  .quantity-selector input {
    flex: 1;
    text-align: center;
    border: none;
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    background: transparent;
    outline: none;
  }
  
  .btn-add-cart {
    flex: 1;
    background: linear-gradient(135deg, var(--primary) 0%, #D04A2B 100%);
    color: white;
    border-radius: 16px;
    font-size: 1.05rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-glow);
    transition: var(--transition-bouncy);
    height: 64px;
  }
  
  .btn-add-cart:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(229, 91, 60, 0.35);
  }
  .btn-add-cart:active:not(:disabled) { transform: translateY(0) scale(0.98); }
  .btn-add-cart.added { background: #059669; box-shadow: 0 12px 30px rgba(5, 150, 105, 0.3); }
  
  .btn-wishlist {
    height: 64px;
    border-radius: 16px;
    border: 2px solid #E5E7EB;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4B5563;
    font-weight: 600;
    font-size: 1.05rem;
    gap: 10px;
    cursor: pointer;
    transition: var(--transition-smooth);
  }
  .btn-wishlist:hover {
    border-color: #F43F5E;
    color: #F43F5E;
    background: #FFF1F2;
  }
  
  /* Trust Badges */
  .trust-badges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    background: #F9FAFB;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #F3F4F6;
  }
  
  .badge-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #374151;
  }
  
  /* Tab Segmented Controls */
  .rich-details-tabs-container {
    padding-top: 20px;
  }
  
  .user-tabs-header {
    display: flex;
    background: #F3F4F6;
    padding: 8px;
    border-radius: 100px;
    margin-bottom: 48px;
    overflow-x: auto;
    white-space: nowrap;
    gap: 8px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .user-tab-btn {
    background: transparent;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: #6B7280;
    cursor: pointer;
    padding: 12px 24px;
    border-radius: 100px;
    transition: var(--transition-smooth);
    flex: 1;
    text-align: center;
  }
  
  .user-tab-btn:hover { color: #111827; }
  
  .user-tab-btn.active {
    background: white;
    color: #111827;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }
  
  .user-tab-pane {
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .pane-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 32px;
    letter-spacing: -0.02em;
  }
  
  .pane-body {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #4B5563;
    margin-bottom: 40px;
  }
  
  .highlights-box {
    background: linear-gradient(145deg, #F9FAFB 0%, #F3F4F6 100%);
    padding: 40px;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.8);
    box-shadow: var(--shadow-soft);
  }
  .highlights-box h3 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 24px;
    color: #111827;
  }
  .highlights-box ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 32px;
    list-style: none;
    padding: 0;
  }
  .highlights-box li {
    font-size: 1.05rem;
    color: #4B5563;
    position: relative;
    padding-left: 28px;
  }
  .highlights-box li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary);
    font-weight: 800;
  }
  
  /* How It Works - Timeline (Figma Image 1) */
  .timeline-container {
    position: relative;
    max-width: 800px;
    margin: 40px auto 0;
    padding-left: 20px;
  }

  .timeline-container::before {
    content: '';
    position: absolute;
    top: 14px;
    bottom: 40px;
    left: 35px;
    width: 2px;
    background: #E5E7EB;
  }

  .timeline-step {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 32px;
    margin-bottom: 48px;
  }

  .timeline-badge-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--primary);
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 2;
    margin-top: 2px;
    box-shadow: 0 0 0 4px white;
  }

  .timeline-step-content {
    text-align: left;
  }

  .timeline-time-badge {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--primary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .timeline-step-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .timeline-step-desc {
    font-size: 1rem;
    line-height: 1.7;
    color: #4B5563;
  }

  /* Key Ingredients - 3 Column Grid (Figma Image 2) */
  .ingredients-grid-3col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1050px;
    margin: 30px auto 0;
  }

  .ingredient-card-clean {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 36px 24px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .ingredient-card-clean:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.06);
  }

  .ing-icon-circle {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
    background: #F9FAFB;
    border: 3px solid #F3F4F6;
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    transition: transform 0.3s ease;
  }

  .ingredient-card-clean:hover .ing-icon-circle {
    transform: scale(1.05);
  }

  .ing-icon-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ing-emoji {
    font-size: 2.6rem;
  }

  .ingredient-card-clean h4 {
    font-size: 1.25rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 10px;
  }

  .ingredient-card-clean p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #6B7280;
  }

  /* Results Gallery (Figma Image 3) */
  .results-viewer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    max-width: 900px;
    margin: 40px auto 0;
  }

  .results-image-wrapper {
    max-width: 650px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    background: #000;
  }

  .results-main-image {
    width: 100%;
    max-height: 480px;
    object-fit: cover;
    display: block;
  }

  .results-arrow {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
    flex-shrink: 0;
  }

  .results-arrow.left {
    background: #E5E7EB;
    color: #4B5563;
  }
  .results-arrow.left:hover {
    background: #D1D5DB;
  }

  .results-arrow.right {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 15px rgba(229, 91, 60, 0.4);
  }
  .results-arrow.right:hover {
    transform: scale(1.05);
  }

  .results-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
  .results-dots .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #D1D5DB;
    border: none;
    cursor: pointer;
  }
  .results-dots .dot.active {
    background: var(--primary);
    width: 24px;
    border-radius: 10px;
  }

  /* FAQ Section under Product Description */
  .faq-section-user {
    margin-top: 48px;
    padding-top: 36px;
    border-top: 1px solid #E5E7EB;
  }

  .faq-section-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 24px;
  }

  .faq-accordion-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 850px;
    margin: 0 auto;
  }

  .faq-item-card {
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px 24px;
    text-align: left;
  }

  .faq-question {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .faq-answer {
    font-size: 1rem;
    line-height: 1.6;
    color: #4B5563;
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .product-details {
      position: static;
      padding-left: 0;
    }
    .step-row {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .step-row.row-reverse .step-img-box {
      order: 1;
    }
    .step-row.row-reverse .step-content-box {
      order: 2;
    }
    .ingredients-grid-3col {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .ingredients-grid-3col, .highlights-box ul {
      grid-template-columns: 1fr;
    }
    .quantity-cart-row { flex-direction: column; }
    .quantity-selector { width: 100%; }
    .user-tabs-header {
      justify-content: flex-start;
      gap: 20px;
    }
    .results-viewer-container {
      gap: 12px;
    }
    .results-arrow {
      width: 36px;
      height: 36px;
    }
  }
</style>

