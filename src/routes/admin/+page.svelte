<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { onMount } from 'svelte';
  
  let email = $state('');
  let password = $state('');
  let loading = $state(false);

  function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;
    setTimeout(() => {
      loading = false;
      // Navigate to dashboard
      window.location.href = '/internal/admin/dashboard';
    }, 1000);
  }
</script>

<svelte:head>
  <title>Admin Login | MENI</title>
</svelte:head>

<div class="login-page">
  <div class="login-card">
    <div class="brand">
      <span class="logo"><span class="logo-red">M</span>ENI</span>
      <p class="brand-sub">Internal Workspace Login</p>
    </div>

    <form class="login-form" onsubmit={handleLogin}>
      <div class="form-group">
        <label for="email">Work Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="name@meni.in" 
          bind:value={email} 
          required 
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="••••••••" 
          bind:value={password} 
          required 
        />
      </div>

      <button type="submit" class="submit-btn" disabled={loading}>
        {#if loading}
          <span>Authorizing...</span>
        {:else}
          <span>Sign In to Admin Workspace</span>
        {/if}
      </button>
    </form>
  </div>
</div>

<style>
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #111315;
    font-family: var(--font-body);
    padding: 24px;
  }

  .login-card {
    background: #1A1D21;
    border: 1px solid #2B3037;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  }

  .brand {
    text-align: center;
    margin-bottom: 32px;
  }

  .logo {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 800;
    color: white;
  }

  .logo-red {
    color: var(--primary);
  }

  .brand-sub {
    font-size: 13px;
    color: #8C939E;
    margin-top: 4px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 12px;
    font-weight: 600;
    color: #8C939E;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-group input {
    background: #23272C;
    border: 1px solid #2B3037;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .form-group input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(229, 91, 60, 0.25);
  }

  .submit-btn {
    background: var(--primary);
    color: white;
    font-weight: 600;
    padding: 14px;
    border-radius: 8px;
    font-size: 15px;
    margin-top: 8px;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--primary-hover);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>
