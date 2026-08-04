<script lang="ts">
  import { Tag, Truck, Clock, ChevronDown, Calendar } from 'lucide-svelte';

  let { data = {} } = $props();
</script>

<!-- Metrics Cards -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-title"><Tag size={16} class="text-primary" /> ACTIVE COUPONS</div>
    <div class="metric-value">{data?.activeCount || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title"><Truck size={16} class="text-primary" /> FREE SHIPPING THRESHOLD</div>
    <div class="metric-value">₹{data?.freeShippingThreshold || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title"><Clock size={16} class="text-primary" /> FLASH SALE ENDS</div>
    <div class="metric-value">{data?.endsIn || 'N/A'}</div>
  </div>
</div>

<!-- Content Grid -->
<div class="content-container">
  <div class="card flash-sale-card">
    <div class="card-header border-0">
      <h3>Flash sale / Countdown</h3>
    </div>
    
    <div class="form-body p-6 pt-0">
      <div class="form-group mb-6">
        <label>PRODUCT</label>
        <div class="input-wrapper relative">
          <input type="text" value="Hair Fall Control Oil" readonly class="cursor-pointer bg-light" />
          <ChevronDown size={16} class="input-icon text-muted" />
        </div>
      </div>
      
      <div class="form-row flex gap-24 mb-8">
        <div class="form-group flex-1">
          <label>SALE PRICE (₹)</label>
          <input type="number" value="399" class="bg-light" />
        </div>
        <div class="form-group flex-1">
          <label>ENDS AT</label>
          <div class="input-wrapper relative">
            <input type="text" value="12/31/2024, 11:59 PM" class="bg-light" />
            <Calendar size={16} class="input-icon text-muted" />
          </div>
        </div>
      </div>
      
      <button class="btn-primary-large">Schedule flash sale</button>
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
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .text-primary { color: #F05139; }

  .metric-value {
    font-size: 32px;
    font-weight: 800;
    color: #111827;
  }

  /* Content */
  .flash-sale-card {
    max-width: 800px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-0 { border: none !important; }
  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  /* Form */
  .p-6 { padding: 24px; }
  .pt-0 { padding-top: 0 !important; }
  .mb-6 { margin-bottom: 24px; }
  .mb-8 { margin-bottom: 32px; }

  .form-group label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #9CA3AF;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input-wrapper { position: relative; }
  .input-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  
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
  .cursor-pointer { cursor: pointer; }

  .flex { display: flex; }
  .gap-24 { gap: 24px; }
  .flex-1 { flex: 1; }
  
  .text-muted { color: #9CA3AF; }

  .btn-primary-large {
    background: #F05139;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
</style>
