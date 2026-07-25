<script lang="ts">
  import { ArrowUpRight, ArrowDownRight, AlertTriangle, ChevronDown, BarChart3 } from 'lucide-svelte';

  let { data } = $props();
  
  // Transform or fallback dashboard stats
  const totalOrders = Object.values(data.stats?.orders || {}).reduce((a: any, b: any) => a + b, 0) as number;
  
  let stats = $derived({
    revenue: data.stats?.total_revenue || 0,
    revenue_growth: 12.5, // Mock growth since backend doesn't provide
    orders: totalOrders || 0,
    orders_growth: 8.2, // Mock growth
    aov: (data.stats?.total_revenue && totalOrders) ? Math.round(data.stats.total_revenue / totalOrders) : 0,
    aov_growth: 2.1,
    conversion_rate: 3.2, // Mock conversion rate
    conversion_growth: -0.4
  });
</script>

<svelte:head>
  <title>Admin | Dashboard</title>
</svelte:head>

<div class="dashboard-container">
  <!-- Header -->
  <div class="page-header">
    <div>
      <h1>Dashboard</h1>
      <p class="subtitle">Welcome back, Manj. Here's what's happening today.</p>
    </div>
    <div class="header-actions">
      <div class="date-select">
        <span>Last 7 days</span>
        <ChevronDown size={14} />
      </div>
      <button class="btn-export">Export report</button>
    </div>
  </div>

  <!-- Top Metrics -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-title">TODAY'S REVENUE</div>
      <div class="metric-value">₹{stats.revenue.toLocaleString()}</div>
      <div class="metric-trend {stats.revenue_growth >= 0 ? 'positive' : 'negative'}">
        {#if stats.revenue_growth >= 0}<ArrowUpRight size={14} />{:else}<ArrowDownRight size={14} />{/if}
        {Math.abs(stats.revenue_growth)}% <span class="trend-text">vs last period</span>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title">ORDERS TODAY</div>
      <div class="metric-value">{stats.orders}</div>
      <div class="metric-trend {stats.orders_growth >= 0 ? 'positive' : 'negative'}">
        {#if stats.orders_growth >= 0}<ArrowUpRight size={14} />{:else}<ArrowDownRight size={14} />{/if}
        {Math.abs(stats.orders_growth)}% <span class="trend-text">vs last period</span>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title">AVG ORDER VALUE</div>
      <div class="metric-value">₹{stats.aov.toLocaleString()}</div>
      <div class="metric-trend {stats.aov_growth >= 0 ? 'positive' : 'negative'}">
        {#if stats.aov_growth >= 0}<ArrowUpRight size={14} />{:else}<ArrowDownRight size={14} />{/if}
        {Math.abs(stats.aov_growth)}% <span class="trend-text">vs last period</span>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title">CONVERSION RATE</div>
      <div class="metric-value">{stats.conversion_rate}%</div>
      <div class="metric-trend {stats.conversion_growth >= 0 ? 'positive' : 'negative'}">
        {#if stats.conversion_growth >= 0}<ArrowUpRight size={14} />{:else}<ArrowDownRight size={14} />{/if}
        {Math.abs(stats.conversion_growth)}% <span class="trend-text">vs last period</span>
      </div>
    </div>
  </div>

  <!-- Charts Row 1 -->
  <div class="charts-row split-2-1">
    <div class="card chart-card">
      <div class="card-header">
        <h3>Revenue — Last 30 days</h3>
        <span class="badge-green">+18.2%</span>
      </div>
      <div class="chart-placeholder">
        <!-- Mock Line Chart -->
        <svg viewBox="0 0 100 40" class="line-chart" preserveAspectRatio="none">
          <path d="M0,35 L5,34 L10,30 L15,31 L20,28 L25,22 L30,22 L35,18 L40,15 L45,17 L50,14 L55,10 L60,12 L65,15 L70,11 L75,10 L80,7 L85,9 L90,6 L95,5 L100,5" fill="none" stroke="#F05139" stroke-width="1.5" />
          <circle cx="100" cy="5" r="1.5" fill="#F05139" />
        </svg>
      </div>
    </div>
    <div class="card chart-card">
      <div class="card-header">
        <h3>Orders — This week</h3>
      </div>
      <div class="chart-placeholder align-bottom">
        <div class="bar-chart-simple">
          <div class="bar-col"><div class="bar" style="height: 50%"></div><span>Mon</span></div>
          <div class="bar-col"><div class="bar" style="height: 60%"></div><span>Tue</span></div>
          <div class="bar-col"><div class="bar" style="height: 55%"></div><span>Wed</span></div>
          <div class="bar-col"><div class="bar" style="height: 70%"></div><span>Thu</span></div>
          <div class="bar-col"><div class="bar" style="height: 65%"></div><span>Fri</span></div>
          <div class="bar-col"><div class="bar" style="height: 85%"></div><span>Sat</span></div>
          <div class="bar-col"><div class="bar" style="height: 75%"></div><span>Sun</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Row 2: Top Selling, Low Stock, Funnel -->
  <div class="charts-row split-3">
    <!-- Top Selling -->
    <div class="card list-card">
      <div class="card-header">
        <h3>Top Selling — 7 days</h3>
      </div>
      <div class="list-content">
        {#each Array(4) as _}
        <div class="list-item">
          <div class="item-img" style="background-image: url('https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop')"></div>
          <div class="item-info">
            <h4>Hair Fall Control Oil</h4>
            <span class="muted">120 sold</span>
          </div>
          <div class="item-value">₹599</div>
        </div>
        {/each}
      </div>
    </div>

    <!-- Low Stock -->
    <div class="card list-card">
      <div class="card-header">
        <h3>Low Stock Alerts</h3>
        <span class="badge-red-light">3</span>
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="alert-icon"><AlertTriangle size={16} /></div>
          <div class="item-info">
            <h4>Anti-Dandruff Shampoo</h4>
            <span class="muted">SKU MN-ADS-200</span>
          </div>
          <div class="stock-badge">8 left</div>
        </div>
        <div class="list-item">
          <div class="alert-icon"><AlertTriangle size={16} /></div>
          <div class="item-info">
            <h4>Holistic Combo</h4>
            <span class="muted">SKU MN-ADS-200</span>
          </div>
          <div class="stock-badge">12 left</div>
        </div>
        <div class="list-item">
          <div class="alert-icon"><AlertTriangle size={16} /></div>
          <div class="item-info">
            <h4>Hair Growth Combo</h4>
            <span class="muted">SKU MN-ADS-200</span>
          </div>
          <div class="stock-badge">19 left</div>
        </div>
      </div>
    </div>

    <!-- Funnel -->
    <div class="card list-card">
      <div class="card-header">
        <h3>Funnel</h3>
      </div>
      <div class="funnel-content">
        <div class="funnel-step">
          <div class="f-labels"><span>Visitors</span><span>12,480 • 100%</span></div>
          <div class="f-track"><div class="f-fill" style="width: 100%"></div></div>
        </div>
        <div class="funnel-step">
          <div class="f-labels"><span>Add to Cart</span><span>1,854 • 14.9%</span></div>
          <div class="f-track"><div class="f-fill" style="width: 14.9%"></div></div>
        </div>
        <div class="funnel-step">
          <div class="f-labels"><span>Checkout</span><span>612 • 4.9%</span></div>
          <div class="f-track"><div class="f-fill" style="width: 4.9%"></div></div>
        </div>
        <div class="funnel-step">
          <div class="f-labels"><span>Orders</span><span>427 • 3.42%</span></div>
          <div class="f-track"><div class="f-fill" style="width: 3.42%"></div></div>
        </div>
        
        <div class="funnel-stats">
          <div class="f-stat">
            <span class="fs-label">Cart abandonment</span>
            <span class="fs-val black">67%</span>
          </div>
          <div class="f-stat">
            <span class="fs-label">Recovery rate</span>
            <span class="fs-val green">12.3%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Orders Table -->
  <div class="card table-card">
    <div class="card-header">
      <h3>Recent Orders</h3>
      <a href="/admin/orders" class="view-all">View all &rarr;</a>
    </div>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>CUSTOMER</th>
            <th>TOTAL</th>
            <th>PAYMENT</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>MN-10421</strong><br><span class="muted">Jun 5, 2026</span></td>
            <td><strong>Priya Sharma</strong></td>
            <td><strong>₹1,299</strong></td>
            <td><span class="badge-gray">Prepaid</span></td>
            <td><span class="badge-unfulfilled">Unfulfilled</span></td>
            <td class="action-cell"><a href="#" class="action-link">Open &rarr;</a></td>
          </tr>
          <tr>
            <td><strong>MN-10420</strong><br><span class="muted">Jun 5, 2026</span></td>
            <td><strong>Rohan Mehta</strong></td>
            <td><strong>₹699</strong></td>
            <td><span class="badge-gray">COD</span></td>
            <td><span class="badge-unfulfilled">Unfulfilled</span></td>
            <td class="action-cell"><a href="#" class="action-link">Open &rarr;</a></td>
          </tr>
          <tr>
            <td><strong>MN-10419</strong><br><span class="muted">Jun 4, 2026</span></td>
            <td><strong>Anjali Verma</strong></td>
            <td><strong>₹1,899</strong></td>
            <td><span class="badge-gray">Prepaid</span></td>
            <td><span class="badge-fulfilled">Fulfilled</span></td>
            <td class="action-cell"><a href="#" class="action-link">Open &rarr;</a></td>
          </tr>
          <tr>
            <td><strong>MN-10418</strong><br><span class="muted">Jun 4, 2026</span></td>
            <td><strong>Kabir Singh</strong></td>
            <td><strong>₹549</strong></td>
            <td><span class="badge-gray">Prepaid</span></td>
            <td><span class="badge-fulfilled">Fulfilled</span></td>
            <td class="action-cell"><a href="#" class="action-link">Open &rarr;</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Platform Analytics Title -->
  <div class="section-title">
    <BarChart3 class="mr-2 text-primary" size={20} />
    <h3>Platform Analytics</h3>
  </div>

  <!-- Platform Analytics Grid -->
  <div class="analytics-grid">
    <!-- Microsoft Clarity -->
    <div class="card a-card">
      <div class="a-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="MS" class="a-icon" />
        <h4>Microsoft Clarity Overview</h4>
      </div>
      <div class="a-stats-grid">
        <div class="a-stat-box">
          <span class="a-label">HEATMAP SESSIONS</span>
          <span class="a-val">3,429</span>
          <span class="a-trend green">+12% vs LW</span>
        </div>
        <div class="a-stat-box">
          <span class="a-label">SESSION RECORDINGS</span>
          <span class="a-val">1,892</span>
          <span class="a-trend gray">Avg 4m 12s</span>
        </div>
        <div class="a-stat-box red-box">
          <span class="a-label red">RAGE CLICKS</span>
          <span class="a-val red">142</span>
          <span class="a-trend red">Check Checkout</span>
        </div>
        <div class="a-stat-box red-box-light">
          <span class="a-label red">DEAD CLICKS</span>
          <span class="a-val">48</span>
          <span class="a-trend red">2.1% rate</span>
        </div>
      </div>
    </div>

    <!-- GA4 -->
    <div class="card a-card">
      <div class="a-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="a-icon" />
        <h4>Google Analytics (GA4)</h4>
      </div>
      <div class="ga-layout">
        <div class="ga-sources">
          <span class="a-label mb-2">TRAFFIC SOURCES</span>
          <div class="source-row"><span class="dot blue"></span> Direct <span>45%</span></div>
          <div class="source-row"><span class="dot green"></span> Organic <span>32%</span></div>
          <div class="source-row"><span class="dot orange"></span> Paid <span>23%</span></div>
        </div>
        <div class="ga-totals">
          <div class="ga-stat">
            <span class="a-label">Total Users</span>
            <span class="a-val">24.8k</span>
          </div>
          <div class="ga-stat mt-3">
            <span class="a-label">Sessions</span>
            <span class="a-val">32.1k</span>
          </div>
          <div class="ga-stat mt-3">
            <span class="a-label">Bounce Rate</span>
            <span class="a-val">42.4%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Meta & Search Console Stack -->
    <div class="a-stack">
      <div class="card a-card small">
        <div class="a-header">
          <span class="a-icon blue-text font-bold">Meta Ads</span>
        </div>
        <div class="meta-row"><span>Spend</span><strong>₹82,400</strong></div>
        <div class="meta-row"><span>Impressions</span><strong>1.2M</strong></div>
        <div class="meta-row"><span>Clicks</span><strong>42,500</strong></div>
        <div class="meta-row"><span>ROAS</span><strong class="green-text">3.2x</strong></div>
      </div>

      <div class="card a-card small">
        <div class="a-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="a-icon" />
          <h4>Search Console</h4>
          <div class="sc-stats">
            <div><span class="sc-label">ORGANIC CLICKS</span><strong>12.4k</strong></div>
            <div><span class="sc-label">CTR</span><strong>4.2%</strong></div>
          </div>
        </div>
        <div class="meta-row header"><span class="a-label">TOP KEYWORDS</span></div>
        <div class="meta-row"><span>hair oil for men</span><strong>2,401</strong></div>
        <div class="meta-row"><span>ayurvedic hair care</span><strong>1,892</strong></div>
        <div class="meta-row"><span>anti dandruff oil</span><strong>1,204</strong></div>
        <div class="meta-row"><span>natural hair serum</span><strong>892</strong></div>
      </div>
    </div>
  </div>

  <!-- COD vs Prepaid Section Title -->
  <div class="section-title mt-8">
    <h3>COD vs Prepaid Revenue Comparison</h3>
  </div>

  <!-- COD vs Prepaid Chart Area -->
  <div class="card cod-card">
    <div class="cod-split">
      <div class="doughnut-area">
        <div class="d-chart">
          <svg viewBox="0 0 100 100" class="circular-chart">
            <path class="circle-bg" d="M18 50 a 32 32 0 1 1 64 0 a 32 32 0 1 1 -64 0" />
            <path class="circle" stroke-dasharray="65, 100" d="M18 50 a 32 32 0 1 1 64 0 a 32 32 0 1 1 -64 0" />
          </svg>
          <div class="d-center">
            <span class="d-val">₹1.2M</span>
            <span class="d-label">TOTAL REVENUE</span>
          </div>
        </div>
        <div class="d-legend">
          <div class="dl-row"><span class="dot red"></span> Prepaid <strong>65% (₹780k)</strong></div>
          <div class="dl-row"><span class="dot gray"></span> COD <strong>35% (₹420k)</strong></div>
        </div>
      </div>
      
      <div class="bar-trend-area">
        <div class="card-header border-0 pb-0">
          <span class="a-label">REVENUE TREND (LAST 6 MONTHS)</span>
          <div class="d-legend-mini">
            <span><span class="dot red"></span> Prepaid</span>
            <span><span class="dot gray"></span> COD</span>
          </div>
        </div>
        <div class="trend-bars">
          <div class="tb-col"><div class="tb-prepaid" style="height: 40%"></div><div class="tb-cod" style="height: 20%"></div><span>JAN</span></div>
          <div class="tb-col"><div class="tb-prepaid" style="height: 45%"></div><div class="tb-cod" style="height: 25%"></div><span>FEB</span></div>
          <div class="tb-col"><div class="tb-prepaid" style="height: 50%"></div><div class="tb-cod" style="height: 25%"></div><span>MAR</span></div>
          <div class="tb-col"><div class="tb-prepaid" style="height: 60%"></div><div class="tb-cod" style="height: 30%"></div><span>APR</span></div>
          <div class="tb-col"><div class="tb-prepaid" style="height: 70%"></div><div class="tb-cod" style="height: 35%"></div><span>MAY</span></div>
          <div class="tb-col"><div class="tb-prepaid" style="height: 65%"></div><div class="tb-cod" style="height: 30%"></div><span>JUN</span></div>
        </div>
      </div>
    </div>
  </div>

</div>

<style>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
    color: #111827;
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .subtitle {
    color: #6B7280;
    font-size: 14px;
  }

  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .date-select {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    background: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  .btn-export {
    background: #F05139;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }

  /* Shared Card */
  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F3F4F6;
  }

  .border-0 { border: none !important; }
  .pb-0 { padding-bottom: 0 !important; }

  .card-header h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
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
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .metric-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
  }

  .metric-trend.positive {
    color: #10B981;
  }

  .metric-trend.negative {
    color: #DC2626;
  }

  .trend-text {
    color: #9CA3AF;
    font-weight: 400;
    margin-left: 4px;
  }

  /* Charts Rows */
  .charts-row {
    display: grid;
    gap: 16px;
    margin-bottom: 24px;
  }

  .split-2-1 {
    grid-template-columns: 2fr 1fr;
  }

  .split-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .chart-card {
    display: flex;
    flex-direction: column;
  }

  .badge-green {
    background: #D1FAE5;
    color: #059669;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
  }

  .chart-placeholder {
    padding: 20px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
  }

  .align-bottom {
    align-items: flex-end;
  }

  .line-chart {
    width: 100%;
    height: 100%;
  }

  .bar-chart-simple {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 180px;
    gap: 8px;
  }

  .bar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
    height: 100%;
    justify-content: flex-end;
  }

  .bar {
    width: 100%;
    max-width: 24px;
    background: #F05139;
    border-radius: 4px 4px 0 0;
  }

  .bar-col span {
    font-size: 11px;
    color: #9CA3AF;
  }

  /* List Cards (Top Selling, Alerts) */
  .list-content {
    padding: 12px 20px;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #F3F4F6;
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .item-img {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
  }

  .item-info {
    flex: 1;
  }

  .item-info h4 {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 2px 0;
  }

  .muted {
    color: #6B7280;
    font-size: 12px;
  }

  .item-value {
    font-weight: 600;
    font-size: 14px;
  }

  .badge-red-light {
    background: #FEE2E2;
    color: #DC2626;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  .alert-icon {
    color: #F59E0B;
  }

  .stock-badge {
    color: #DC2626;
    font-size: 12px;
    font-weight: 600;
    background: #FEF2F2;
    padding: 4px 8px;
    border-radius: 4px;
  }

  /* Funnel */
  .funnel-content {
    padding: 20px;
  }

  .funnel-step {
    margin-bottom: 16px;
  }

  .f-labels {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .f-labels span:last-child {
    color: #6B7280;
  }

  .f-track {
    height: 6px;
    background: #F3F4F6;
    border-radius: 3px;
    overflow: hidden;
  }

  .f-fill {
    height: 100%;
    background: #F05139;
    border-radius: 3px;
  }

  .funnel-stats {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    background: #F9FAFB;
    padding: 12px;
    border-radius: 8px;
  }

  .f-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .fs-label {
    font-size: 11px;
    color: #6B7280;
    text-transform: uppercase;
  }

  .fs-val {
    font-size: 18px;
    font-weight: 700;
  }

  .fs-val.green { color: #10B981; }

  /* Table Card */
  .table-card {
    margin-bottom: 40px;
  }

  .view-all {
    color: #F05139;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th, td {
    padding: 16px 20px;
    border-bottom: 1px solid #F3F4F6;
    font-size: 14px;
  }

  th {
    color: #6B7280;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .badge-gray {
    background: #F3F4F6;
    color: #4B5563;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .badge-unfulfilled {
    background: #FEF3C7;
    color: #D97706;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .badge-fulfilled {
    background: #D1FAE5;
    color: #059669;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .action-cell {
    text-align: right;
  }

  .action-link {
    color: #F05139;
    font-weight: 600;
    text-decoration: none;
  }

  /* Platform Analytics */
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .section-title h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }

  .text-primary {
    color: #F05139;
  }

  .mt-8 { margin-top: 40px; }
  .mb-2 { margin-bottom: 8px; }
  .mt-3 { margin-top: 12px; }
  
  .analytics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  .a-card {
    padding: 24px;
  }

  .a-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .a-icon {
    width: 24px;
    height: 24px;
  }

  .a-header h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }

  .a-label {
    font-size: 11px;
    font-weight: 700;
    color: #6B7280;
    letter-spacing: 0.05em;
  }

  .a-val {
    font-size: 24px;
    font-weight: 800;
  }

  .a-trend {
    font-size: 12px;
    font-weight: 600;
  }
  .a-trend.green { color: #10B981; }
  .a-trend.gray { color: #9CA3AF; }
  
  /* MS Clarity Specific */
  .a-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .a-stat-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    background: #F9FAFB;
    border-radius: 8px;
  }

  .red-box { background: #FEF2F2; }
  .red-box-light { background: #FFFAFA; border: 1px solid #FEE2E2; }
  
  .red { color: #DC2626 !important; }

  /* GA4 Specific */
  .ga-layout {
    display: flex;
    gap: 24px;
  }

  .ga-sources {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .source-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 12px;
  }

  .source-row span:last-child {
    margin-left: auto;
    font-weight: 700;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot.blue { background: #3B82F6; }
  .dot.green { background: #10B981; }
  .dot.orange { background: #F59E0B; }
  .dot.red { background: #F05139; }
  .dot.gray { background: #E5E7EB; }

  .ga-totals {
    border-left: 1px solid #F3F4F6;
    padding-left: 24px;
  }
  
  .ga-stat {
    display: flex;
    flex-direction: column;
  }

  /* Stacked Cards (Meta & SC) */
  .a-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .a-card.small {
    padding: 16px 20px;
  }

  .a-card.small .a-header {
    margin-bottom: 16px;
  }

  .blue-text { color: #1877F2; font-size: 16px; }
  .font-bold { font-weight: 800; }

  .meta-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 6px 0;
    border-bottom: 1px solid #F3F4F6;
  }
  
  .meta-row:last-child { border-bottom: none; }
  
  .meta-row.header { border-bottom: none; padding-bottom: 0; }

  .green-text { color: #10B981; }

  .sc-stats {
    margin-left: auto;
    display: flex;
    gap: 16px;
  }

  .sc-stats div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .sc-label {
    font-size: 9px;
    color: #6B7280;
    font-weight: 700;
  }

  /* COD vs Prepaid */
  .cod-split {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .doughnut-area {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #F3F4F6;
  }

  .d-chart {
    position: relative;
    width: 200px;
    height: 200px;
  }

  .circular-chart {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 250px;
  }
  
  .circle-bg {
    fill: none;
    stroke: #E5E7EB;
    stroke-width: 8;
  }
  
  .circle {
    fill: none;
    stroke: #F05139;
    stroke-width: 8;
    stroke-linecap: round;
  }

  .d-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .d-val {
    font-size: 28px;
    font-weight: 800;
  }

  .d-label {
    font-size: 10px;
    font-weight: 700;
    color: #6B7280;
  }

  .d-legend {
    margin-top: 24px;
    width: 100%;
  }

  .dl-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .dl-row strong { margin-left: auto; }

  .bar-trend-area {
    display: flex;
    flex-direction: column;
  }

  .d-legend-mini {
    display: flex;
    gap: 16px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .d-legend-mini span { display: flex; align-items: center; gap: 6px; }

  .trend-bars {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 40px 40px;
    gap: 16px;
  }

  .tb-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    height: 200px;
  }

  .tb-prepaid {
    width: 32px;
    background: #F05139;
    border-radius: 4px;
  }

  .tb-cod {
    width: 32px;
    background: #E5E7EB;
    border-radius: 4px;
    margin-top: -4px;
  }

  .tb-col span {
    font-size: 11px;
    font-weight: 600;
    color: #9CA3AF;
  }
</style>
