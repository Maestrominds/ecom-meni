<script lang="ts">
  import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { store } from '$lib/store.svelte';
  
  let { data } = $props();
  let { product } = data;
  
  let quantity = 1;
  let isAdding = false;
  let added = false;
  
  let activeUserTab = $state('desc');
  let activeResultsSlide = $state(0);
  
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
      
    </div>
  </div>

  <!-- Rich Details Tabs (Full Width) -->
  <div class="rich-details-tabs-container">
    <div class="user-tabs-header">
      <button class="user-tab-btn" class:active={activeUserTab === 'desc'} onclick={() => activeUserTab = 'desc'}>Product Description</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'use'} onclick={() => activeUserTab = 'use'}>How To Use</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'works'} onclick={() => activeUserTab = 'works'}>How It Works</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'ingredients'} onclick={() => activeUserTab = 'ingredients'}>Key Ingredients</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'results'} onclick={() => activeUserTab = 'results'}>Results</button>
      <button class="user-tab-btn" class:active={activeUserTab === 'certs'} onclick={() => activeUserTab = 'certs'}>Certificates</button>
    </div>

    <div class="user-tabs-content">
      <!-- 1. PRODUCT DESCRIPTION -->
      {#if activeUserTab === 'desc'}
        <div class="user-tab-pane">
          <h2 class="pane-title text-center">{product.detail_tabs?.product_description?.title || 'Holistic Hair Care Combo'}</h2>
          <p class="pane-body">{product.detail_tabs?.product_description?.body || 'MENI Holistic Hair Care Combo combines to provide complete hair care from root to routine. This 3-step system helps reduce hair fall, strengthen roots, nourish the scalp and support healthier, fuller-looking hair. Visible Results in 12 Weeks with consistent use, delivering both external care and internal nourishment for long-term hair wellness.'}</p>
          
          <div class="highlights-box">
            <h3>Key highlights:</h3>
            <ul>
              {#if product.detail_tabs?.product_description?.highlights && product.detail_tabs.product_description.highlights.length > 0}
                {#each product.detail_tabs.product_description.highlights as hl}
                  <li>{hl}</li>
                {/each}
              {:else}
                <li>90% Absorption Rate Formula</li>
                <li>Nourishes with Essential Hair Nutrients</li>
                <li>Helps Reduce Hair Fall</li>
                <li>Promotes Thicker, Fuller-Looking Hair</li>
                <li>Sulphate-Free Gentle Cleansing</li>
                <li>Hyaluronic Acid for Deep Hydration</li>
              {/if}
            </ul>
          </div>
        </div>
      {/if}

      <!-- 2. HOW TO USE -->
      {#if activeUserTab === 'use'}
        <div class="user-tab-pane text-center">
          <h2 class="pane-title mb-6">{product.detail_tabs?.how_to_use?.section_title || 'How to Use'}</h2>
          <div class="steps-grid-user">
            {#if product.detail_tabs?.how_to_use?.steps && product.detail_tabs.how_to_use.steps.length > 0}
              {#each product.detail_tabs.how_to_use.steps as step}
                <div class="step-card-user">
                  {#if step.image_url}
                    <img src={step.image_url} alt={step.title} class="step-img-user" />
                  {:else}
                    <div class="step-img-user placeholder"></div>
                  {/if}
                  <span class="step-badge-user">Step {step.step_number}</span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              {/each}
            {:else}
              <!-- Fallbacks -->
              <div class="step-card-user">
                <div class="step-img-user placeholder-1"></div>
                <span class="step-badge-user">Step 1</span>
                <h4>Cleanse with Shampoo</h4>
                <p>Apply Hyaluronic Hair Shampoo to wet hair. Massage gently into the scalp for 1-2 minutes, then rinse thoroughly.</p>
              </div>
              <div class="step-card-user">
                <div class="step-img-user placeholder-2"></div>
                <span class="step-badge-user">Step 2</span>
                <h4>Nourish with Capsules</h4>
                <p>Take one Marine Collagen Capsule daily with water, preferably after a meal to nourish hair roots from within.</p>
              </div>
              <div class="step-card-user">
                <div class="step-img-user placeholder-3"></div>
                <span class="step-badge-user">Step 3</span>
                <h4>Stimulate with Serum</h4>
                <p>Apply 2-3 drops of Min-Rich Hair Serum to dry scalp. Massage lightly and leave in. Use twice daily.</p>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- 3. HOW IT WORKS -->
      {#if activeUserTab === 'works'}
        <div class="user-tab-pane">
          <h2 class="pane-title text-center mb-8">{product.detail_tabs?.how_it_works?.section_title || 'How It Works'}</h2>
          
          <div class="timeline-user">
            {#if product.detail_tabs?.how_it_works?.steps && product.detail_tabs.how_it_works.steps.length > 0}
              {#each product.detail_tabs.how_it_works.steps as step}
                <div class="timeline-item-user">
                  <div class="timeline-circle-user">{step.time_range}</div>
                  <div class="timeline-content-user">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              {/each}
            {:else}
              <!-- Timeline default fallbacks -->
              <div class="timeline-item-user">
                <div class="timeline-circle-user">W1-2</div>
                <div class="timeline-content-user">
                  <h4>Scalp Nourishment Begins</h4>
                  <p>The Hyaluronic Hair Shampoo gently cleanses while the Marine Collagen Capsules begin replenishing essential amino acids. You may notice reduced scalp dryness and less post-wash breakage.</p>
                </div>
              </div>
              <div class="timeline-item-user">
                <div class="timeline-circle-user">W3-4</div>
                <div class="timeline-content-user">
                  <h4>Hair Fall Reduction</h4>
                  <p>DHT-blocking ingredients from the capsules start regulating dihydrotestosterone levels. The Min-Rich Hair Serum activates dormant follicles with a Minoxidil-alternative complex. Expect noticeably less shedding on comb and pillow.</p>
                </div>
              </div>
              <div class="timeline-item-user">
                <div class="timeline-circle-user">W5-8</div>
                <div class="timeline-content-user">
                  <h4>New Growth Visible</h4>
                  <p>Baby hair and new growth appear along the hairline and crown. Existing strands become stronger, thicker, and more lustrous due to collagen fortification from within.</p>
                </div>
              </div>
              <div class="timeline-item-user">
                <div class="timeline-circle-user">W9-12</div>
                <div class="timeline-content-user">
                  <h4>Full Transformation</h4>
                  <p>Significantly improved hair density, reduced breakage, and a healthier scalp ecosystem. Most users report 60-80% reduction in daily hair fall. The routine is now a lifestyle.</p>
                </div>
              </div>
            {/if}
          </div>

          <div class="suitable-box-user mt-8">
            <h4>Suitable For:</h4>
            <p>{product.detail_tabs?.how_it_works?.suitable_text || 'Suitable for dry, frizzy, normal or thinning hair. Perfect for both men and women struggling with excessive hair fall and scalp dryness.'}</p>
          </div>
        </div>
      {/if}

      <!-- 4. KEY INGREDIENTS -->
      {#if activeUserTab === 'ingredients'}
        <div class="user-tab-pane">
          <h2 class="pane-title text-center mb-6">Key Ingredients</h2>
          <div class="ingredients-grid-user">
            {#if product.detail_tabs?.key_ingredients && product.detail_tabs.key_ingredients.length > 0}
              {#each product.detail_tabs.key_ingredients as ing}
                <div class="ingredient-card-user">
                  {#if ing.image_url}
                    <img src={ing.image_url} alt={ing.name} class="ing-img-user" />
                  {:else}
                    <div class="ing-img-user placeholder"></div>
                  {/if}
                  <h4>{ing.name}</h4>
                  <p>{ing.benefit_description}</p>
                </div>
              {/each}
            {:else}
              <!-- default mock ingredients -->
              <div class="ingredient-card-user">
                <div class="ing-img-user placeholder-ing1"></div>
                <h4>Marine Collagen</h4>
                <p>Nourishes hair follicles, provides essential amino acids, and supports hair root structure from within.</p>
              </div>
              <div class="ingredient-card-user">
                <div class="ing-img-user placeholder-ing2"></div>
                <h4>Hyaluronic Acid</h4>
                <p>Delivers deep, long-lasting hydration to the scalp, locking in moisture and preventing dryness.</p>
              </div>
              <div class="ingredient-card-user">
                <div class="ing-img-user placeholder-ing3"></div>
                <h4>Min-Rich Complex</h4>
                <p>A natural botanical extract complex designed to stimulate circulation and promote active growth phase.</p>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- 5. RESULTS -->
      {#if activeUserTab === 'results'}
        <div class="user-tab-pane">
          <h2 class="pane-title text-center mb-6">Visible Results</h2>
          
          {#const results = product.detail_tabs?.results_images || []}
          {#if results.length > 0}
            <div class="results-slider-user relative">
              <button type="button" class="slider-arrow left" onclick={() => activeResultsSlide = (activeResultsSlide - 1 + results.length) % results.length}>
                <ChevronLeft size={24} />
              </button>
              <div class="slider-image-user-box">
                <img src={results[activeResultsSlide]} alt="Result slide" class="slider-image-user" />
              </div>
              <button type="button" class="slider-arrow right" onclick={() => activeResultsSlide = (activeResultsSlide + 1) % results.length}>
                <ChevronRight size={24} />
              </button>
            </div>
            <div class="slider-dots">
              {#each results as _, idx}
                <span class="dot" class:active={idx === activeResultsSlide}></span>
              {/each}
            </div>
          {:else}
            <!-- default dummy results images slider -->
            <div class="results-slider-user relative">
              <div class="slider-image-user-box">
                <div class="slider-placeholder-user">
                  <h4>12 Weeks Transformation</h4>
                  <p>Check back later to view customer before/after photos.</p>
                </div>
              </div>
            </div>
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

  /* User Tabs Styling */
  .rich-details-tabs-container {
    margin-top: 60px;
    border-top: 1px solid var(--border-light);
    padding-top: 40px;
  }

  .user-tabs-header {
    display: flex;
    justify-content: center;
    border-bottom: 2px solid var(--border-light);
    margin-bottom: 40px;
    overflow-x: auto;
    white-space: nowrap;
    gap: 24px;
    padding-bottom: 8px;
  }

  .user-tab-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    padding: 12px 8px;
    position: relative;
    transition: var(--transition-smooth);
  }

  .user-tab-btn:hover {
    color: var(--primary);
  }

  .user-tab-btn.active {
    color: var(--primary);
  }

  .user-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
  }

  .user-tab-pane {
    max-width: 800px;
    margin: 0 auto;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pane-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 20px;
  }

  .pane-body {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-muted);
    margin-bottom: 30px;
  }

  .highlights-box {
    background: #FAFAFA;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border-light);
  }

  .highlights-box h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 16px;
  }

  .highlights-box ul {
    list-style-type: disc;
    padding-left: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
  }

  .highlights-box li {
    font-size: 1rem;
    color: var(--text-muted);
  }

  /* Steps List */
  .steps-grid-user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .step-card-user {
    background: #FAFAFA;
    border: 1px solid var(--border-light);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
  }

  .step-img-user {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 16px;
    background: #E5E7EB;
  }

  .step-badge-user {
    display: inline-block;
    background: rgba(229, 91, 60, 0.1);
    color: var(--primary);
    font-size: 0.8rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  .step-card-user h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .step-card-user p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  /* Timeline */
  .timeline-user {
    position: relative;
    padding-left: 60px;
  }

  .timeline-user::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-light);
  }

  .timeline-item-user {
    position: relative;
    margin-bottom: 40px;
  }

  .timeline-circle-user {
    position: absolute;
    left: -60px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--primary);
    background: white;
    color: var(--primary);
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timeline-content-user h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .timeline-content-user p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  .suitable-box-user {
    background: #FAFAFA;
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid var(--primary);
  }

  .suitable-box-user h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 6px;
  }

  .suitable-box-user p {
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  /* Ingredients */
  .ingredients-grid-user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .ingredient-card-user {
    border: 1px solid var(--border-light);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }

  .ing-img-user {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 16px;
    background: #E5E7EB;
  }

  .ingredient-card-user h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .ingredient-card-user p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  /* Results Slider */
  .results-slider-user {
    background: #000;
    border-radius: 16px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .slider-image-user-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-image-user {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .slider-arrow {
    position: absolute;
    background: rgba(255,255,255,0.8);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s;
  }

  .slider-arrow:hover {
    background: white;
  }

  .slider-arrow.left { left: 24px; }
  .slider-arrow.right { right: 24px; }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-light);
    transition: background 0.2s;
  }

  .dot.active {
    background: var(--primary);
  }

  .slider-placeholder-user {
    color: white;
    text-align: center;
    padding: 40px;
  }

  /* Certificates */
  .certs-grid-user {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .cert-item-user {
    background: #FAFAFA;
    border: 1px solid var(--border-light);
    padding: 24px 16px;
    border-radius: 12px;
  }

  .cert-icon-placeholder {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .cert-item-user h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 6px;
  }

  .cert-item-user p {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--text-muted);
  }

  @media (max-width: 900px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .steps-grid-user, .ingredients-grid-user {
      grid-template-columns: 1fr;
    }

    .certs-grid-user {
      grid-template-columns: repeat(2, 1fr);
    }

    .highlights-box ul {
      grid-template-columns: 1fr;
    }
  }
</style>
