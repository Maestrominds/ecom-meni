<script lang="ts">
  import { ArrowRight, Mail, Phone, User, CheckCircle2 } from 'lucide-svelte';
  import { env } from '$env/dynamic/public';
  import { goto } from '$app/navigation';
  
  let step = $state<'details' | 'otp'>('details');
  let isLoading = $state(false);
  let errorMsg = $state('');

  // Form Fields
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let otpCode = $state('');

  const baseUrl = env.PUBLIC_API_URL || 'http://localhost:3000/api/v1';

  async function handleSendOTP(e: Event) {
    e.preventDefault();
    if (!name || !email || !phone) {
      errorMsg = 'Please fill all fields';
      return;
    }
    
    errorMsg = '';
    isLoading = true;
    try {
      const res = await fetch(`${baseUrl}/public/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      step = 'otp';
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      isLoading = false;
    }
  }

  async function handleVerifyOTP(e: Event) {
    e.preventDefault();
    if (!otpCode) {
      errorMsg = 'Please enter the OTP';
      return;
    }

    errorMsg = '';
    isLoading = true;
    try {
      const res = await fetch(`${baseUrl}/public/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp_code: otpCode })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      
      // Save token (in real app, this should ideally be an HttpOnly cookie via a server endpoint)
      document.cookie = `user_token=${data.token}; path=/; max-age=604800`;
      
      // Redirect to account
      goto('/account');
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Login | MENI Wellness</title>
</svelte:head>

<div class="login-wrapper">
  <div class="login-card">
    <div class="card-header">
      <h1>MENI.</h1>
      <h2>{step === 'details' ? 'Welcome Back' : 'Verify Email'}</h2>
      <p>{step === 'details' ? 'Enter your details to sign in or create an account.' : `Enter the 6-digit code sent to ${email}`}</p>
    </div>

    {#if errorMsg}
      <div class="error-banner">
        {errorMsg}
      </div>
    {/if}

    {#if step === 'details'}
      <form onsubmit={handleSendOTP}>
        <div class="form-group">
          <label for="name">Full Name</label>
          <div class="input-wrap">
            <User size={18} class="icon" />
            <input type="text" id="name" bind:value={name} placeholder="Jane Doe" required />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-wrap">
            <Mail size={18} class="icon" />
            <input type="email" id="email" bind:value={email} placeholder="jane@example.com" required />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <div class="input-wrap">
            <Phone size={18} class="icon" />
            <input type="tel" id="phone" bind:value={phone} placeholder="+91 9876543210" required />
          </div>
        </div>

        <button type="submit" class="btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send OTP'} <ArrowRight size={18} />
        </button>
      </form>
    {:else}
      <form onsubmit={handleVerifyOTP}>
        <div class="form-group">
          <label for="otp">One-Time Password</label>
          <div class="input-wrap">
            <CheckCircle2 size={18} class="icon" />
            <input type="text" id="otp" bind:value={otpCode} placeholder="123456" required autocomplete="one-time-code" maxlength="6" />
          </div>
        </div>

        <button type="submit" class="btn-primary" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify & Sign In'} <ArrowRight size={18} />
        </button>
        
        <button type="button" class="btn-text mt-4" onclick={() => step = 'details'}>
          Back to details
        </button>
      </form>
    {/if}
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F9FAFB;
    padding: 40px 20px;
    font-family: var(--font-body);
  }

  .login-card {
    background: white;
    width: 100%;
    max-width: 440px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }

  .card-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .card-header h1 {
    font-family: var(--font-heading);
    color: var(--primary);
    font-size: 2.5rem;
    margin-bottom: 24px;
  }

  .card-header h2 {
    font-size: 1.5rem;
    color: #111827;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .card-header p {
    color: #6B7280;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .error-banner {
    background: #FEF2F2;
    color: #DC2626;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 24px;
    border: 1px solid #FCA5A5;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  :global(.icon) {
    position: absolute;
    left: 14px;
    color: #9CA3AF;
  }

  input {
    width: 100%;
    padding: 14px 14px 14px 44px;
    border: 1px solid #D1D5DB;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(229, 91, 60, 0.1);
  }

  .btn-primary {
    width: 100%;
    padding: 16px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    margin-top: 12px;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-text {
    width: 100%;
    background: transparent;
    border: none;
    color: #6B7280;
    font-weight: 500;
    cursor: pointer;
    font-size: 0.95rem;
  }
  
  .btn-text:hover {
    color: #374151;
    text-decoration: underline;
  }
  
  .mt-4 {
    margin-top: 16px;
  }
</style>
