<script lang="ts">
  import { ArrowLeft, Save, Image as ImageIcon, UploadCloud } from 'lucide-svelte';
  import SlideBanner from '$lib/components/SlideBanner.svelte';
  import { page } from '$app/stores';

  let bannerId = $page.params.id;

  // Form State
  let badge = $state('STRONGER ROOTS • HEALTHIER HAIR');
  let title = $state('Complete Hair Regrowth Kit');
  let highlight = $state('Hair Regrowth');
  let description = $state('Our scientifically formulated 3-step system helps reduce hair fall, boost growth, and nourish your scalp for stronger, healthier hair. Clinically proven results in 90 days.');
  let promoTitle = $state('Not Sure Which Products Are<br>Right for You?');
  let promoPoint1 = $state('Personalized recommendations');
  let promoPoint2 = $state('2-minute assessment');
  let image = $state('');
  let variant = $state(1);

  const styleVariants = [
    { id: 1, name: 'Classic Fade Up', desc: 'Elegant fade-in with italic highlight.' },
    { id: 2, name: 'Typewriter', desc: 'Types out the text with a solid underline.' },
    { id: 3, name: 'Gradient Shine', desc: 'Animated gradient text effect.' },
    { id: 4, name: 'Marker Highlight', desc: 'Hand-drawn yellow marker highlight.' },
    { id: 5, name: 'Pop & Bop', desc: 'Playful bouncing green highlight.' }
  ];

  function handleImageUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // Create a local blob URL for previewing the uploaded image instantly
      image = URL.createObjectURL(input.files[0]);
    }
  }
</script>

<svelte:head>
  <title>Admin | Edit Banner {bannerId}</title>
</svelte:head>

