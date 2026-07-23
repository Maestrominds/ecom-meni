<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { Star, CheckCircle, Heart, UserCheck, Shield } from '@lucide/svelte';
  
  import founderStoryImg from '$lib/assets/landing_page/fonder_story.png';
  import peachWashImg from '$lib/assets/landing_page/pleach_section.png';
  import logo1 from '$lib/assets/landing_page/1im.png';
  import logo2 from '$lib/assets/landing_page/2im.png';
  import logo3 from '$lib/assets/landing_page/3im.png';
  import logo4 from '$lib/assets/landing_page/4im.png';

  const categories = [
    { name: 'Hair Wellness', img: '' }, 
    { name: 'Skin Wellness', img: '' },
    { name: 'Supplements', img: '' },
    { name: 'Combos', img: '' }
  ];

  let { data } = $props();
  const { products: mockProducts, blogs: mockBlogs } = data;

  // Map backend products to the UI format required by this page
  const products = mockProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.base_price,
    originalPrice: p.base_price * 1.3, // Mock original price
    rating: p.rating,
    reviews: 124, // Mock reviews
    badge: p.stock < 100 ? 'Top Seller' : '',
    desc: p.description,
    img: p.image_url
  }));

  const blogs = mockBlogs.map(b => ({
    date: b.date,
    title: b.title,
    excerpt: b.body.substring(0, 80) + '...',
    img: b.cover_image_url
  }));

  const videos = [
    { title: 'Healthy & Glowing Skin', img: '' },
    { title: 'Brightening Cream', img: '' },
    { title: 'Collagen Capsules', img: '' },
    { title: 'Healthy & Glowing Skin', img: '' }
  ];

  const instagram = [
    { img: '' }, { img: '' }, { img: '' }, { img: '' }
  ];

  const certs = [
    'FSSAI', 'European Commission', 'IFRA', 'FSSAI', 'European Commission', 'Bureau of Indian Standards'
  ];
</script>

