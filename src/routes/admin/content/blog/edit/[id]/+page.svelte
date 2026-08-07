<script lang="ts">
  import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-svelte';
  import { env } from '$env/dynamic/public';
  import { goto } from '$app/navigation';
  import { uploadImage } from '$lib/utils/upload';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const baseUrl = '/api';

  let title = $state(data.blog?.Title || '');
  let content = $state(data.blog?.Body || '');
  let author = $state(''); // Unused by backend currently
  let imageUrl = $state(data.blog?.CoverImageUrl?.String || '');
  let isSaving = $state(false);

  async function handleImageUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      try {
        imageUrl = await uploadImage(file);
      } catch (err) {
        console.error(err);
        alert("Image upload failed, but you can still save text content.");
      }
    }
  }

  async function saveBlog() {
    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }
    
    isSaving = true;
    try {
      const res = await fetch(`${baseUrl}/admin/blogs/${data.blog.ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          body: content,
          cover_image_url: imageUrl
        })
      });
      
      if (!res.ok) throw new Error('Failed to update blog');
      
      alert("Blog updated successfully!");
      goto('/admin/content');
    } catch (e) {
      console.error(e);
      alert("Error saving blog.");
    } finally {
      isSaving = false;
    }
  }

  let isBold = $state(false);
  let isItalic = $state(false);
  let isUnderline = $state(false);
  let isH2 = $state(false);
  let isH3 = $state(false);
  let isBulletList = $state(false);
  let isOrderedList = $state(false);

  function updateActiveFormats() {
    if (typeof document === 'undefined') return;
    isBold = document.queryCommandState('bold');
    isItalic = document.queryCommandState('italic');
    isUnderline = document.queryCommandState('underline');
    try {
      const block = document.queryCommandValue('formatBlock');
      isH2 = block === 'h2';
      isH3 = block === 'h3';
    } catch(e) {}
    isBulletList = document.queryCommandState('insertUnorderedList');
    isOrderedList = document.queryCommandState('insertOrderedList');
  }

  function execCmd(command: string, value: string = '') {
    document.execCommand(command, false, value);
    updateActiveFormats();
  }
</script>

<svelte:head>
  <title>Admin | New Blog Post</title>
</svelte:head>

<div class="blog-edit-container">
  <!-- Header -->
  <div class="page-header">
    <div class="flex align-center gap-16">
      <a href="/admin/content" class="back-btn">
        <ArrowLeft size={20} />
      </a>
      <div>
        <h1>Edit Blog Post</h1>
        <p class="text-muted">Update your article.</p>
      </div>
    </div>
    <div class="header-actions">
      <a href="/admin/content" class="btn-outline">Cancel</a>
      <button class="btn-primary" onclick={saveBlog} disabled={isSaving}>
        <Save size={16} />
        {isSaving ? 'Saving...' : 'Publish Post'}
      </button>
    </div>
  </div>

  <div class="layout-grid">
    <!-- Main Form -->
    <div class="card p-6 main-form">
      <div class="form-group">
        <label for="title">Post Title</label>
        <input type="text" id="title" bind:value={title} placeholder="E.g., 5 Tips for Healthy Hair" class="title-input" />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <div class="editor-toolbar">
          <button type="button" class:active={isBold} onmousedown={(e) => { e.preventDefault(); execCmd('bold'); }}><b>B</b></button>
          <button type="button" class:active={isItalic} onmousedown={(e) => { e.preventDefault(); execCmd('italic'); }}><i>I</i></button>
          <button type="button" class:active={isUnderline} onmousedown={(e) => { e.preventDefault(); execCmd('underline'); }}><u>U</u></button>
          <button type="button" class:active={isH2} onmousedown={(e) => { e.preventDefault(); execCmd('formatBlock', 'h2'); }}>H2</button>
          <button type="button" class:active={isH3} onmousedown={(e) => { e.preventDefault(); execCmd('formatBlock', 'h3'); }}>H3</button>
          <button type="button" onmousedown={(e) => { e.preventDefault(); execCmd('formatBlock', 'p'); }}>P</button>
          <button type="button" class:active={isBulletList} onmousedown={(e) => { e.preventDefault(); execCmd('insertUnorderedList'); }}>• Bullet List</button>
          <button type="button" class:active={isOrderedList} onmousedown={(e) => { e.preventDefault(); execCmd('insertOrderedList'); }}>1. Numbered List</button>
        </div>
        <div 
          class="editor-content-area" 
          contenteditable="true" 
          bind:innerHTML={content}
          style="min-height: 320px;"
          onkeyup={updateActiveFormats}
          onmouseup={updateActiveFormats}
        ></div>
      </div>
    </div>

    <!-- Sidebar Settings -->
    <div class="sidebar">
      <div class="card p-6 mb-6">
        <h3 class="sidebar-title">Cover Image</h3>
        <label class="image-upload-zone">
          <input type="file" accept="image/*" class="hidden-input" onchange={handleImageUpload} />
          {#if imageUrl}
            <div class="preview-container">
              <img src={imageUrl} alt="Cover Preview" class="preview-img" />
            </div>
          {:else}
            <div class="upload-placeholder">
              <ImageIcon size={32} class="text-muted mb-2" />
              <p>Click to upload image</p>
            </div>
          {/if}
        </label>
        <div style="margin-top: 16px; border-top: 1px solid #E5E7EB; padding-top: 16px;">
          <label for="image-url-input" style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">Or Paste Image URL</label>
          <input 
            type="text" 
            id="image-url-input" 
            bind:value={imageUrl} 
            placeholder="https://example.com/image.jpg" 
            style="font-size: 13px; padding: 8px 12px;"
          />
        </div>
      </div>

      <div class="card p-6">
        <h3 class="sidebar-title">Publishing Info</h3>
        <div class="form-group">
          <label for="author">Author</label>
          <input type="text" id="author" bind:value={author} />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .blog-edit-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .flex { display: flex; }
  .align-center { align-items: center; }
  .gap-16 { gap: 16px; }

  .back-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    color: #4B5563;
    transition: all 0.2s;
  }

  .back-btn:hover {
    background: #F9FAFB;
    color: #111827;
  }

  h1 { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px 0; }
  .text-muted { color: #6B7280; font-size: 14px; margin: 0; }
  .mb-6 { margin-bottom: 24px; }
  .mb-2 { margin-bottom: 8px; }

  .header-actions {
    display: flex;
    gap: 12px;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F05139;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

  .btn-outline {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: #374151;
    border: 1px solid #D1D5DB;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }

  /* Layout */
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

  .p-6 { padding: 24px; }

  .sidebar-title {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Form Elements */
  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    font-size: 15px;
    color: #111827;
    font-family: inherit;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #F05139;
  }

  .title-input {
    font-size: 20px;
    font-weight: 600;
    padding: 16px;
  }

  /* Image Upload */
  .image-upload-zone {
    display: block;
    border: 2px dashed #D1D5DB;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    background: #F9FAFB;
    transition: all 0.2s;
  }
  .image-upload-zone:hover {
    border-color: #9CA3AF;
  }

  .hidden-input {
    display: none;
  }

  .upload-placeholder {
    padding: 40px 20px;
    text-align: center;
    color: #6B7280;
    font-size: 13px;
    font-weight: 500;
  }
  
  .preview-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #E5E7EB;
  }

  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Rich Text Editor Styling */
  .editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: #f3f4f6;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .editor-toolbar button {
    background: white;
    border: 1px solid #d1d5db;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .editor-toolbar button:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    color: #F05139;
  }
  .editor-toolbar button.active {
    background: #E04F36;
    border-color: #E04F36;
    color: white;
  }
  .editor-toolbar button.active:hover {
    background: #c53e28;
    border-color: #c53e28;
    color: white;
  }
  .editor-content-area {
    border: 1px solid #d1d5db;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 20px;
    outline: none;
    background: white;
    font-size: 16px;
    line-height: 1.75;
    overflow-y: auto;
  }
  .editor-content-area ul, .editor-content-area ol {
    padding-left: 28px;
    margin-bottom: 20px;
    list-style-position: outside;
  }
  .editor-content-area li {
    margin-bottom: 12px;
    line-height: 1.7;
  }
  .editor-content-area p {
    margin-bottom: 18px;
  }
  .editor-content-area:focus {
    border-color: #F05139;
    box-shadow: 0 0 0 2px rgba(240, 81, 57, 0.1);
  }
</style>
