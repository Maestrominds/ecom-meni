<script lang="ts">
  import { Download } from 'lucide-svelte';

  let { data = {} } = $props();
  let affiliates = $derived(data?.list || []);
</script>

<!-- Metrics Cards -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-title">TOTAL AFFILIATES</div>
    <div class="metric-value">{data?.totalAffiliates || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title">TOTAL SALES</div>
    <div class="metric-value">₹{data?.totalSales || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title">COMMISSION PAID</div>
    <div class="metric-value text-primary">₹{data?.commissionPaid || 0}</div>
  </div>
</div>

<!-- Content Grid -->
<div class="content-container">
  <div class="card mb-10">
    <div class="card-header border-bottom flex-between">
      <h3>Affiliate Partner Network</h3>
      <button class="btn-outline">
        <Download size={16} /> Export CSV
      </button>
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>AFFILIATE NAME</th>
            <th>REFERRAL CODE</th>
            <th>SALES</th>
            <th>COMMISSION</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {#each affiliates as aff}
            <tr>
              <td class="text-dark font-bold text-sm">{aff.name}</td>
              <td class="text-muted text-sm">{aff.code}</td>
              <td class="text-dark text-sm">{aff.sales}</td>
              <td class="text-dark text-sm">{aff.comm}</td>
              <td>
                {#if aff.status === 'Premium'}
                  <span class="badge-blue-light">{aff.status}</span>
                {:else}
                  <span class="badge-green-light">{aff.status}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
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

  /* Content Container */
  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  
  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  .btn-outline {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Table */
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
  .data-table th, .data-table td { padding: 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

  .badge-blue-light { background: #E0F2FE; color: #0284C7; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  /* Utilities */
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .mb-10 { margin-bottom: 40px; }
  
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .font-bold { font-weight: 700; }
  .text-sm { font-size: 14px; }
</style>
