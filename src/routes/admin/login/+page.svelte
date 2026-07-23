<script lang="ts">
  import { enhance } from '$app/forms';
  import { Lock, Mail, ArrowRight } from 'lucide-svelte';
  
  let { form } = $props();
  let isLoading = $state(false);
</script>

<svelte:head>
  <title>Meni | Admin Login</title>
</svelte:head>

<div class="login-container">
  <div class="login-split">
    <!-- Left side Branding/Image -->
    <div class="brand-section">
      <div class="brand-overlay"></div>
      <div class="brand-content">
        <h1>MENI.</h1>
        <h2>Admin Control Center</h2>
        <p>Manage your store, track analytics, and handle customer relationships all in one unified dashboard.</p>
        <div class="feature-list">
          <div class="feature-item">✓ Secure Access</div>
          <div class="feature-item">✓ Real-time Analytics</div>
          <div class="feature-item">✓ Comprehensive Control</div>
        </div>
      </div>
    </div>

    <!-- Right side Form -->
    <div class="form-section">
      <div class="login-card">
        <div class="mobile-logo">
          <h1>MENI.</h1>
        </div>
        
        <div class="form-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your admin account.</p>
        </div>

        <form method="POST" use:enhance={() => {
            isLoading = true;
            return async ({ update }) => {
              isLoading = false;
              update();
            };
          }}>
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <Mail size={18} class="input-icon" />
              <input 
                type="email" 
                name="email"
                id="email" 
                value={form?.email ?? ''} 
                placeholder="admin@meni.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <Lock size={18} class="input-icon" />
              <input 
                type="password" 
                name="password"
                id="password" 
                placeholder="••••••••"
                required
              />
            </div>
            <div class="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>

          {#if form?.error}
            <div class="error-message">
              {form.error}
            </div>
          {/if}

          <button type="submit" disabled={isLoading} class:loading={isLoading}>
            {#if isLoading}
              <span class="loader"></span> Authenticating...
            {:else}
              Sign In to Dashboard <ArrowRight size={18} />
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    background-color: var(--white);
    font-family: var(--font-body);
  }

  .login-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    min-height: 100vh;
  }

  /* Brand Section (Left) */
  .brand-section {
    position: relative;
    background-color: var(--primary-light);
    background-image: url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    padding: 60px;
    color: white;
    overflow: hidden;
  }

  .brand-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(229, 91, 60, 0.9) 0%, rgba(184, 56, 27, 0.95) 100%);
    z-index: 1;
  }

  .brand-content {
    position: relative;
    z-index: 2;
    max-width: 480px;
  }

  .brand-content h1 {
    font-size: 3.5rem;
    font-family: var(--font-heading);
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .brand-content h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .brand-content p {
    font-size: 1.15rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 40px;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-item {
    font-size: 1.05rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Form Section (Right) */
  .form-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: var(--bg-cream);
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  .mobile-logo {
    display: none;
    text-align: center;
    margin-bottom: 32px;
  }
  
  .mobile-logo h1 {
    font-size: 2.5rem;
    color: var(--primary);
    font-family: var(--font-heading);
  }

  .form-header {
    margin-bottom: 32px;
  }

  .form-header h2 {
    font-size: 2rem;
    color: var(--text-dark);
    margin-bottom: 8px;
    font-family: var(--font-heading);
  }

  .form-header p {
    color: var(--text-muted);
    font-size: 1.05rem;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-dark);
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  :global(.input-icon) {
    position: absolute;
    left: 16px;
    color: var(--text-muted);
  }

  input {
    width: 100%;
    padding: 16px 16px 16px 48px;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    transition: var(--transition-smooth);
    background-color: var(--white);
  }

  input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(229, 91, 60, 0.1);
  }

  .forgot-password {
    text-align: right;
    margin-top: 8px;
  }

  .forgot-password a {
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
  }

  .forgot-password a:hover {
    text-decoration: underline;
  }

  button {
    width: 100%;
    padding: 16px;
    background-color: var(--primary);
    color: var(--white);
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  button:hover:not(:disabled) {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(229, 91, 60, 0.25);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message {
    color: #DC2626;
    background-color: #FEF2F2;
    padding: 14px 16px;
    border-radius: 8px;
    font-size: 0.95rem;
    margin-bottom: 24px;
    border: 1px solid #FCA5A5;
    font-weight: 500;
  }

  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
    .login-split {
      grid-template-columns: 1fr;
    }
    .brand-section {
      display: none;
    }
    .mobile-logo {
      display: block;
    }
  }
</style>
