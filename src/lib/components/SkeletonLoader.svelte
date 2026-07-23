<script lang="ts">
  let { type = 'card', count = 1 } = $props();
</script>

{#if type === 'card'}
  <div class="skeleton-grid">
    {#each Array(count) as _}
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-price"></div>
        <div class="skeleton skeleton-button"></div>
      </div>
    {/each}
  </div>
{:else if type === 'category'}
  <div class="skeleton-grid-categories">
    {#each Array(count) as _}
      <div class="skeleton-cat-card">
        <div class="skeleton skeleton-circle"></div>
        <div class="skeleton skeleton-title-sm"></div>
      </div>
    {/each}
  </div>
{:else if type === 'page'}
  <div class="skeleton-page">
    <div class="skeleton skeleton-hero"></div>
    <div class="container" style="margin-top: 40px;">
      <div class="skeleton skeleton-title-lg"></div>
      <div class="skeleton skeleton-paragraph"></div>
      <div class="skeleton skeleton-paragraph"></div>
    </div>
  </div>
{/if}

<style>
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;
  }

  .skeleton-grid-categories {
    display: flex;
    justify-content: space-around;
    gap: 16px;
    width: 100%;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  .skeleton-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .skeleton-img {
    width: 100%;
    height: 220px;
    border-radius: 8px;
  }

  .skeleton-title {
    width: 70%;
    height: 20px;
  }

  .skeleton-text {
    width: 90%;
    height: 14px;
  }

  .skeleton-price {
    width: 40%;
    height: 18px;
  }

  .skeleton-button {
    width: 100%;
    height: 40px;
    border-radius: 6px;
  }

  .skeleton-cat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 120px;
  }

  .skeleton-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .skeleton-title-sm {
    width: 60px;
    height: 12px;
  }

  .skeleton-page {
    width: 100%;
  }

  .skeleton-hero {
    width: 100%;
    height: 350px;
  }

  .skeleton-title-lg {
    width: 50%;
    height: 36px;
    margin-bottom: 24px;
  }

  .skeleton-paragraph {
    width: 100%;
    height: 16px;
    margin-bottom: 12px;
  }
</style>
