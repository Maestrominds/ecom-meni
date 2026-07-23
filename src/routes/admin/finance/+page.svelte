<script lang="ts">
  import { Search, Filter, Download, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';

  const settlements = Array(4).fill({
    id: 'STL-882193',
    orderId: 'MN-10421',
    gateway: 'Razorpay',
    customer: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    amount: '₹1,299',
    date: 'Jun 5, 2026',
    time: '02:30 PM',
    status: 'Settled',
    reference: 'TXN_5502129334'
  });

  let activeTopTab = $state('SETTLEMENT TRACKER');
  const topTabs = ['SETTLEMENT TRACKER', 'TAX COMPLIANCE'];

  let activePeriod = $state('Last 7 Days');
</script>

<svelte:head>
  <title>Admin | Finance</title>
</svelte:head>

<div class="finance-container">
  <!-- Top Navigation Tabs -->
  <div class="top-nav-tabs">
    {#each topTabs as tab}
      <button 
        class="top-tab" 
        class:active={activeTopTab === tab}
        onclick={() => activeTopTab = tab}
      >
        {tab}
      </button>
    {/each}
  </div>

  <!-- Header -->
  <div class="page-header mt-6">
    <div class="header-text">
      <h1>Settlement Tracker</h1>
      <p class="subtitle">Track payment gateway settlements and reconciliation progress across all channels.</p>
    </div>
    <div class="header-actions">
      <div class="toggle-group">
        <button 
          class="toggle-btn" 
          class:active={activePeriod === 'Last 7 Days'}
          onclick={() => activePeriod = 'Last 7 Days'}
        >Last 7 Days</button>
        <button 
          class="toggle-btn" 
          class:active={activePeriod === 'Last 30 Days'}
          onclick={() => activePeriod = 'Last 30 Days'}
        >Last 30 Days</button>
      </div>
      <button class="btn-outline">
        <Filter size={16} /> Filter
      </button>
      <button class="btn-outline">
        <Download size={16} /> Export CSV
      </button>
    </div>
  </div>

  <!-- Metrics Cards -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-title">TOTAL SETTLED AMOUNT</div>
      <div class="metric-value">₹14,82,300</div>
      <div class="metric-trend positive"><ArrowUpRight size={14} /> 22.1% <span class="trend-text">vs last week</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">PENDING SETTLEMENT</div>
      <div class="metric-value">₹2,15,400</div>
      <div class="metric-trend negative"><ArrowDownRight size={14} /> 5.2% <span class="trend-text">vs last week</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">FAILED SETTLEMENTS</div>
      <div class="metric-value">₹12,450</div>
      <div class="metric-trend negative"><ArrowUpRight size={14} /> 1.2% <span class="trend-text">vs last week</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">TODAY'S SETTLEMENTS</div>
      <div class="metric-value">₹84,500</div>
      <div class="metric-trend positive"><ArrowUpRight size={14} /> 12.4% <span class="trend-text">vs yesterday</span></div>
    </div>
  </div>

  <!-- Charts Row -->
  <div class="charts-row">
    
    <!-- Left Chart -->
    <div class="card chart-card flex-2">
      <div class="card-header border-0 flex-between">
        <h3>Weekly Settled vs Pending</h3>
        <div class="legend flex gap-16">
          <div class="legend-item"><span class="dot red"></span> Settled</div>
          <div class="legend-item"><span class="dot gray"></span> Pending</div>
        </div>
      </div>
      <div class="chart-body flex align-end justify-between p-6 pt-0">
        <!-- Empty chart placeholder as in figma -->
        <div class="axis-label">MON</div>
        <div class="axis-label">TUE</div>
        <div class="axis-label">WED</div>
        <div class="axis-label">THU</div>
        <div class="axis-label">FRI</div>
        <div class="axis-label">SAT</div>
        <div class="axis-label">SUN</div>
      </div>
    </div>

    <!-- Right Chart -->
    <div class="card p-6 flex-1 text-center">
      <h3 class="text-left font-bold text-dark text-lg mb-6">Status Distribution</h3>
      
      <div class="donut-chart-container mx-auto mb-6">
        <svg viewBox="0 0 100 100" class="donut">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" stroke-width="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F05139" stroke-width="12" stroke-dasharray="251 1000" stroke-dashoffset="0" stroke-linecap="round" />
        </svg>
        <div class="donut-text">
          <div class="donut-val">82%</div>
          <div class="donut-sub">Success Rate</div>
        </div>
      </div>

      <div class="stats-list text-left">
        <div class="stat-row flex-between mb-4">
          <div class="flex align-center gap-8"><span class="dot green"></span> <span class="text-muted text-sm">Settled</span></div>
          <strong class="text-dark text-sm">1,248 cases</strong>
        </div>
        <div class="stat-row flex-between mb-4">
          <div class="flex align-center gap-8"><span class="dot red"></span> <span class="text-muted text-sm">Pending</span></div>
          <strong class="text-dark text-sm">342 cases</strong>
        </div>
        <div class="stat-row flex-between">
          <div class="flex align-center gap-8"><span class="dot red-light"></span> <span class="text-muted text-sm">Failed</span></div>
          <strong class="text-dark text-sm">48 cases</strong>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Settlements -->
  <div class="card mb-10">
    <div class="card-header border-bottom flex-between flex-wrap gap-16">
      <h3>Recent Settlements</h3>
      <div class="flex gap-12 align-center">
        <div class="search-box">
          <Search size={16} class="text-muted" />
          <input type="text" placeholder="Settlement ID or Customer..." />
        </div>
        <button class="dropdown-btn">All Gateways <ChevronDown size={14} /></button>
        <button class="dropdown-btn">All Status <ChevronDown size={14} /></button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>SETTLEMENT ID</th>
            <th>ORDER ID</th>
            <th>GATEWAY</th>
            <th>CUSTOMER</th>
            <th>AMOUNT</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>REFERENCE</th>
          </tr>
        </thead>
        <tbody>
          {#each settlements as item}
            <tr>
              <td class="text-primary font-medium text-sm">{item.id}</td>
              <td class="text-muted text-sm">{item.orderId}</td>
              <td>
                <div class="flex align-center gap-8 text-dark text-sm font-medium">
                  <div class="gateway-icon">🏦</div> {item.gateway}
                </div>
              </td>
              <td>
                <div class="font-bold text-dark text-sm">{item.customer}</div>
                <div class="text-xs text-muted mt-1">{item.email}</div>
              </td>
              <td class="text-dark text-sm font-medium">{item.amount}</td>
              <td class="text-dark text-sm font-medium">
                {item.date} <br> <span class="text-muted font-normal text-xs">{item.time}</span>
              </td>
              <td><span class="badge-green-light">{item.status}</span></td>
              <td class="text-muted text-sm">{item.reference}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination Footer -->
    <div class="pagination-footer border-top flex-between p-6">
      <div class="text-muted text-sm">Showing 1-4 of 1,638 results</div>
      <div class="flex gap-4">
        <button class="page-btn text-muted">&lt;</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <span class="text-muted mx-2">...</span>
        <button class="page-btn">42</button>
        <button class="page-btn text-muted">&gt;</button>
      </div>
    </div>
  </div>

</div>

<style>
  .finance-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

  /* Top Tabs */
  .top-nav-tabs {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #E5E7EB;
    margin-bottom: 24px;
  }

  .top-tab {
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

  .top-tab.active {
    color: #F05139;
    border-bottom-color: #F05139;
  }

  .mt-6 { margin-top: 24px; }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  .header-text { max-width: 500px; }

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111827;
  }

  .subtitle {
    color: #6B7280;
    font-size: 14px;
    line-height: 1.5;
  }

  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .toggle-group {
    display: flex;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 8px;
  }

  .toggle-btn {
    background: none;
    border: none;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
    cursor: pointer;
  }

  .toggle-btn.active {
    background: #F05139;
    color: white;
  }

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

  /* Metrics Grid */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  .metric-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .metric-title {
    font-size: 11px;
    font-weight: 700;
    color: #6B7280;
    margin-bottom: 12px;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .metric-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
  }

  .metric-trend.positive { color: #10B981; }
  .metric-trend.negative { color: #DC2626; }

  .trend-text {
    color: #9CA3AF;
    font-weight: 400;
    margin-left: 4px;
  }

  /* Charts Row */
  .charts-row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }

  .flex-1 { flex: 1; }
  .flex-2 { flex: 2; }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .chart-card { display: flex; flex-direction: column; }
  .card-header { padding: 24px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  .border-top { border-top: 1px solid #F3F4F6; }
  .border-0 { border: none !important; }
  .p-6 { padding: 24px; }
  .pt-0 { padding-top: 0 !important; }
  .pb-0 { padding-bottom: 0 !important; }

  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #6B7280; font-weight: 500; }
  .dot { width: 10px; height: 10px; border-radius: 2px; }
  .dot.red { background: #F05139; }
  .dot.gray { background: #E5E7EB; }
  .dot.green { background: #10B981; }
  .dot.red-light { background: #FCA5A5; }

  .chart-body { min-height: 250px; }
  .axis-label { font-size: 11px; color: #9CA3AF; font-weight: 600; padding: 8px 0; border-top: 1px dashed #E5E7EB; width: 100%; text-align: center; }

  .donut-chart-container { position: relative; width: 160px; height: 160px; }
  .donut { width: 100%; height: 100%; transform: rotate(-90deg); }
  .donut-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .donut-val { font-size: 28px; font-weight: 800; color: #111827; }
  .donut-sub { font-size: 11px; font-weight: 600; color: #6B7280; margin-top: -2px; }

  .mx-auto { margin-left: auto; margin-right: auto; }
  .text-center { text-align: center; }
  .text-left { text-align: left; }

  /* Table Filters */
  .search-box {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 0 12px;
    height: 38px;
    width: 250px;
  }

  .search-box input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    margin-left: 8px;
    font-size: 14px;
    color: #111827;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #6B7280;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    height: 38px;
  }

  /* Tables */
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
  .data-table th, .data-table td { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

  .gateway-icon { background: #E0E7FF; border-radius: 4px; padding: 4px; font-size: 12px; }

  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  /* Pagination */
  .page-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    color: #111827;
  }
  .page-btn.active {
    background: #F05139;
    color: white;
    border-color: #F05139;
  }
  .mx-2 { margin: 0 8px; }

  /* Utilities */
  .flex { display: flex; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .align-end { align-items: flex-end; }
  .justify-between { justify-content: space-between; }
  .flex-wrap { flex-wrap: wrap; }
  .gap-16 { gap: 16px; }
  .gap-12 { gap: 12px; }
  .gap-8 { gap: 8px; }
  .gap-4 { gap: 4px; }
  .mb-10 { margin-bottom: 40px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 16px; }
  .mt-1 { margin-top: 4px; }
  
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .font-normal { font-weight: 400; }
  
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 16px; }
</style>
