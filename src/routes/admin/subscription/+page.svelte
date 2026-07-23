<script lang="ts">
  import { Search, Filter, Download, Plus, MoreVertical, Calendar } from 'lucide-svelte';

  const subscriptions = Array(4).fill({
    id: '#SUB-82910',
    customer: 'Rohan Mehra',
    plan: 'Premium Wellness',
    billingCycle: 'Monthly',
    nextBilling: 'Oct 28, 2023',
    amount: '₹2,499',
    status: 'ACTIVE'
  });

  const upcomingRenewals = [
    { date: '24', month: 'OCT', title: 'Elite Grooming Kit (12 Units)', customer: 'Vikram Kumar', subId: '#SUB-82908', amount: '₹1,850', statusText: 'Auto-renew ON', statusColor: 'green' },
    { date: '25', month: 'OCT', title: 'Wellness Supplements Bundle', customer: 'Priya Sharma', subId: '#SUB-82885', amount: '₹3,200', statusText: 'Reminder sent', statusColor: 'orange' }
  ];

  let activeTab = $state('All');
  const tabs = ['All', 'Active', 'Paused'];
</script>

<svelte:head>
  <title>Admin | Subscription</title>
</svelte:head>

<div class="subscription-container">
  <!-- Header -->
  <div class="page-header">
    <div class="header-text">
      <h1>Subscription Management</h1>
      <p class="subtitle">Monitor and manage active subscriptions, recurring revenue, and customer billing.</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <Calendar size={16} /> Oct 1, 2023 - Oct 31, 2023
      </button>
      <button class="btn-outline">
        <Download size={16} /> Export CSV
      </button>
      <button class="btn-primary">
        <Plus size={16} /> Create Subscription
      </button>
    </div>
  </div>

  <!-- Metrics Grid -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="badge-trend positive">+6.8%</div>
      <div class="metric-title">ACTIVE SUBSCRIPTIONS</div>
      <div class="metric-value">1,248</div>
    </div>
    <div class="metric-card">
      <div class="badge-trend positive">+12.4%</div>
      <div class="metric-title">MRR (ESTIMATED)</div>
      <div class="metric-value">₹4,82,290</div>
    </div>
    <div class="metric-card">
      <div class="badge-trend negative">-0.5%</div>
      <div class="metric-title">CHURN RATE</div>
      <div class="metric-value">2.4%</div>
    </div>
    <div class="metric-card">
      <div class="badge-trend neutral">Due today</div>
      <div class="metric-title">RENEWALS DUE TODAY</div>
      <div class="metric-value">42</div>
    </div>
  </div>

  <!-- Charts Row -->
  <div class="charts-row">
    
    <!-- Left Chart -->
    <div class="card chart-card flex-2">
      <div class="card-header border-0 flex-between">
        <h3>Recurring Revenue Trend</h3>
        <select class="simple-select">
          <option>Last 12 Months</option>
        </select>
      </div>
      <div class="chart-body flex align-end justify-between p-6 pt-0 mt-auto">
        <!-- Empty chart placeholder -->
        <div class="axis-label">OCT</div>
        <div class="axis-label">NOV</div>
        <div class="axis-label">DEC</div>
        <div class="axis-label">JAN</div>
        <div class="axis-label">FEB</div>
        <div class="axis-label">MAR</div>
        <div class="axis-label">APR</div>
        <div class="axis-label">MAY</div>
        <div class="axis-label">JUN</div>
        <div class="axis-label">JUL</div>
        <div class="axis-label">AUG</div>
        <div class="axis-label">SEP</div>
      </div>
    </div>

    <!-- Right Chart -->
    <div class="card p-6 flex-1 text-center">
      <h3 class="text-left font-bold text-dark text-lg mb-8">Subscription Distribution</h3>
      
      <div class="donut-chart-container mx-auto mb-8">
        <svg viewBox="0 0 100 100" class="donut">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" stroke-width="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" stroke-width="12" stroke-dasharray="210 1000" stroke-dashoffset="0" />
        </svg>
        <div class="donut-text">
          <div class="donut-val">1,248</div>
          <div class="donut-sub">Total Assets</div>
        </div>
      </div>

      <div class="stats-list text-left">
        <div class="stat-row flex-between mb-4">
          <div class="flex align-center gap-8"><span class="dot red"></span> <span class="text-dark text-sm">Active</span></div>
          <strong class="text-dark text-sm">70%</strong>
        </div>
        <div class="stat-row flex-between mb-4">
          <div class="flex align-center gap-8"><span class="dot blue"></span> <span class="text-dark text-sm">Paused</span></div>
          <strong class="text-dark text-sm">18%</strong>
        </div>
        <div class="stat-row flex-between mb-4">
          <div class="flex align-center gap-8"><span class="dot red-dark"></span> <span class="text-dark text-sm">Cancelled</span></div>
          <strong class="text-dark text-sm">8%</strong>
        </div>
        <div class="stat-row flex-between">
          <div class="flex align-center gap-8"><span class="dot gray"></span> <span class="text-dark text-sm">Expired</span></div>
          <strong class="text-dark text-sm">4%</strong>
        </div>
      </div>
    </div>
  </div>

  <!-- Subscriptions Table -->
  <div class="card mb-10">
    <div class="card-header border-bottom flex-between flex-wrap gap-16 p-6">
      <div class="flex gap-12 align-center">
        <div class="search-box">
          <Search size={16} class="text-muted" />
          <input type="text" placeholder="Search customer or subscription ID..." />
        </div>
        <button class="btn-outline">
          <Filter size={16} /> Filters
        </button>
      </div>
      
      <div class="toggle-group-pills">
        {#each tabs as tab}
          <button 
            class="pill-btn" 
            class:active={activeTab === tab}
            onclick={() => activeTab = tab}
          >{tab}</button>
        {/each}
      </div>
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>SUBSCRIPTION ID</th>
            <th>CUSTOMER</th>
            <th>PLAN</th>
            <th>BILLING CYCLE</th>
            <th>NEXT BILLING</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {#each subscriptions as item}
            <tr>
              <td class="text-primary font-medium text-sm">{item.id}</td>
              <td class="text-dark text-sm">{item.customer}</td>
              <td class="text-dark text-sm">
                <div style="width: 70px; white-space: normal; line-height: 1.4;">{item.plan}</div>
              </td>
              <td class="text-dark text-sm">{item.billingCycle}</td>
              <td class="text-dark text-sm">
                <div style="width: 40px; white-space: normal; line-height: 1.4;">{item.nextBilling}</div>
              </td>
              <td class="text-dark text-sm">{item.amount}</td>
              <td><span class="badge-green-light">{item.status}</span></td>
              <td><button class="icon-btn"><MoreVertical size={16} /></button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination Footer -->
    <div class="pagination-footer border-top flex-between p-6">
      <div class="text-muted text-sm">Showing 1 to 10 of 1,248 subscriptions</div>
      <div class="flex gap-4">
        <button class="page-btn text-muted">&lt;</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <span class="text-muted mx-2">...</span>
        <button class="page-btn">125</button>
        <button class="page-btn text-muted">&gt;</button>
      </div>
    </div>
  </div>

  <!-- Upcoming Renewals -->
  <div class="card mb-10 p-6 pt-8 pb-8">
    <div class="flex-between mb-6">
      <h3 class="text-lg font-bold text-dark">Upcoming Renewals (Next 7 Days)</h3>
      <a href="#" class="text-primary font-medium text-sm text-decoration-none">View All</a>
    </div>

    <div class="renewals-list">
      {#each upcomingRenewals as item}
        <div class="renewal-card">
          <div class="flex align-center gap-16">
            <div class="date-box">
              <span class="date-month">{item.month}</span>
              <span class="date-day">{item.date}</span>
            </div>
            <div>
              <div class="font-bold text-dark text-sm">{item.title}</div>
              <div class="text-xs text-muted mt-1">Customer: {item.customer} • {item.subId}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold text-dark text-sm">{item.amount}</div>
            <div class="text-xs mt-1" class:text-green={item.statusColor === 'green'} class:text-orange={item.statusColor === 'orange'}>
              {item.statusText}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

</div>

<style>
  .subscription-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

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

  .btn-outline {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
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
    font-size: 13px;
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
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .badge-trend {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .badge-trend.positive { background: #ECFDF5; color: #059669; }
  .badge-trend.negative { background: #FEF2F2; color: #DC2626; }
  .badge-trend.neutral { background: #F3F4F6; color: #4B5563; }

  .metric-title {
    font-size: 11px;
    font-weight: 700;
    color: #6B7280;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 24px;
    font-weight: 800;
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

  .chart-card { display: flex; flex-direction: column; min-height: 400px; }
  .card-header { padding: 24px; }
  .border-0 { border: none !important; }
  .p-6 { padding: 24px; }
  .pt-0 { padding-top: 0 !important; }
  .pt-8 { padding-top: 32px; }
  .pb-8 { padding-bottom: 32px; }

  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  .simple-select {
    padding: 6px 12px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    background: #F9FAFB;
    font-size: 12px;
    color: #4B5563;
    outline: none;
  }

  .mt-auto { margin-top: auto; }
  .axis-label { font-size: 10px; color: #9CA3AF; font-weight: 700; padding: 12px 0; border-top: 1px solid #F3F4F6; width: 100%; text-align: center; letter-spacing: 0.05em; }

  .donut-chart-container { position: relative; width: 180px; height: 180px; }
  .donut { width: 100%; height: 100%; transform: rotate(-90deg); }
  .donut-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .donut-val { font-size: 32px; font-weight: 800; color: #111827; }
  .donut-sub { font-size: 11px; font-weight: 600; color: #6B7280; }

  .mx-auto { margin-left: auto; margin-right: auto; }
  .text-center { text-align: center; }
  .text-left { text-align: left; }

  .dot { width: 10px; height: 10px; border-radius: 2px; }
  .dot.red { background: #F05139; }
  .dot.blue { background: #0ea5e9; }
  .dot.red-dark { background: #991B1B; }
  .dot.gray { background: #6B7280; }

  /* Table Filters */
  .search-box {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 0 12px;
    height: 38px;
    width: 320px;
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

  .toggle-group-pills {
    display: flex;
    gap: 8px;
  }

  .pill-btn {
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }

  .pill-btn.active {
    background: #F05139;
    color: white;
    border-color: #F05139;
  }

  /* Tables */
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; }
  .data-table th, .data-table td { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }

  .icon-btn { background: none; border: none; color: #9CA3AF; cursor: pointer; padding: 4px; }

  /* Pagination */
  .border-top { border-top: 1px solid #F3F4F6; }
  
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

  /* Renewals List */
  .renewals-list { display: flex; flex-direction: column; gap: 16px; }
  
  .renewal-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    background: #FAFAFA;
  }

  .date-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
  }
  
  .date-month { font-size: 10px; font-weight: 700; color: #6B7280; margin-bottom: 2px; }
  .date-day { font-size: 16px; font-weight: 800; color: #111827; }

  .text-decoration-none { text-decoration: none; }

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
  .mb-8 { margin-bottom: 32px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 16px; }
  .mt-1 { margin-top: 4px; }
  
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  .text-green { color: #10B981; }
  .text-orange { color: #F59E0B; }
  .text-right { text-align: right; }
  
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 16px; }
</style>
