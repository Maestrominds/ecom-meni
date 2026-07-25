<script lang="ts">
  import { Plus, GripVertical, Eye, UploadCloud, ChevronDown, Star, Trash2 } from 'lucide-svelte';
  import { env } from '$env/dynamic/public';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { api } from '$lib/data/mockApi';

  let { data }: { data: PageData } = $props();

  const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api/v1';

  // State variables initialized from data
  let banners = $state(data.banners || []);
  let announcementText = $state(data.announcement?.Text || '');
  let announcementLink = $state(data.announcement?.LinkUrl || '');
  let isActive = $state(data.announcement?.IsActive || false);
  
  let blogPosts = $state(data.blogs || []);
  let reviews = $state(data.reviews || []);
  let socialLinks = $state(data.socialLinks || []);

  let allProducts = $state<any[]>([]);
  let videoCards = $state([
    { title: 'Healthy & Glowing Skin', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', productId: '', productName: '', searchQuery: '', showDropdown: false },
    { title: 'Brightening Cream', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', productId: '', productName: '', searchQuery: '', showDropdown: false },
    { title: 'Collagen Capsules', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', productId: '', productName: '', searchQuery: '', showDropdown: false },
    { title: 'Healthy & Glowing Skin', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', productId: '', productName: '', searchQuery: '', showDropdown: false }
  ]);

  onMount(async () => {
    try {
      allProducts = await api.products.getAll();
    } catch(e) {
      console.error(e);
    }
    const saved = localStorage.getItem('homepage_videos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        videoCards = parsed.map((v: any) => ({
          ...v,
          searchQuery: v.productName || '',
          showDropdown: false
        }));
      } catch(e) {}
    }
  });

  function saveVideoCards() {
    localStorage.setItem('homepage_videos', JSON.stringify(videoCards));
    alert("Video Cards configuration saved to local storage! (Note: backend developer tasks added to TODO.md)");
  }

  // New Social Link State
  let newSocialUrl = $state('');
  let newSocialProduct = $state('');
  let newSocialImage = $state(''); // Would hold URL after upload

  // Handlers
  async function saveAnnouncement() {
    try {
      const res = await fetch(`${baseUrl}/admin/content/announcement`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: announcementText,
          link_url: announcementLink,
          is_active: isActive || true // default to true if they are saving it
        })
      });
      if (res.ok) {
        alert('Announcement saved!');
      } else {
        alert('Failed to save announcement');
      }
    } catch (e) {
      alert('Error saving announcement');
    }
  }

  async function updateReviewStatus(id: string, status: string) {
    try {
      const res = await fetch(`${baseUrl}/admin/content/reviews/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        reviews = reviews.map(r => r.ID === id ? { ...r, Status: status } : r);
      } else {
        alert('Failed to update review');
      }
    } catch (e) {
      alert('Error updating review');
    }
  }

  async function replyToReview(id: string) {
    const reply = prompt("Enter your reply to this review:");
    if (!reply) return;
    
    try {
      const res = await fetch(`${baseUrl}/admin/content/reviews/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply_text: reply })
      });
      if (res.ok) {
        reviews = reviews.map(r => r.ID === id ? { ...r, ReplyText: { String: reply, Valid: true } } : r);
        alert('Reply added!');
      }
    } catch (e) {
      alert('Error adding reply');
    }
  }

  async function handleSocialImageUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      newSocialImage = URL.createObjectURL(file);
      
      try {
        const presignRes = await fetch(`${baseUrl}/admin/upload/presigned-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, content_type: file.type })
        });
        
        if (!presignRes.ok) throw new Error('Failed to get presigned URL');
        const { upload_url, public_url } = await presignRes.json();
        
        const uploadRes = await fetch(upload_url, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file
        });
        
        if (!uploadRes.ok) throw new Error('Failed to upload to storage');
        newSocialImage = public_url;
      } catch (err) {
        console.error(err);
        alert("Image upload failed.");
      }
    }
  }

  function editBlog(id: string) {
    alert("Blog editing will be available once the backend developer implements the PUT /api/v1/admin/blogs/:id API endpoint (added to TODO.md).");
  }

  async function deleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`${baseUrl}/admin/blogs/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        blogPosts = blogPosts.filter(b => b.ID !== id);
        alert("Blog deleted successfully!");
      } else {
        alert("Delete API not implemented by backend developer yet. (Tasks added to TODO.md)");
      }
    } catch(e) {
      alert("Error deleting blog.");
    }
  }

  async function createSocialLink() {
    if (!newSocialUrl) {
      alert("Please provide a URL");
      return;
    }
    
    // Send a real valid product ID as fallback default to satisfy backend constraint until Go developer removes it
    let fallbackProductId = allProducts[0]?.id || "";

    try {
      const res = await fetch(`${baseUrl}/admin/content/social-links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: newSocialUrl,
          product_id: fallbackProductId,
          image_url: newSocialUrl // Using URL as a placeholder image until developer removes constraint
        })
      });
      if (res.ok) {
        const link = await res.json();
        socialLinks = [...socialLinks, link];
        newSocialUrl = '';
      } else {
        alert('Failed to create social link');
      }
    } catch (e) {
      alert('Error creating social link');
    }
  }

  async function deleteSocialLink(id: string) {
    if (!confirm('Delete this social link?')) return;
    try {
      const res = await fetch(`${baseUrl}/admin/content/social-links/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        socialLinks = socialLinks.filter(l => l.ID !== id);
      } else {
        alert('Failed to delete social link');
      }
    } catch (e) {
      alert('Error deleting social link');
    }
  }
