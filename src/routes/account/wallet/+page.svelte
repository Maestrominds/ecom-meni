<script lang="ts">
  import { Wallet, Share2, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let balance = $state(0);
  let referralCode = $state('WAITING...');
  let usesRemaining = $state(0);
  let withdrawAmount = $state('');
  let isWithdrawing = $state(false);
  let message = $state('');

  onMount(async () => {
    try {
      const res = await fetch('/api/customer/wallet');
      if (res.ok) {
        const data = await res.json();
        balance = data.balance || 0;
        referralCode = data.referral_code || 'N/A';
        usesRemaining = data.uses_remaining || 0;
      }
    } catch (e) {
      console.error(e);
    }
  });

  async function handleWithdraw(e: Event) {
    e.preventDefault();
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) return;
    
    isWithdrawing = true;
    message = '';
    
    try {
      const res = await fetch('/api/customer/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(withdrawAmount) })
      });
      
      if (res.ok) {
        balance -= Number(withdrawAmount);
        message = 'Withdrawal request successful!';
        withdrawAmount = '';
      } else {
        const err = await res.json();
        message = err.error || 'Failed to withdraw.';
      }
    } catch (e) {
      message = 'Network error.';
    } finally {
      isWithdrawing = false;
    }
  }
</script>

<svelte:head>
  <title>Wallet & Referrals | MENI</title>
</svelte:head>

<div class="content-header">
  <h2>Wallet & Referrals</h2>
  <p>Manage your Coin Box balance and share your referral code.</p>
</div>

<div class="wallet-grid">
  <!-- Balance Card -->
  <div class="card balance-card">
    <div class="card-icon">
      <Wallet size={24} />
    </div>
    <h3>My Coin Box</h3>
    <div class="balance-display">
      <span class="currency">₹</span>
      <span class="amount">{balance.toLocaleString()}</span>
    </div>
    <p class="subtitle">1 Coin = ₹1. Use at checkout or withdraw.</p>

    <form class="withdraw-form" onsubmit={handleWithdraw}>
      <input type="number" bind:value={withdrawAmount} placeholder="Enter amount" min="1" max={balance} required />
      <button type="submit" disabled={isWithdrawing || balance <= 0}>
        {isWithdrawing ? 'Processing...' : 'Withdraw to Bank'}
      </button>
    </form>
    {#if message}
      <p class="status-msg">{message}</p>
    {/if}
  </div>

  <!-- Referral Card -->
  <div class="card referral-card">
    <div class="card-icon">
      <Share2 size={24} />
    </div>
    <h3>Your Referral Code</h3>
    <div class="code-display">
      <code>{referralCode}</code>
      <button class="copy-btn" onclick={() => navigator.clipboard.writeText(referralCode)}>Copy</button>
    </div>
    <p class="subtitle">Share this code with friends. They get a discount, you get coins!</p>
    
    <div class="limits">
      <div class="limit-box">
        <span class="label">Uses Remaining</span>
        <span class="val">{usesRemaining}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .content-header {
    margin-bottom: 32px;
  }
  .content-header h2 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 8px;
  }
  .content-header p {
    color: var(--text-muted);
    font-size: 1.05rem;
  }

  .wallet-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 16px;
    padding: 32px;
    position: relative;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--primary-light);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }

  .balance-display {
    display: flex;
    align-items: baseline;
    gap: 4px;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .currency {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .amount {
    font-size: 3rem;
    font-weight: 700;
    font-family: var(--font-heading);
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 24px;
  }

  .withdraw-form {
    display: flex;
    gap: 12px;
  }

  .withdraw-form input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    background: #FAFAFA;
  }

  .withdraw-form button {
    padding: 12px 20px;
    background: var(--text-dark);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .withdraw-form button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .status-msg {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #059669;
  }

  .code-display {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #FAFAFA;
    padding: 16px;
    border-radius: 8px;
    border: 1px dashed var(--border-light);
    margin-bottom: 16px;
  }

  .code-display code {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 2px;
    flex: 1;
  }

  .copy-btn {
    padding: 8px 16px;
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .limits {
    display: flex;
    gap: 16px;
  }

  .limit-box {
    background: #FAFAFA;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .limit-box .label {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .limit-box .val {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-dark);
  }

  @media (max-width: 768px) {
    .wallet-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
