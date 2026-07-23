<script lang="ts">
  import { onMount } from 'svelte';
  import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';

  let loading = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      loading = false;
    }, 600);
    return () => clearTimeout(timer);
  });
</script>

<div class="container page-spacing">
  {#if loading}
    <SkeletonLoader type="page" />
  {:else}
    <div class="empty-state">
      <h1>Our Policies</h1>
      <p>Information on security, packaging, and orders is coming soon.</p>
      <a href="/" class="back-home">Back to Home</a>
    </div>
  {/if}
</div>

<style>
  .page-spacing {
    padding: 60px 24px;
  }
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    border: 1px dashed var(--border-light);
    border-radius: 16px;
    background: var(--bg-cream);
  }
  .empty-state h1 {
    font-size: 32px;
    margin-bottom: 8px;
  }
  .empty-state p {
    color: var(--text-muted);
    margin-bottom: 24px;
  }
  .back-home {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 10px 24px;
    border-radius: 20px;
    font-weight: 600;
  }
  .back-home:hover {
    background: var(--primary-hover);
  }
</style>