</script>

<svelte:head>
  <title>Admin | Content Management</title>
</svelte:head>

<div class="content-container">
  <!-- Header -->
  <div class="page-header">
    <h1>Content Management</h1>
    <a href="/admin/content/banner/edit/new" class="btn-primary text-decoration-none">
      <Plus size={16} /> New banner
    </a>
  </div>

  <div class="layout-grid mb-6">
    <!-- Homepage Banners -->
    <div class="card p-0">
      <div class="card-header border-bottom">
        <h3>Homepage banners</h3>
      </div>
      <div class="banner-list">
        {#if banners.length === 0}
          <div class="p-6 text-muted text-sm text-center">No banners found.</div>
        {/if}
        {#each banners as banner}
          <div class="banner-item border-bottom">
            <div class="flex align-center gap-16">
              <GripVertical size={20} class="text-muted cursor-move" />
              <div class="banner-thumb" style={banner.ImageUrl ? `background-image: url(${banner.ImageUrl}); background-size: cover;` : ''}></div>
              <div>
                <div class="font-bold text-dark text-sm">{banner.Title}</div>
                <div class="text-xs text-muted mt-1">{banner.Status}</div>
              </div>
            </div>
            <a href="/admin/content/banner/edit/{banner.ID}" class="btn-outline-small text-decoration-none">Edit</a>
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
          <textarea bind:value={announcementText} rows="2" placeholder="Free shipping on orders above ₹499 • Use FREESHIP"></textarea>
        </div>
        <div class="form-group">
          <label>Link</label>
          <input type="text" bind:value={announcementLink} placeholder="/products" />
        </div>
        <button onclick={saveAnnouncement} class="btn-primary">Save</button>
      </div>
    </div>
  </div>

  <!-- Blog Posts -->
  <div class="card p-0 mb-6">
    <div class="card-header flex-between border-bottom">
      <h3>Blog posts</h3>
      <a href="/admin/content/blog/new" class="btn-primary" style="text-decoration: none;">
        <Plus size={16} /> New post
      </a>
    </div>
    <div class="blog-list">
      {#if blogPosts.length === 0}
        <div class="p-6 text-muted text-sm text-center">No blog posts found.</div>
      {/if}
      {#each blogPosts as post}
        <div class="blog-item border-bottom flex-between p-6">
          <span class="font-bold text-dark text-sm">{post.Title}</span>
          <div class="flex align-center gap-16">
            <a href="/blog/{post.ID}" target="_blank" class="text-muted cursor-pointer" title="View Post">
              <Eye size={20} />
            </a>
            <button onclick={() => editBlog(post.ID)} class="btn-text-small text-blue" style="color: #2563eb;" title="Edit Post">Edit</button>
            <button onclick={() => deleteBlog(post.ID)} class="btn-text-small text-red" style="color: #dc2626;" title="Delete Post">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Watch It • Order It • Love It (Videos) -->
  <div class="card p-0 mb-6">
    <div class="card-header border-bottom">
      <h3>Watch It • Order It • Love It (Video Cards)</h3>
    </div>
    <div class="p-6">
      <div class="video-grid-admin">
        {#each videoCards as video, idx}
          <div class="video-box border rounded-md p-4 mb-4">
            <h4 class="font-bold text-sm mb-3">Video Card {idx + 1}</h4>
            <div class="form-group">
              <label>Title (Max 25 chars)</label>
              <input type="text" bind:value={video.title} maxlength="25" placeholder="E.g., Healthy & Glowing Skin" />
              <span class="text-xs text-muted" style="margin-top: 4px; display: block;">Characters remaining: {25 - (video.title || '').length}</span>
            </div>
            <div class="form-group">
              <label>Video URL (Instagram / YouTube MP4)</label>
              <input type="text" bind:value={video.videoUrl} placeholder="https://instagram.com/reel/... or https://youtube.com/watch?v=..." />
            </div>
            <div class="form-group relative">
              <label>Link Product</label>
              <div class="product-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Type product name to search..." 
                  bind:value={video.searchQuery}
                  onfocus={() => video.showDropdown = true}
                  onblur={() => setTimeout(() => video.showDropdown = false, 200)}
                />
                {#if video.showDropdown}
                  <div class="product-dropdown">
                    {#each allProducts.filter(p => p.name.toLowerCase().includes((video.searchQuery || '').toLowerCase())) as prod}
                      <button 
                        type="button" 
                        onmousedown={() => {
                          video.productId = prod.id;
                          video.productName = prod.name;
                          video.searchQuery = prod.name;
                        }}
                      >
                        {prod.name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
              {#if video.productId}
                <div class="text-xs text-dark mt-2">Linked Product: <strong>{video.productName}</strong> ({video.productId})</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <button onclick={saveVideoCards} class="btn-primary mt-4">Save Video Cards</button>
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
          <button class="dropdown-btn w-full">Filter by product <ChevronDown size={16} /></button>
        </div>
        <button class="btn-primary">Import from Excel</button>
      </div>
    </div>
    
    <div class="review-list">
      {#if reviews.length === 0}
        <div class="p-6 text-muted text-sm text-center">No reviews pending moderation.</div>
      {/if}
      {#each reviews as review}
        <div class="review-item border-bottom p-6">
          <div class="flex-between mb-2">
            <div>
              <div class="font-bold text-dark text-sm">Product ID: {review.ProductID}</div>
              <div class="text-xs text-muted">User: {review.UserID} • Status: {review.Status}</div>
            </div>
            <div class="flex text-yellow gap-2">
              {#each Array(5) as _, i}
                <Star size={14} fill={i < review.Rating ? "currentColor" : "none"} strokeWidth={i < review.Rating ? 0 : 1} class={i >= review.Rating ? "text-gray-300" : ""} />
              {/each}
            </div>
          </div>
          <p class="text-dark text-sm mb-4">{review.Comment?.String || ''}</p>
          {#if review.ReplyText?.String}
            <div class="text-sm bg-gray-50 p-3 rounded-md mb-4 border border-gray-100">
              <span class="font-bold text-xs text-gray-500 uppercase tracking-wider block mb-1">Admin Reply</span>
              {review.ReplyText.String}
            </div>
          {/if}
          <div class="flex gap-12">
            {#if review.Status !== 'APPROVED'}
              <button onclick={() => updateReviewStatus(review.ID, 'APPROVED')} class="btn-primary-small">Approve</button>
            {/if}
            <button onclick={() => replyToReview(review.ID)} class="btn-outline-small">Reply</button>
            {#if review.Status !== 'REJECTED'}
              <button onclick={() => updateReviewStatus(review.ID, 'REJECTED')} class="btn-text-small text-muted">Reject</button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Social Media & Product Links -->
  <div class="card p-0 mb-10">
    <div class="card-header flex-between border-bottom">
      <h3>Social Media & Product Links</h3>
      <button onclick={createSocialLink} class="btn-primary">
        <Plus size={16} /> Save Link
      </button>
    </div>
    <div class="p-6">
      <div class="form-group mb-0">
        <label>YouTube or Instagram URL</label>
        <input type="text" bind:value={newSocialUrl} placeholder="https://instagram.com/..." />
      </div>
    </div>
    {#if socialLinks.length > 0}
    <div class="p-6 border-top">
      <h4 class="font-bold text-sm mb-4">Existing Links</h4>
      <div class="flex gap-16 flex-wrap">
        {#each socialLinks as link}
          <div class="p-3 border rounded-md max-w-sm flex-between gap-4">
            <div>
              <div class="text-xs text-dark truncate" style="max-width: 250px;">{link.Url}</div>
            </div>
            <button onclick={() => deleteSocialLink(link.ID)} class="btn-text-small text-red">
              <Trash2 size={16} />
            </button>
          </div>
        {/each}
      </div>
    </div>
    {/if}
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
  .p-3 { padding: 12px; }
  .p-6 { padding: 24px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-10 { margin-bottom: 40px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-1 { margin-bottom: 4px; }
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
  
  .border-top {
    border-top: 1px solid #F3F4F6;
  }
  
  .border {
    border: 1px solid #E5E7EB;
  }
  
  .rounded-md {
    border-radius: 6px;
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
  .flex-wrap { flex-wrap: wrap; }
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
  .text-gray-500 { color: #6B7280; }
  
  .font-bold { font-weight: 700; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-center { text-align: center; }
  .text-decoration-none { text-decoration: none; }
  .uppercase { text-transform: uppercase; }
  .tracking-wider { letter-spacing: 0.05em; }
  .block { display: block; }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .bg-gray-50 { background-color: #F9FAFB; }

  .cursor-move { cursor: move; }
  .cursor-pointer { cursor: pointer; }

  /* Admin Video Section */
  .video-grid-admin {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .video-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
  }
  .relative {
    position: relative;
  }
  .product-search-wrapper {
    position: relative;
  }
  .product-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    max-height: 160px;
    overflow-y: auto;
    z-index: 100;
  }
  .product-dropdown button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: none;
    text-align: left;
    font-size: 13px;
    color: #374151;
    cursor: pointer;
  }
  .product-dropdown button:hover {
    background: #f3f4f6;
    color: #E04F36;
  }
</style>
