<script lang="ts">
  import { Plus, GripVertical, Eye, UploadCloud, ChevronDown, Star } from 'lucide-svelte';

  const banners = [
    { id: '1', title: 'Monsoon Hair Care — 30% off', status: 'Active • ends Jun 30' },
    { id: '2', title: 'New launch: Vitamin C Serum', status: 'Scheduled • starts Jun 10' },
    { id: '3', title: 'Free shipping above ₹499', status: 'Active' }
  ];

  const blogPosts = [
    "5 reasons your hair fall isn't stopping",
    "How onion oil actually works",
    "Building your skincare routine"
  ];

  const reviews = [
    { product: 'Hair Fall Control Oil', author: 'Priya S.', rating: 5, text: 'Worked in 2 weeks!' },
    { product: 'Anti-Dandruff Shampoo', author: 'Rohan M.', rating: 4, text: 'Good but smell could be better.' }
  ];
</script>

<svelte:head>
  <title>Admin | Content Management</title>
</svelte:head>

<div class="content-container">
  <!-- Header -->
  <div class="page-header">
    <h1>Content Management</h1>
    <button class="btn-primary">
      <Plus size={16} /> New banner
    </button>
  </div>

  <div class="layout-grid mb-6">
    <!-- Homepage Banners -->
    <div class="card p-0">
      <div class="card-header border-bottom">
        <h3>Homepage banners</h3>
      </div>
      <div class="banner-list">
        {#each banners as banner}
          <div class="banner-item border-bottom">
            <div class="flex align-center gap-16">
              <GripVertical size={20} class="text-muted cursor-move" />
              <div class="banner-thumb"></div>
              <div>
                <div class="font-bold text-dark text-sm">{banner.title}</div>
                <div class="text-xs text-muted mt-1">{banner.status}</div>
              </div>
            </div>
            <a href="/admin/content/banner/edit/{banner.id}" class="btn-outline-small text-decoration-none">Edit</a>
          </div>
        {/each}
      </div>
    </div>

    <!-- Announcement Bar -->
    <div class="card p-0">
      <div class="card-header border-bottom">
        <h3>Announcement bar</h3>
      </div>
      <div class="p-6">
        <div class="form-group">
          <label>Text</label>
          <textarea rows="2">Free shipping on orders above ₹499 • Use FREESHIP</textarea>
        </div>
        <div class="form-group">
          <label>Link</label>
          <input type="text" value="/products" />
        </div>
        <button class="btn-primary">Save</button>
      </div>
    </div>
  </div>

  <!-- Blog Posts -->
  <div class="card p-0 mb-6">
    <div class="card-header flex-between border-bottom">
      <h3>Blog posts</h3>
      <button class="btn-primary">
        <Plus size={16} /> New post
      </button>
    </div>
    <div class="blog-list">
      {#each blogPosts as post}
        <div class="blog-item border-bottom flex-between p-6">
          <span class="font-bold text-dark text-sm">{post}</span>
          <Eye size={20} class="text-muted cursor-pointer" />
        </div>
      {/each}
    </div>
  </div>

  <!-- Review Moderation -->
  <div class="card p-0 mb-6">
    <div class="card-header border-bottom">
      <h3>Review moderation</h3>
    </div>
    <div class="p-6 border-bottom">
      <div class="flex-between align-end">
        <div class="form-group mb-0 flex-1 max-w-sm">
          <label>Product Name</label>
          <button class="dropdown-btn w-full">Select a product <ChevronDown size={16} /></button>
        </div>
        <button class="btn-primary">Import from Excel</button>
      </div>
    </div>
    
    <div class="review-list">
      {#each reviews as review}
        <div class="review-item border-bottom p-6">
          <div class="flex-between mb-2">
            <div>
              <div class="font-bold text-dark text-sm">{review.product}</div>
              <div class="text-xs text-muted">{review.author}</div>
            </div>
            <div class="flex text-yellow gap-2">
              {#each Array(5) as _, i}
                <Star size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 1} class={i >= review.rating ? "text-gray-300" : ""} />
              {/each}
            </div>
          </div>
          <p class="text-dark text-sm mb-4">{review.text}</p>
          <div class="flex gap-12">
            <button class="btn-primary-small">Approve</button>
            <button class="btn-outline-small">Reply</button>
            <button class="btn-text-small text-muted">Reject</button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Social Media & Product Links -->
  <div class="card p-0 mb-10">
    <div class="card-header flex-between border-bottom">
      <h3>Social Media & Product Links</h3>
      <button class="btn-primary">
        <Plus size={16} /> Add New Link
      </button>
    </div>
    <div class="p-6">
      <div class="flex gap-24 mb-6">
        <div class="form-group flex-1 mb-0">
          <label>YouTube or Instagram URL</label>
          <input type="text" placeholder="https://instagram.com/..." />
        </div>
        <div class="form-group flex-1 mb-0">
          <label>Product Name</label>
          <button class="dropdown-btn w-full">Holistic Haircare Combo <ChevronDown size={16} /></button>
        </div>
      </div>
      
      <div class="form-group">
        <label>Product Image</label>
        <div class="upload-zone">
          <UploadCloud size={32} class="text-muted mb-4" />
          <div class="font-bold text-dark text-sm mb-1">Click to upload or drag and drop</div>
          <div class="text-xs text-muted">PNG, JPG or WEBP (MAX. 800x400px)</div>
        </div>
      </div>
      
      <div class="flex justify-end mt-6">
        <button class="btn-primary">Upload now</button>
      </div>
    </div>
  </div>

</div>

<style>
  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F05139;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary-small {
    background: #F05139;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-outline-small {
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-text-small {
    background: none;
    border: none;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Grid Layouts */
  .layout-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .p-0 { padding: 0 !important; }
  .p-6 { padding: 24px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-10 { margin-bottom: 40px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-0 { margin-bottom: 0 !important; }
  .mt-1 { margin-top: 4px; }
  .mt-6 { margin-top: 24px; }

  .card-header {
    padding: 24px;
  }

  .border-bottom {
    border-bottom: 1px solid #F3F4F6;
  }

  .card-header h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #111827;
  }

  .banner-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
  }
  
  .banner-item:last-child, .blog-item:last-child, .review-item:last-child {
    border-bottom: none;
  }

  .banner-thumb {
    width: 48px;
    height: 32px;
    background: #F3F4F6;
    border-radius: 4px;
    border: 1px solid #E5E7EB;
  }

  /* Form */
  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #4B5563;
    margin-bottom: 8px;
  }

  .form-group input, .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    outline: none;
    font-family: inherit;
  }

  .dropdown-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    color: #111827;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
  }

  .upload-zone {
    border: 2px dashed #E5E7EB;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    background: #F9FAFB;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Utilities */
  .flex { display: flex; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .align-end { align-items: flex-end; }
  .justify-end { justify-content: flex-end; }
  .gap-16 { gap: 16px; }
  .gap-24 { gap: 24px; }
  .gap-12 { gap: 12px; }
  .gap-2 { gap: 4px; }
  .flex-1 { flex: 1; }
  .w-full { width: 100%; }
  .max-w-sm { max-width: 320px; }

  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-yellow { color: #F59E0B; }
  .text-gray-300 { color: #D1D5DB; }
  
  .font-bold { font-weight: 700; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-decoration-none { text-decoration: none; }

  .cursor-move { cursor: move; }
  .cursor-pointer { cursor: pointer; }
</style>
