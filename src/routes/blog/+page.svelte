<script lang="ts">
  import { Calendar, User, ArrowRight } from 'lucide-svelte';

  let { data } = $props();
  const blogs = $derived(data.blogs || []);
</script>

<svelte:head>
  <title>Wellness Blog | MENI</title>
</svelte:head>

<div class="blog-page">
  <div class="page-header">
    <span class="badge">BLOG</span>
    <h1>Discover Wellness Insights</h1>
    <p>Expert advice, wellness routines, and scientific insights for your hair and skin journey.</p>
  </div>

  <div class="featured-post">
    {#if blogs.length > 0}
      {@const featured = blogs[0]}
      <div class="featured-image" style="background-image: url('{featured.cover_image_url || featured.CoverImageUrl}')"></div>
      <div class="featured-content">
        <div class="meta">
          <span class="meta-item"><Calendar size={14} /> {featured.created_at ? new Date(featured.created_at).toLocaleDateString() : 'Just now'}</span>
          <span class="meta-item"><User size={14} /> Admin</span>
        </div>
        <h2>{featured.title}</h2>
        <p>{featured.excerpt}</p>
        <a href={`/blog/${featured.id}`} class="read-more">Read Full Article <ArrowRight size={16} /></a>
      </div>
    {/if}
  </div>

  <div class="blog-grid">
    {#each blogs.slice(1) as blog (blog.id)}
      <div class="blog-card">
        <div class="blog-image" style="background-image: url('{blog.cover_image_url || blog.CoverImageUrl}')"></div>
        <div class="blog-content">
          <div class="meta">
            <span class="meta-item"><Calendar size={14} /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Just now'}</span>
          </div>
          <h3>{blog.title}</h3>
          <p>{blog.excerpt}</p>
          <a href={`/blog/${blog.id}`} class="read-more">Read More <ArrowRight size={16} /></a>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .blog-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
  }

  .page-header {
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: var(--primary-light);
    color: var(--primary);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 3.5rem;
    font-family: var(--font-heading);
    color: var(--text-dark);
    margin-bottom: 16px;
    line-height: 1.1;
  }

  .page-header p {
    font-size: 1.15rem;
    color: var(--text-muted);
  }

  /* Featured Post */
  .featured-post {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
    background: #FAFAFA;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--border-light);
  }

  .featured-image {
    background-size: cover;
    background-position: center;
    min-height: 400px;
  }

  .featured-content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .featured-content h2 {
    font-size: 2.2rem;
    font-family: var(--font-heading);
    margin: 16px 0;
    line-height: 1.3;
  }

  .featured-content p {
    color: var(--text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  /* Regular Posts */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 40px;
  }

  .blog-card {
    border-radius: 16px;
    overflow: hidden;
    background: white;
    border: 1px solid var(--border-light);
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
  }

  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  .blog-image {
    aspect-ratio: 16/10;
    background-size: cover;
    background-position: center;
    background-color: var(--bg-cream);
  }

  .blog-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .blog-content h3 {
    font-size: 1.4rem;
    font-family: var(--font-heading);
    margin: 12px 0;
    line-height: 1.3;
  }

  .blog-content p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 24px;
    flex: 1;
  }

  /* Shared */
  .meta {
    display: flex;
    gap: 16px;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    font-weight: 600;
    transition: gap 0.2s;
    margin-top: auto;
  }

  .read-more:hover {
    gap: 12px;
  }

  @media (max-width: 900px) {
    .featured-post {
      grid-template-columns: 1fr;
    }
    .featured-image {
      min-height: 300px;
    }
  }
</style>
