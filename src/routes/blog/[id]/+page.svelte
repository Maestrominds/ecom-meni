<script lang="ts">
  import { ArrowLeft, Calendar, User, Clock } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const blog = $derived(data.blog);
  const relatedBlogs = $derived(data.relatedBlogs || []);
</script>

<svelte:head>
  <title>{blog ? blog.Title : 'Blog Post'}</title>
</svelte:head>

<div class="blog-detail-container">
  {#if blog}
    <div class="back-link-wrapper">
      <a href="/blog" class="back-btn"><ArrowLeft size={18} /> Back to Blogs</a>
    </div>

    <article class="blog-article">
      <header class="article-header">
        <h1 class="article-title">{blog.Title}</h1>
        <div class="meta">
          <span class="meta-item"><Calendar size={14} /> {new Date(blog.CreatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span class="meta-item"><Clock size={14} /> 5 min read</span>
          <span class="meta-item"><User size={14} /> By Admin</span>
        </div>
      </header>

      {#if blog.CoverImageUrl}
        <div class="article-cover-wrapper">
          <img src={blog.CoverImageUrl} alt={blog.Title} class="article-cover-img" />
        </div>
      {/if}

      <div class="article-content">
        <!-- Render body content. If content contains HTML, use @html, otherwise render as paragraph -->
        {#if blog.Body.includes('<') && blog.Body.includes('>')}
          {@html blog.Body}
        {:else}
          {#each blog.Body.split('\n') as paragraph}
            {#if paragraph.trim() !== ''}
              <p>{paragraph}</p>
            {/if}
          {/each}
        {/if}
      </div>
    </article>

    <!-- Related Articles Section -->
    {#if relatedBlogs.length > 0}
      <section class="related-section">
        <h2 class="related-title">Related Articles</h2>
        <div class="related-grid">
          {#each relatedBlogs as rel}
            <a href="/blog/{rel.id}" class="related-card" style="text-decoration: none; color: inherit; display: block;">
              <div class="related-img" style="background-image: url('{rel.img}'); background-size: cover; background-position: center; aspect-ratio: 16 / 9; border-radius: 8px;"></div>
              <div class="related-content">
                <span class="related-date">{rel.date}</span>
                <h4 class="related-card-title">{rel.title}</h4>
                <p class="related-excerpt">{rel.excerpt}</p>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  {:else}
    <div class="error-container">
      <h2>Article Not Found</h2>
      <p>The blog post you are looking for does not exist or has been removed.</p>
      <a href="/blog" class="btn-primary">Back to Blogs</a>
    </div>
  {/if}
</div>

<style>
  .blog-detail-container {
    max-width: 880px;
    margin: 45px auto;
    padding: 0 24px;
    font-family: var(--font-body, 'Inter', sans-serif);
  }

  .back-link-wrapper {
    margin-bottom: 32px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: color 0.2s;
  }

  .back-btn:hover {
    color: #E04F36;
  }

  .blog-article {
    background: white;
    margin-bottom: 60px;
  }

  .article-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .category-badge {
    display: inline-block;
    padding: 6px 14px;
    background: #fdf2f0;
    color: #E04F36;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }

  .article-title {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.25;
    color: #111827;
    margin-bottom: 24px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .meta {
    display: flex;
    justify-content: center;
    gap: 24px;
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .article-cover-wrapper {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 48px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  .article-cover-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  .article-content {
    font-size: 18px;
    line-height: 1.85;
    color: #374151;
  }

  .article-content :global(p) {
    margin-bottom: 28px;
  }

  .article-content :global(h2) {
    font-size: 26px;
    font-weight: 700;
    color: #111827;
    margin-top: 48px;
    margin-bottom: 20px;
  }

  .article-content :global(h3) {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin-top: 36px;
    margin-bottom: 16px;
  }

  .article-content :global(ol), .article-content :global(ul) {
    margin-bottom: 28px;
    padding-left: 32px;
    list-style-position: outside;
  }

  .article-content :global(li) {
    margin-bottom: 12px;
    line-height: 1.85;
  }

  /* Related Section */
  .related-section {
    border-top: 1px solid #e5e7eb;
    padding-top: 48px;
    margin-top: 60px;
  }

  .related-title {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 32px;
    text-align: center;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .related-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    padding: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }

  .related-content {
    margin-top: 12px;
  }

  .related-date {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }

  .related-card-title {
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    line-height: 1.4;
    margin: 8px 0;
    height: 42px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .related-excerpt {
    font-size: 13px;
    color: #4b5563;
    line-height: 1.5;
  }

  .error-container {
    text-align: center;
    padding: 80px 20px;
  }

  .error-container h2 {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .error-container p {
    color: #666;
    margin-bottom: 24px;
  }

  .btn-primary {
    background: #E04F36;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }
</style>
