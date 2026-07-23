<script lang="ts">
  import { 
    Tag, Zap, Users, ShieldCheck, Mail, GitPullRequestDraft, 
    ArrowLeft, Search, Plus, Calendar, Megaphone, ArrowUpRight, TrendingUp
  } from 'lucide-svelte';
  
  import CouponsTab from './components/CouponsTab.svelte';
  import FlashSaleTab from './components/FlashSaleTab.svelte';
  import ReferralTab from './components/ReferralTab.svelte';
  import AffiliateTab from './components/AffiliateTab.svelte';
  import EmailCampaignsTab from './components/EmailCampaignsTab.svelte';
  import AutomationTab from './components/AutomationTab.svelte';

  let { data } = $props();

  let activeTab = $state('Coupons');
  const tabs = ['COUPONS', 'FLASH SALE', 'REFERRAL', 'AFFILIATE', 'EMAIL CAMPAIGNS', 'AUTOMATION'];
</script>

<svelte:head>
  <title>Admin | Marketing</title>
</svelte:head>

<div class="marketing-container">
  <!-- Header -->
  <div class="page-header">
    <h1>Marketing & Discounts</h1>
    <button class="btn-primary">
      <Plus size={16} /> Add Product
    </button>
  </div>

  <!-- Navigation Tabs -->
  <div class="nav-tabs">
    {#each tabs as tab}
      <button 
        class="nav-tab" 
        class:active={activeTab === tab}
        onclick={() => activeTab = tab}
      >
        {tab}
      </button>
    {/each}
  </div>

  <!-- Tab Content -->
  <div class="tab-content">
    {#if activeTab === 'COUPONS'}
      <CouponsTab coupons={data?.coupons || []} />
    {:else if activeTab === 'FLASH SALE'}
      <FlashSaleTab />
    {:else if activeTab === 'REFERRAL'}
      <ReferralTab />
    {:else if activeTab === 'AFFILIATE'}
      <AffiliateTab />
    {:else if activeTab === 'EMAIL CAMPAIGNS'}
      <EmailCampaignsTab />
    {:else if activeTab === 'AUTOMATION'}
      <AutomationTab />
    {/if}
  </div>
</div>

<style>
  .marketing-container {
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

  /* Navigation Tabs */
  .nav-tabs {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #E5E7EB;
    margin-bottom: 32px;
  }

  .nav-tab {
    background: none;
    border: none;
    color: #6B7280;
    font-size: 13px;
    font-weight: 700;
    padding: 0 0 12px 0;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    letter-spacing: 0.05em;
  }

  .nav-tab.active {
    color: #F05139;
    border-bottom-color: #F05139;
  }
</style>
