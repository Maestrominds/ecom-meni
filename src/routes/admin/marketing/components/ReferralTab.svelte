<script lang="ts">
  // Referral specific top metrics
</script>

<!-- Metrics Cards -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-title">TOTAL AFFILIATES</div>
    <div class="metric-value">42</div>
  </div>
  <div class="metric-card">
    <div class="metric-title">TOTAL SALES</div>
    <div class="metric-value">₹1,24,500</div>
  </div>
  <div class="metric-card">
    <div class="metric-title">COMMISSION PAID</div>
    <div class="metric-value text-primary">₹12,450</div>
  </div>
</div>

<!-- Content Grid -->
<div class="content-grid">
  
  <!-- Left: Referral Program Form -->
  <div class="card">
    <div class="card-header border-0 pb-0">
      <h3 class="mb-2">Referral program</h3>
      <p class="text-muted text-sm">Unique referral links per customer with auto reward as store credit or discount. Track performance and grow organically.</p>
    </div>
    
    <div class="form-body p-6">
      <div class="form-group mb-8">
        <label>AMOUNT</label>
        <input type="text" value="₹100" class="bg-light" />
      </div>
      
      <button class="btn-primary w-full justify-center">Enable Referral</button>
    </div>
  </div>

  <!-- Right: Referral Analytics -->
  <div class="card bg-pink">
    <div class="card-header border-0">
      <h3 class="text-primary-dark">Referral Analytics</h3>
    </div>
    <div class="p-6 pt-0">
      
      <div class="analytics-row flex-between mb-4">
        <span class="text-muted">Total Referrals</span>
        <strong class="text-dark">1,240</strong>
      </div>
      
      <div class="analytics-row flex-between mb-4">
        <span class="text-muted">Conversion Rate</span>
        <strong class="text-green">8.4%</strong>
      </div>
      
      <div class="analytics-row flex-between">
        <span class="text-muted">Credit Issued</span>
        <strong class="text-dark">₹12,400</strong>
      </div>

    </div>
  </div>

</div>

<style>
  /* Metrics Grid */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }

  .metric-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .metric-title {
    font-size: 11px;
    font-weight: 700;
    color: #9CA3AF;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 32px;
    font-weight: 800;
    color: #111827;
  }

  .text-primary { color: #F05139 !important; }

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-0 { border: none !important; }
  .pb-0 { padding-bottom: 0 !important; }
  .p-6 { padding: 24px; }
  .pt-0 { padding-top: 0 !important; }
  
  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }
  
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-8 { margin-bottom: 32px; }

  /* Left Form */
  .form-group label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #9CA3AF;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-group input {
    width: 100%;
    padding: 16px;
    border: 1px solid #F3F4F6;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    outline: none;
  }

  .bg-light { background: #F9FAFB !important; }

  .btn-primary {
    background: #F05139;
    color: white;
    border: none;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Right Analytics */
  .bg-pink { background: #FDE8E8 !important; border: 1px solid #FBCFE8 !important; }
  .text-primary-dark { color: #E02424 !important; }
  
  .analytics-row {
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
  }

  /* Utilities */
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .w-full { width: 100%; }
  .justify-center { display: flex; justify-content: center; }
  
  .text-muted { color: #6B7280; line-height: 1.5; }
  .text-sm { font-size: 14px; }
  .text-dark { color: #111827; }
  .text-green { color: #10B981; }
</style>