<div class="landing-page">
  <!-- 1. Hero Section -->
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <span class="badge">STRONGER ROOTS • HEALTHIER HAIR</span>
        <h1>Complete <em>Hair Regrowth</em> Kit</h1>
        <p class="hero-desc">Our scientifically formulated 3-step system helps reduce hair fall, boost growth, and nourish your scalp for stronger, healthier hair. Clinically proven results in 90 days.</p>
        
        <div class="hero-question">
          <h3>Not Sure Which Products Are Right For You?</h3>
          <ul>
            <li><CheckCircle size={16} color="#E04F36"/> Personalized recommendations</li>
            <li><CheckCircle size={16} color="#E04F36"/> 2-minute assessment</li>
          </ul>
        </div>
        
        <div class="hero-actions">
          <button class="btn btn-primary">Start Free hair Quiz &rarr;</button>
          <button class="btn btn-secondary">Shop Collection</button>
        </div>
      </div>
      <div class="hero-image-placeholder">
        <!-- Main hero image empty placeholder -->
        <div class="placeholder-img" style="aspect-ratio: 1/1; background-color: #f0f0f0;"></div>
      </div>
    </div>
  </section>

  <!-- 1.1 Info Banner Marquee -->
  <div class="marquee-banner info-banner">
    <div class="marquee-track">
      <div class="marquee-content">
        <span>Dermatologist Tested</span> • <span>Cruelty Free</span> • <span>Made In India</span> • <span>10,000+ Happy Customers</span> •
      </div>
      <div class="marquee-content">
        <span>Dermatologist Tested</span> • <span>Cruelty Free</span> • <span>Made In India</span> • <span>10,000+ Happy Customers</span> •
      </div>
      <div class="marquee-content">
        <span>Dermatologist Tested</span> • <span>Cruelty Free</span> • <span>Made In India</span> • <span>10,000+ Happy Customers</span> •
      </div>
    </div>
  </div>

  <!-- 2. Shop By Category -->
  <section class="category-section section-spacing">
    <h2 class="section-title">Shop By Category</h2>
    <div class="category-grid">
      {#each categories as cat}
        <div class="category-card">
          <div class="category-img placeholder-img"></div>
          <h3>{cat.name}</h3>
        </div>
      {/each}
    </div>
  </section>

  <!-- 3. Our Best Sellers -->
  <section class="product-section section-spacing">
    <h2 class="section-title">Our Best Sellers</h2>
    <div class="product-grid">
      {#each products as product}
        <div class="product-card">
          <div class="product-img-wrapper placeholder-img" style="background-image: url('{product.img}'); background-size: cover; background-position: center;">
            {#if product.badge}
              <span class="product-badge" class:trending={product.badge === 'Trending now'}>{product.badge}</span>
            {/if}
          </div>
          <div class="product-info">
            <div class="product-rating">
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#e5e7eb" color="#e5e7eb"/>
              <span>{product.rating} ({product.reviews} Ratings)</span>
            </div>
            <h4 class="product-name">{product.name}</h4>
            <p class="product-desc">{product.desc}</p>
            <div class="product-price">
              <span class="current-price">₹{product.price}</span>
              <span class="original-price">₹{product.originalPrice}</span>
              <span class="savings">Save ₹{product.originalPrice - product.price}</span>
            </div>
            <button class="btn btn-cart"> Add To Cart</button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 4. Bundle Deals -->
  <section class="product-section section-spacing">
    <h2 class="section-title">Bundle Deals</h2>
    <div class="product-grid">
      {#each products as product}
        <div class="product-card">
          <div class="product-img-wrapper placeholder-img">
            {#if product.badge}
              <span class="product-badge" class:trending={product.badge === 'Trending now'}>{product.badge}</span>
            {/if}
          </div>
          <div class="product-info">
            <div class="product-rating">
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#e5e7eb" color="#e5e7eb"/>
              <span>{product.rating} ({product.reviews} Ratings)</span>
            </div>
            <h4 class="product-name">{product.name}</h4>
            <p class="product-desc">{product.desc}</p>
            <div class="product-price">
              <span class="current-price">₹{product.price}</span>
              <span class="original-price">₹{product.originalPrice}</span>
              <span class="savings">Save ₹{product.originalPrice - product.price}</span>
            </div>
            <button class="btn btn-cart"> Add To Cart</button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 5. Banner Section Marquee -->
  <div class="marquee-banner highlight-banner">
    <div class="marquee-track">
      <div class="marquee-content">
        <span>India's 1st Routine Based Nutra - Derma Wellness Brand</span> • 
      </div>
      <div class="marquee-content">
        <span>India's 1st Routine Based Nutra - Derma Wellness Brand</span> • 
      </div>
      <div class="marquee-content">
        <span>India's 1st Routine Based Nutra - Derma Wellness Brand</span> • 
      </div>
    </div>
  </div>

  <!-- 6. Watch It Order It Love It -->
  <section class="video-section section-spacing">
    <h2 class="section-title">Watch It • Order It • Love It</h2>
    <div class="video-grid">
      {#each videos as video}
        <div class="video-card placeholder-img">
          <div class="video-overlay">
            <span class="video-title">{video.title}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 7. Hair Wellness -->
  <section class="product-section section-spacing">
    <h2 class="section-title">Hair Wellness</h2>
    <div class="product-grid">
      {#each products as product}
        <div class="product-card">
          <div class="product-img-wrapper placeholder-img">
            {#if product.badge}
              <span class="product-badge" class:trending={product.badge === 'Trending now'}>{product.badge}</span>
            {/if}
          </div>
          <div class="product-info">
            <div class="product-rating">
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#e5e7eb" color="#e5e7eb"/>
              <span>{product.rating} ({product.reviews} Ratings)</span>
            </div>
            <h4 class="product-name">{product.name}</h4>
            <p class="product-desc">{product.desc}</p>
            <div class="product-price">
              <span class="current-price">₹{product.price}</span>
              <span class="original-price">₹{product.originalPrice}</span>
              <span class="savings">Save ₹{product.originalPrice - product.price}</span>
            </div>
            <button class="btn btn-cart"> Add To Cart</button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Skin Wellness -->
  <section class="product-section section-spacing">
    <h2 class="section-title">Skin Wellness</h2>
    <div class="product-grid">
      {#each products as product}
        <div class="product-card">
          <div class="product-img-wrapper placeholder-img">
            {#if product.badge}
              <span class="product-badge" class:trending={product.badge === 'Trending now'}>{product.badge}</span>
            {/if}
          </div>
          <div class="product-info">
            <div class="product-rating">
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#f59e0b" color="#f59e0b"/>
              <Star size={14} fill="#e5e7eb" color="#e5e7eb"/>
              <span>{product.rating} ({product.reviews} Ratings)</span>
            </div>
            <h4 class="product-name">{product.name}</h4>
            <p class="product-desc">{product.desc}</p>
            <div class="product-price">
              <span class="current-price">₹{product.price}</span>
              <span class="original-price">₹{product.originalPrice}</span>
              <span class="savings">Save ₹{product.originalPrice - product.price}</span>
            </div>
            <button class="btn btn-cart"> Add To Cart</button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 8. Peach Fruit Face Wash -->
  <section class="promo-banner-section section-spacing">
    <img src={peachWashImg} alt="Peach Fruit Face Wash Banner" class="full-width-img" />
  </section>

  <!-- 9. Founder's Story -->
  <section class="founder-section section-spacing">
    <img src={founderStoryImg} alt="Our Founder's Story" class="full-width-img" />
  </section>

  <!-- 10. Why Meni? -->
  <section class="why-meni section-spacing">
    <h2 class="section-title">Why Meni?</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon placeholder-img icon-placeholder"></div>
        <h4>Rooted In Science, Inspired By Nature</h4>
        <p>Our Formulations Blend Modern Science With Time-Tested Botanicals To Address Real Concerns...</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon placeholder-img icon-placeholder"></div>
        <h4>Scientifically Backed & Lab Tested</h4>
        <p>Every MENI Product Is Crafted With Scientifically-Researched And Proven Actives...</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon placeholder-img icon-placeholder"></div>
        <h4>Crafted For Indian Lifestyles</h4>
        <p>We Design Products Keeping Indian Skin, Hair, Climate, And Dietary Habits In Mind...</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon placeholder-img icon-placeholder"></div>
        <h4>Made For Modern, Conscious Consumers</h4>
        <p>MENI Products Are Cruelty-Free, Environmentally Responsible, And Made To Suit The Fast-Paced...</p>
      </div>
    </div>
  </section>

  <!-- 11. Certifications Marquee -->
  <div class="marquee-banner cert-banner section-spacing">
    <div class="marquee-track">
      <div class="marquee-content cert-content">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
        <img src={logo3} alt="Logo 3" />
        <img src={logo4} alt="Logo 4" />
      </div>
      <div class="marquee-content cert-content">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
        <img src={logo3} alt="Logo 3" />
        <img src={logo4} alt="Logo 4" />
      </div>
      <div class="marquee-content cert-content">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
        <img src={logo3} alt="Logo 3" />
        <img src={logo4} alt="Logo 4" />
      </div>
      <div class="marquee-content cert-content">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
        <img src={logo3} alt="Logo 3" />
        <img src={logo4} alt="Logo 4" />
      </div>
    </div>
  </div>

  <!-- 12. Instagram Section -->
  <section class="instagram-section section-spacing">
    <h2 class="section-title">Follow us on Instagram @meni.embrace_it</h2>
    <p class="section-subtitle">Explore Our Gentle Beauty Highlights From @Meni.Embrace_it</p>
    <div class="insta-grid">
      {#each instagram as post}
        <div class="insta-post placeholder-img"></div>
      {/each}
    </div>
  </section>

  <!-- 13. Blog Section -->
  <section class="blog-section section-spacing">
    <h2 class="section-title">Discover Wellness Insights</h2>
    <div class="blog-grid">
      {#each blogs as blog}
        <div class="blog-card">
          <div class="blog-img placeholder-img" style="background-image: url('{blog.img}'); background-size: cover; background-position: center;"></div>
          <div class="blog-content">
            <span class="blog-date">{blog.date}</span>
            <h4 class="blog-title">{blog.title}</h4>
            <p class="blog-excerpt">{blog.excerpt}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  :global(:root) {
    --primary-color: #E04F36;
    --text-dark: #333;
    --text-light: #666;
    --bg-light: #f9f9f9;
  }

  .landing-page {
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    overflow-x: hidden;
  }

  .section-spacing {
    padding: 60px 5%;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #111;
  }
  
  .section-subtitle {
    text-align: center;
    color: var(--text-light);
    margin-top: -30px;
    margin-bottom: 40px;
  }

  .placeholder-img {
    background-color: #eaeaea;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    font-size: 0.8rem;
  }

  /* Hero Section */
  .hero-section {
    background: #fdfaf6;
    padding: 40px 5%;
  }
  .hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .hero-content {
    flex: 1;
  }
  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: #fce8e5;
    color: var(--primary-color);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .hero-content h1 {
    font-size: 3.5rem;
    line-height: 1.1;
    margin-bottom: 20px;
  }
  .hero-content h1 em {
    color: var(--primary-color);
    font-style: italic;
  }
  .hero-desc {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 30px;
  }
  .hero-question h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
  .hero-question ul {
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
  }
  .hero-question li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: var(--text-light);
  }
  .hero-actions {
    display: flex;
    gap: 15px;
  }
  .btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
  }
  .btn-primary {
    background: var(--primary-color);
    color: white;
  }
  .btn-primary:hover {
    background: #c53e28;
  }
  .btn-secondary {
    background: transparent;
    border: 1px solid #ccc;
    color: var(--text-dark);
  }
  .hero-image-placeholder {
    flex: 1;
  }

  /* Marquee Banners */
  .marquee-banner {
    overflow: hidden;
    white-space: nowrap;
    padding: 15px 0;
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 20s linear infinite;
  }
  .info-banner {
    background: var(--primary-color);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
  }
  .highlight-banner {
    background: var(--primary-color);
    color: white;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 40px 0;
  }
  .cert-banner {
    background: white;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .marquee-content {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .marquee-content span {
    margin: 0 30px;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.33%); } /* Since we have 3 or more copies, move by 1/3 */
  }

  /* Category Grid */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .category-card {
    text-align: center;
  }
  .category-img {
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-bottom: 15px;
    width: 150px;
    height: 150px;
    margin: 0 auto 15px;
  }
  .category-card h3 {
    font-size: 1.2rem;
  }

  /* Product Grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .product-card {
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
    padding: 15px;
    background: white;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
  .product-img-wrapper {
    aspect-ratio: 1/1;
    position: relative;
    margin-bottom: 15px;
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
  }
  .product-rating {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 0.8rem;
    color: var(--text-light);
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
  }
  .product-desc {
    font-size: 0.85rem;
    color: var(--text-light);
  }
  .product-price {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
  }
  .current-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
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
    background: var(--primary-color);
    color: white;
    width: 100%;
    padding: 10px;
  }
  .btn-cart:hover {
    background: #c53e28;
  }

  /* Video Grid */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .video-card {
    aspect-ratio: 9/16;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }
  .video-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
  }
  .video-title {
    font-weight: 600;
  }

  /* Full Width Images */
  .full-width-img {
    width: 100%;
    height: auto;
    display: block;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .founder-section {
    text-align: center;
    background: #fff8f0;
  }
  .founder-logos {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  .founder-logos img {
    height: 50px;
    object-fit: contain;
  }

  /* Why Meni */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .feature-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    border-radius: 50%;
  }
  .feature-card h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  .feature-card p {
    font-size: 0.9rem;
    color: var(--text-light);
  }

  /* Certifications */
  .cert-content {
    display: flex;
    gap: 80px;
    align-items: center;
    padding: 0 40px;
  }
  .cert-content img {
    height: 60px;
    object-fit: contain;
  }

  /* Instagram */
  .insta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  .insta-post {
    aspect-ratio: 1/1;
  }

  /* Blog */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .blog-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    background: white;
  }
  .blog-img {
    aspect-ratio: 16/9;
  }
  .blog-content {
    padding: 20px;
  }
  .blog-date {
    font-size: 0.8rem;
    color: #999;
  }
  .blog-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 10px 0;
    line-height: 1.4;
  }
  .blog-excerpt {
    font-size: 0.9rem;
    color: var(--text-light);
  }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .hero-container {
      flex-direction: column;
    }
    .category-grid, .video-grid, .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .product-grid, .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .product-grid, .blog-grid, .features-grid, .category-grid, .video-grid {
      grid-template-columns: 1fr;
    }
    .hero-content h1 {
      font-size: 2.5rem;
    }
  }
</style>
