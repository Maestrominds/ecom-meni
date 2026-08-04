<script lang="ts">
  import { Tag, Truck, Clock } from 'lucide-svelte';

  let { data = {} } = $props();
  let coupons = $derived(data?.list || []);
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
    <div class="metric-value">{data?.flashSaleEndsIn || 'N/A'}</div>
  </div>
</div>

<!-- Content Grid -->
<div class="content-grid">
  
  <!-- Left: Coupon Codes -->
  <div class="card">
    <div class="card-header border-bottom">
      <h3>Coupon codes</h3>
    </div>
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>CODE</th>
            <th>DISCOUNT</th>
            <th>MIN ORDER</th>
            <th>USES</th>
            <th>EXPIRES</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
            {#each coupons as coupon}
            <tr>
              <td><span class="badge-gray">{coupon.code || coupon.Code || 'N/A'}</span></td>
              <td class="text-dark font-medium">{coupon.discount || coupon.DiscountPercentage + '% off'}</td>
              <td class="text-dark font-medium">{coupon.minOrder || '₹' + coupon.MinOrderValue}</td>
              <td class="text-muted">{coupon.uses || (coupon.UsageCount + ' / ' + coupon.MaxUses)}</td>
              <td class="text-dark font-medium">{coupon.expires || (coupon.ValidUntil ? new Date(coupon.ValidUntil).toLocaleDateString() : 'N/A')}</td>
              <td><span class="badge-green-light">{coupon.status || (coupon.IsActive ? 'Active' : 'Inactive')}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Right: Automatic Discount Form -->
  <div class="card form-card">
    <div class="card-header border-0">
      <h3>Automatic discount</h3>
    </div>
    <div class="form-body">
      <div class="form-group">
        <label>NAME</label>
        <input type="text" value="Buy 2 get 10% off" />
      </div>
      <div class="form-group">
        <label>TYPE</label>
        <select>
          <option>Buy X get Y% off</option>
        </select>
      </div>
      <div class="form-row flex gap-16">
        <div class="form-group half">
          <label>QUANTITY</label>
          <input type="number" value="2" />
        </div>
        <div class="form-group half">
          <label>DISCOUNT %</label>
          <input type="number" value="10" />
        </div>
      </div>
      
      <button class="btn-save w-full">Save rule</button>
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

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  .border-0 { border: none !important; }
  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  /* Table */
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
  .data-table th, .data-table td { padding: 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

  .badge-gray { background: #E5E7EB; color: #111827; padding: 6px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  .text-dark { color: #111827; }
  .text-muted { color: #4B5563; }
  .font-medium { font-weight: 500; }

  /* Form */
  .form-body { padding: 0 24px 24px; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; font-size: 11px; font-weight: 700; color: #6B7280; margin-bottom: 8px; letter-spacing: 0.05em; }
  .form-group input, .form-group select { width: 100%; padding: 12px; border: 1px solid #E5E7EB; border-radius: 6px; background: #F9FAFB; font-size: 14px; color: #111827; outline: none; }
  
  .flex { display: flex; }
  .gap-16 { gap: 16px; }
  .half { flex: 1; }
  .w-full { width: 100%; }

  .btn-save {
    background: #F05139; color: white; border: none; padding: 14px; border-radius: 8px;
    font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 12px;
  }
</style>
