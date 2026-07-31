<script lang="ts">
  import { CheckCircle } from 'lucide-svelte';

  let { 
    badge = "STRONGER ROOTS • HEALTHIER HAIR", 
    title = "Complete Hair Regrowth Kit", 
    highlight = "Hair Regrowth", 
    description = "Our scientifically formulated 3-step system helps reduce hair fall, boost growth, and nourish your scalp for stronger, healthier hair. Clinically proven results in 90 days.", 
    promoTitle = "Not Sure Which Products Are<br>Right for You?",
    promoPoint1 = "Personalized recommendations",
    promoPoint2 = "2-minute assessment",
    image = "", 
    variant = 1 
  } = $props();
</script>

<div class="slide-banner variant-{variant}" style={image ? `background-image: url('${image}')` : ''}>
  <!-- Background gradient overlay for readability -->
  <div class="banner-overlay"></div>
  
  <div class="banner-content">
    {#if badge}
      <div class="badge-tag">
        <span class="badge-icon">🌿</span> {badge}
      </div>
    {/if}
    
    <h1 class="banner-title">
      {#if highlight && title.toLowerCase().includes(highlight.toLowerCase())}
        {@html title.replace(new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'), `<span class="highlight-text">$1</span>`)}
      {:else}
        {title}
      {/if}
    </h1>
    
    <p class="banner-desc">{description}</p>
    
    <!-- Promo Section (Editable by admin) -->
    <div class="constant-section">
      <h3 class="constant-title">{@html promoTitle}</h3>
      <ul class="constant-list">
        <li><CheckCircle size={16} color="#E04F36" fill="#FEF2F2" class="check-icon"/> {promoPoint1}</li>
        <li><CheckCircle size={16} color="#E04F36" fill="#FEF2F2" class="check-icon"/> {promoPoint2}</li>
      </ul>
    </div>
    
    <div class="banner-actions">
      <button class="btn-primary">Start Free hair Quiz &rarr;</button>
      <a href="/shop" class="btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Shop Collection</a>
    </div>
  </div>

  <!-- WhatsApp Floating Button -->
  <button class="whatsapp-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    Book Free Consultation
  </button>
</div>

<style>
  .slide-banner {
    position: relative;
    width: 100%;
    height: 560px;
    background-color: #FDF9F6; /* Fallback light cream color */
    background-size: cover;
    background-position: right center;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 60px;
    font-family: var(--font-body, 'Inter', sans-serif);
    border: 1px solid #E5E7EB;
  }

  .banner-overlay {
    position: absolute;
    inset: 0;
    /* Soft gradient from left (white) to right (transparent) to ensure text is readable */
    background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 45%, transparent 100%);
    z-index: 1;
  }

  .banner-content {
    position: relative;
    z-index: 2;
    max-width: 540px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .badge-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    color: #8B5CF6;
    padding: 6px 16px;
    border: 1px solid #C4B5FD;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
    text-transform: uppercase;
  }

  .badge-icon {
    font-size: 14px;
  }

  .banner-title {
    font-size: 42px;
    font-weight: 800;
    line-height: 1.1;
    color: #111827;
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif; /* Or similar serif font */
  }

  .banner-desc {
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 32px;
    max-width: 480px;
  }

  /* Constant Elements styling */
  .constant-section {
    margin-bottom: 24px;
  }

  .constant-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .constant-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .constant-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
  }

  .banner-actions {
    display: flex;
    gap: 16px;
  }

  .btn-primary {
    background: #E04F36;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .btn-secondary {
    background: transparent;
    color: #4B5563;
    border: 1px solid #D1D5DB;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background: white;
    border-color: #9CA3AF;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
  }

  .whatsapp-btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: black;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }

  /* =========================================
     CSS TEXT ANIMATIONS / STYLES (5 VARIANTS)
     ========================================= */

  /* VARIANT 1: Standard / Fade Up (Reference Style) */
  .variant-1 :global(.highlight-text) {
    color: #E04F36;
    font-style: italic;
  }
  .variant-1 .banner-title { animation: fadeUp 0.8s ease forwards; }
  .variant-1 .banner-desc { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }

  /* VARIANT 2: Typewriter Effect */
  .variant-2 :global(.highlight-text) {
    position: relative;
    color: #E04F36;
    border-bottom: 3px solid #E04F36;
    font-style: italic;
  }
  .variant-2 .banner-title {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 2s steps(40, end);
  }

  /* VARIANT 3: Gradient Text Animation */
  .variant-3 :global(.highlight-text) {
    background: linear-gradient(90deg, #E04F36, #F59E0B, #E04F36);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shine 3s linear infinite;
    font-style: italic;
  }

  /* VARIANT 4: Highlight Marker Effect */
  .variant-4 :global(.highlight-text) {
    background: linear-gradient(104deg, rgba(250, 214, 165, 0) 0.9%, #FDE68A 2.4%, #FDE68A 98%, rgba(250, 214, 165, 0) 99%);
    padding: 0 8px;
    border-radius: 4px;
    color: #111827;
    display: inline-block;
    transform: rotate(-1deg);
    font-style: italic;
  }

  /* VARIANT 5: Pop & Bop */
  .variant-5 :global(.highlight-text) {
    display: inline-block;
    color: #10B981;
    font-style: italic;
    animation: popBop 1.5s ease-in-out infinite alternate;
  }

  /* Keyframes */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  @keyframes popBop {
    0% { transform: scale(1); }
    100% { transform: scale(1.05) rotate(2deg); }
  }
</style>