<div class="banner-edit-container">
  
  <div class="page-header flex-between mb-8">
    <div class="flex align-center gap-16">
      <a href="/admin/content" class="back-link"><ArrowLeft size={20} /></a>
      <div>
        <h1 class="text-2xl font-bold text-dark m-0">Edit Banner</h1>
        <div class="text-muted text-sm mt-1">Homepage hero slider / Banner #{bannerId}</div>
      </div>
    </div>
    <button class="btn-primary">
      <Save size={16} /> Save Changes
    </button>
  </div>

  <!-- Settings Grid (Top Section) -->
  <div class="settings-grid mb-10">
    
    <!-- Left Column -->
    <div class="flex flex-col gap-24">
      
      <!-- Content Section -->
      <div class="card p-6">
        <div class="flex-between mb-6">
          <h3 class="font-bold text-dark text-lg">Banner Content</h3>
          <span class="badge-blue-light">Text limits enforced</span>
        </div>
        
        <div class="form-group">
          <div class="flex-between mb-2">
            <label class="mb-0">Top Badge Text</label>
            <span class="text-xs text-muted">{badge.length}/40</span>
          </div>
          <input type="text" bind:value={badge} maxlength="40" placeholder="e.g. NEW LAUNCH" />
        </div>
        
        <div class="form-group">
          <div class="flex-between mb-2">
            <label class="mb-0">Main Title</label>
            <span class="text-xs text-muted">{title.length}/60</span>
          </div>
          <input type="text" bind:value={title} maxlength="60" placeholder="e.g. Complete Hair Regrowth Kit" />
        </div>
        
        <div class="form-group">
          <div class="flex-between mb-2">
            <label class="mb-0">Highlight Text (Must be inside title)</label>
            <span class="text-xs text-muted">{highlight.length}/30</span>
          </div>
          <input type="text" bind:value={highlight} maxlength="30" placeholder="e.g. Hair Regrowth" />
        </div>
        
        <div class="form-group mb-0">
          <div class="flex-between mb-2">
            <label class="mb-0">Description</label>
            <span class="text-xs text-muted">{description.length}/180</span>
          </div>
          <textarea rows="3" bind:value={description} maxlength="180" placeholder="Short promotional text..."></textarea>
        </div>
      </div>

      <!-- Promo Section -->
      <div class="card p-6">
        <div class="flex-between mb-6">
          <h3 class="font-bold text-dark text-lg">Promo Section (Below Description)</h3>
          <span class="badge-blue-light">Text limits enforced</span>
        </div>
        
        <div class="form-group">
          <div class="flex-between mb-2">
            <label class="mb-0">Promo Title (use &lt;br&gt; for line break)</label>
            <span class="text-xs text-muted">{promoTitle.length}/60</span>
          </div>
          <input type="text" bind:value={promoTitle} maxlength="60" placeholder="Not Sure Which Products Are<br>Right for You?" />
        </div>
        
        <div class="form-group">
          <div class="flex-between mb-2">
            <label class="mb-0">Bullet Point 1</label>
            <span class="text-xs text-muted">{promoPoint1.length}/40</span>
          </div>
          <input type="text" bind:value={promoPoint1} maxlength="40" placeholder="Personalized recommendations" />
        </div>
        
        <div class="form-group mb-0">
          <div class="flex-between mb-2">
            <label class="mb-0">Bullet Point 2</label>
            <span class="text-xs text-muted">{promoPoint2.length}/40</span>
          </div>
          <input type="text" bind:value={promoPoint2} maxlength="40" placeholder="2-minute assessment" />
        </div>
      </div>
      
    </div>

    <!-- Right Column (Image & Styles) -->
    <div class="flex flex-col gap-24">
      
      <!-- Image Section -->
      <div class="card p-6">
        <h3 class="font-bold text-dark text-lg mb-6">Background Image</h3>
        
        <div class="form-group">
          <label>Upload Local Image</label>
          <label class="upload-zone">
            <input type="file" accept="image/*" class="hidden-input" onchange={handleImageUpload} />
            <UploadCloud size={24} class="text-muted mb-2" />
            <div class="font-bold text-dark text-sm">Click to upload image</div>
            <div class="text-xs text-muted mt-1">PNG, JPG, or WEBP (Max 1MB)</div>
          </label>
        </div>

        <div class="form-group mb-0 relative">
          <div class="flex-between">
            <span class="text-xs font-bold text-muted uppercase">OR IMAGE URL</span>
          </div>
          <input type="text" bind:value={image} placeholder="https://..." class="mt-2" />
        </div>
      </div>

      <!-- Styles Section -->
      <div class="card p-6 flex-1">
        <h3 class="font-bold text-dark text-lg mb-4">CSS Text Styles</h3>
        <div class="style-options">
          {#each styleVariants as sv}
            <label class="style-card" class:active={variant === sv.id}>
              <input type="radio" name="variant" bind:group={variant} value={sv.id} class="hidden-radio" />
              <div class="flex-between w-full">
                <div>
                  <div class="font-bold text-dark text-sm">{sv.name}</div>
                  <div class="text-xs text-muted mt-1">{sv.desc}</div>
                </div>
                <div class="radio-indicator"></div>
              </div>
            </label>
          {/each}
        </div>
      </div>

    </div>
  </div>

  <!-- Full-Width Live Preview (Bottom Section) -->
  <div class="preview-section mb-10">
    <div class="flex-between mb-6">
      <h3 class="font-bold text-dark text-2xl">Live Preview</h3>
      <div class="flex gap-12 align-center">
        <span class="text-sm text-muted">Previewing at Desktop Size (1440px wide)</span>
        <span class="badge-green-light">Auto-updating</span>
      </div>
    </div>
    
    <div class="preview-window">
      <!-- Force re-render of component when variant changes to replay animations -->
      {#key variant}
        <SlideBanner 
          {badge} 
          {title} 
          {highlight} 
          {description} 
          {promoTitle}
          {promoPoint1}
          {promoPoint2}
          {image} 
          {variant} 
        />
      {/key}
    </div>
  </div>

</div>

<style>
  .banner-edit-container {
    max-width: 1400px;
    margin: 0 auto;
    font-family: var(--font-body);
    padding-bottom: 60px;
  }

  /* Header */
  .back-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    color: #4B5563;
    transition: all 0.2s;
  }
  .back-link:hover {
    background: #F9FAFB;
    color: #111827;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #E04F36;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Layout */
  .settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  /* Cards */
  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .p-6 { padding: 24px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-8 { margin-bottom: 32px; }
  .mb-10 { margin-bottom: 40px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-0 { margin-bottom: 0 !important; }

  /* Forms */
  .form-group { margin-bottom: 24px; }
  .form-group label { display: block; font-size: 13px; font-weight: 600; color: #374151; }
  .form-group input[type="text"], .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .form-group input[type="text"]:focus, .form-group textarea:focus { border-color: #E04F36; }
  
  /* Upload Zone */
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #D1D5DB;
    border-radius: 8px;
    padding: 24px;
    background: #F9FAFB;
    cursor: pointer;
    transition: all 0.2s;
  }
  .upload-zone:hover {
    border-color: #9CA3AF;
    background: #F3F4F6;
  }
  .hidden-input { display: none; }

  /* Style Selector */
  .style-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .style-card {
    display: flex;
    padding: 12px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .style-card:hover {
    border-color: #D1D5DB;
    background: #F9FAFB;
  }
  .style-card.active {
    border-color: #E04F36;
    background: #FFF5F5;
  }
  .hidden-radio { display: none; }
  .radio-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #D1D5DB;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .style-card.active .radio-indicator {
    border-color: #E04F36;
  }
  .style-card.active .radio-indicator::after {
    content: '';
    width: 10px;
    height: 10px;
    background: #E04F36;
    border-radius: 50%;
  }

  /* Preview Window */
  .preview-section {
    width: 100%;
  }
  .preview-window {
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    background: #F9FAFB;
  }

  /* Utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .gap-16 { gap: 16px; }
  .gap-24 { gap: 24px; }
  .gap-12 { gap: 12px; }
  .w-full { width: 100%; }
  .flex-1 { flex: 1; }
  
  .font-bold { font-weight: 700; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 18px; }
  .text-2xl { font-size: 24px; }
  
  .m-0 { margin: 0; }
  .mt-1 { margin-top: 4px; }
  .mt-2 { margin-top: 8px; }
  
  .uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }
  .badge-blue-light { background: #EFF6FF; color: #2563EB; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }
</style>
