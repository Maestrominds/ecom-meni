<script lang="ts">
  import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';

  const productPerformance = [
    { name: 'Hair Fall Control Oil', sold: 420, revenue: '₹251,580', rate: '4.20%', stock: 142 },
    { name: 'Anti-Dandruff Shampoo', sold: 382, revenue: '₹171,518', rate: '3.90%', stock: 8, lowStock: true },
    { name: 'Vitamin C Face Serum', sold: 344, revenue: '₹274,856', rate: '3.60%', stock: 67 },
    { name: 'Beard Growth Combo', sold: 306, revenue: '₹305,694', rate: '3.30%', stock: 24, lowStock: true },
    { name: 'Onion Hair Mask', sold: 268, revenue: '₹147,132', rate: '3.00%', stock: 0, lowStock: true },
    { name: 'Sunscreen SPF 50', sold: 230, revenue: '₹149,270', rate: '2.70%', stock: 95 }
  ];

  const metaAds = [
    { campaign: 'Summer Sale 2024', spend: '₹42,000', clicks: '18,400', roas: '4.2x', conversions: '156' },
    { campaign: 'Retargeting - Cart Abandoners', spend: '₹12,500', clicks: '4,200', roas: '3.8x', conversions: '42' }
  ];

  const searchConsole = [
    { keyword: 'best hair fall control oil', clicks: '1,240', impressions: '25.5k', pos: '3.2' },
    { keyword: 'natural face serum india', clicks: '850', impressions: '18.2k', pos: '5.1' }
  ];
</script>

<svelte:head>
  <title>Admin | Analytics</title>
</svelte:head>

<div class="analytics-container">
  <!-- Header -->
  <div class="page-header">
    <h1>Analytics & Reports</h1>
    <div class="dropdown-btn">Last 30 days <ChevronDown size={14} /></div>
  </div>

  <!-- Top Metrics -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-title">REVENUE</div>
      <div class="metric-value">₹14,82,300</div>
      <div class="metric-trend positive"><ArrowUpRight size={14} /> 22.1% <span class="trend-text">vs last period</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">ORDERS</div>
      <div class="metric-value">2,148</div>
      <div class="metric-trend positive"><ArrowUpRight size={14} /> 15.4% <span class="trend-text">vs last period</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">AOV</div>
      <div class="metric-value">₹690</div>
      <div class="metric-trend positive"><ArrowUpRight size={14} /> 5.8% <span class="trend-text">vs last period</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-title">RTO RATE</div>
      <div class="metric-value">6.2%</div>
      <div class="metric-trend negative"><ArrowDownRight size={14} /> 1.1% <span class="trend-text">vs last period</span></div>
    </div>
  </div>

  <!-- Row 1: Sales & Payment -->
  <div class="charts-row split-2-1">
    <div class="card chart-card">
      <div class="card-header">
        <h3>Sales report</h3>
      </div>
      <div class="chart-placeholder">
        <svg viewBox="0 0 100 40" class="line-chart" preserveAspectRatio="none">
          <path d="M0,35 L10,32 L20,33 L30,28 L40,29 L50,23 L60,25 L70,18 L80,20 L90,12 L100,6" fill="none" stroke="#F05139" stroke-width="1.5" />
          <path d="M0,40 L0,35 L10,32 L20,33 L30,28 L40,29 L50,23 L60,25 L70,18 L80,20 L90,12 L100,6 L100,40 Z" fill="url(#gradient)" opacity="0.1" />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#F05139" />
              <stop offset="100%" stop-color="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="mb-6 font-bold text-dark text-lg">By payment method</h3>
      
      <div class="mb-6">
        <div class="flex-between mb-2">
          <span class="font-medium text-dark">Prepaid (Razorpay)</span>
          <span class="font-bold text-dark">₹9,18,000</span>
        </div>
        <div class="progress-bg"><div class="progress-fill" style="width: 62%"></div></div>
        <div class="text-xs text-muted mt-1">62%</div>
      </div>

      <div>
        <div class="flex-between mb-2">
          <span class="font-medium text-dark">COD</span>
          <span class="font-bold text-dark">₹5,64,300</span>
        </div>
        <div class="progress-bg"><div class="progress-fill" style="width: 38%"></div></div>
        <div class="text-xs text-muted mt-1">38%</div>
      </div>
    </div>
  </div>

  <!-- Row 2: Orders by day & Ad Perf -->
  <div class="charts-row split-2-1">
    <div class="card p-6">
      <h3 class="mb-6 font-bold text-dark text-lg">Orders by day</h3>
      <div class="bar-chart-simple">
        <div class="bar-col"><div class="bar" style="height: 40%"></div><span>Mon</span></div>
        <div class="bar-col"><div class="bar" style="height: 50%"></div><span>Tue</span></div>
        <div class="bar-col"><div class="bar" style="height: 45%"></div><span>Wed</span></div>
        <div class="bar-col"><div class="bar" style="height: 60%"></div><span>Thu</span></div>
        <div class="bar-col"><div class="bar" style="height: 55%"></div><span>Fri</span></div>
        <div class="bar-col"><div class="bar" style="height: 80%"></div><span>Sat</span></div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header border-0 pb-0">
        <h3>Ad performance (UTM)</h3>
      </div>
      <table class="data-table mt-4 no-borders">
        <thead>
          <tr>
            <th>CAMPAIGN</th>
            <th>ORDERS</th>
            <th>REVENUE</th>
            <th>AOV</th>
          </tr>
        </thead>
        <tbody>
          {#each Array(4) as _}
          <tr>
            <td class="font-medium text-dark text-sm">Facebook - Hair Fall - Jun26</td>
            <td class="text-dark text-sm">32</td>
            <td class="text-dark text-sm">₹45,000</td>
            <td class="text-dark text-sm">₹1,406</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Row 3: Mini Reports -->
  <div class="charts-row split-3">
    <div class="card p-6">
      <h3 class="mb-6 font-bold text-dark text-lg">Cart abandonment</h3>
      <div class="flex-between mb-4"><span class="text-muted">Abandonment rate</span><strong class="text-dark">67.2%</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Abandoned value</span><strong class="text-dark">₹3,84,200</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Recovery rate</span><strong class="text-green">12.3%</strong></div>
      <div class="flex-between"><span class="text-muted">Recovered revenue</span><strong class="text-green">₹47,250</strong></div>
    </div>
    <div class="card p-6">
      <h3 class="mb-6 font-bold text-dark text-lg">Shipping report</h3>
      <div class="flex-between mb-4"><span class="text-muted">Delhivery</span><strong class="text-dark">58% &nbsp; 2.3 days</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Bluedart</span><strong class="text-dark">28% &nbsp; 1.8 days</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Ekart</span><strong class="text-dark">14% &nbsp; 3.1 days</strong></div>
      <div class="flex-between"><span class="text-muted">RTO rate</span><strong class="text-dark">6.2%</strong></div>
    </div>
    <div class="card p-6">
      <h3 class="mb-6 font-bold text-dark text-lg">Customer mix</h3>
      <div class="flex-between mb-4"><span class="text-muted">New customers</span><strong class="text-dark">48%</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Returning</span><strong class="text-dark">52%</strong></div>
      <div class="flex-between mb-4"><span class="text-muted">Top state</span><strong class="text-dark">Maharashtra (24%)</strong></div>
      <div class="flex-between"><span class="text-muted">Top city</span><strong class="text-dark">Mumbai (11%)</strong></div>
    </div>
  </div>

  <!-- Product Performance Table -->
  <div class="card mb-10">
    <div class="card-header border-0 pb-0">
      <h3>Product performance</h3>
    </div>
    <div class="table-responsive mt-4 p-x">
      <table class="data-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>UNITS SOLD</th>
            <th>REVENUE</th>
            <th>CONV. RATE</th>
            <th class="text-right">STOCK</th>
          </tr>
        </thead>
        <tbody>
          {#each productPerformance as item}
            <tr>
              <td class="font-medium text-dark text-sm">{item.name}</td>
              <td class="text-dark text-sm">{item.sold}</td>
              <td class="text-dark text-sm">{item.revenue}</td>
              <td class="text-dark text-sm">{item.rate}</td>
              <td class="text-right">
                {#if item.lowStock}
                  <span class="badge-red-light">{item.stock}</span>
                {:else}
                  <span class="badge-gray-light">{item.stock}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Microsoft Clarity -->
  <div class="section-title">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="MS" class="s-icon" />
    <h3>Microsoft Clarity</h3>
  </div>
  
  <div class="card p-6 mb-10">
    <div class="charts-row split-2-1 border-bottom-dashed pb-6">
      <div>
        <h4 class="text-sm font-bold text-dark mb-4">Heatmap Preview</h4>
        <div class="clarity-grid">
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
      <div class="border-left-dashed pl-6">
        <h4 class="text-sm font-bold text-dark mb-4">Top Clicked Pages</h4>
        <div class="flex-between mb-4"><span class="text-muted text-sm">/products/hair-oil</span><strong class="text-dark text-sm">12.4k clicks</strong></div>
        <div class="flex-between mb-4"><span class="text-muted text-sm">/checkout</span><strong class="text-dark text-sm">8.2k clicks</strong></div>
        <div class="flex-between mb-4"><span class="text-muted text-sm">/home</span><strong class="text-dark text-sm">7.1k clicks</strong></div>
        <div class="flex-between"><span class="text-muted text-sm">/offers</span><strong class="text-dark text-sm">3.5k clicks</strong></div>
      </div>
    </div>
    <div class="pt-6">
      <h4 class="text-sm font-bold text-dark mb-4">Session Recordings</h4>
      <table class="data-table no-borders">
        <thead><tr><th>USER ID</th><th>DEVICE</th><th>DURATION</th><th>ACTION</th></tr></thead>
        <tbody>
          <tr><td class="text-muted text-sm">#USR-8821</td><td class="text-dark text-sm">Mobile (iOS)</td><td class="text-dark text-sm">04:22</td><td><span class="text-primary font-bold text-sm">Play</span></td></tr>
          <tr><td class="text-muted text-sm">#USR-9012</td><td class="text-dark text-sm">Desktop (Chrome)</td><td class="text-dark text-sm">02:15</td><td><span class="text-primary font-bold text-sm">Play</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Google Analytics 4 -->
  <div class="section-title">
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="s-icon" />
    <h3>Google Analytics 4</h3>
  </div>

  <div class="card p-6 mb-10">
    <div class="metrics-grid">
      <div class="metric-card shadow-none border-gray">
        <div class="metric-title">USERS</div>
        <div class="metric-value">42.5k</div>
        <div class="metric-trend positive">+12%</div>
      </div>
      <div class="metric-card shadow-none border-gray">
        <div class="metric-title">SESSIONS</div>
        <div class="metric-value">68.2k</div>
        <div class="metric-trend positive">+8%</div>
      </div>
      <div class="metric-card shadow-none border-gray">
        <div class="metric-title">AVG SESSION TIME</div>
        <div class="metric-value">2m 45s</div>
        <div class="metric-trend negative">-2%</div>
      </div>
      <div class="metric-card shadow-none border-gray">
        <div class="metric-title">BOUNCE RATE</div>
        <div class="metric-value">42.1%</div>
        <div class="metric-trend positive">-5%</div>
      </div>
    </div>
    
    <h4 class="text-sm font-bold text-dark mt-6 mb-4">Traffic Sources</h4>
    <div class="flex align-center gap-10">
      <svg viewBox="0 0 100 100" class="circular-chart small-circle">
        <path fill="none" stroke="#F05139" stroke-width="15" stroke-dasharray="45 100" d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
        <path fill="none" stroke="#3B82F6" stroke-width="15" stroke-dasharray="30 100" stroke-dashoffset="-45" d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
        <path fill="none" stroke="#10B981" stroke-width="15" stroke-dasharray="15 100" stroke-dashoffset="-75" d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
        <path fill="none" stroke="#8B5CF6" stroke-width="15" stroke-dasharray="10 100" stroke-dashoffset="-90" d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
      </svg>
      <div class="traffic-legend">
        <div class="tl-row"><span class="dot red"></span> <span class="text-sm text-dark">Organic Search (45%)</span></div>
        <div class="tl-row"><span class="dot blue"></span> <span class="text-sm text-dark">Direct (30%)</span></div>
        <div class="tl-row"><span class="dot green"></span> <span class="text-sm text-dark">Social (15%)</span></div>
        <div class="tl-row"><span class="dot purple"></span> <span class="text-sm text-dark">Referral (10%)</span></div>
      </div>
    </div>
  </div>

  <!-- Meta & Search Console -->
  <div class="section-title">
    <span class="blue-icon">∞</span>
    <h3>Meta Ads Campaign Performance</h3>
  </div>
  <div class="card mb-10">
    <table class="data-table no-borders m-4">
      <thead><tr><th>CAMPAIGN</th><th>SPEND</th><th>CLICKS</th><th>ROAS</th><th>CONVERSIONS</th></tr></thead>
      <tbody>
        {#each metaAds as ad}
          <tr>
            <td class="font-medium text-dark text-sm">{ad.campaign}</td>
            <td class="text-dark text-sm">{ad.spend}</td>
            <td class="text-dark text-sm">{ad.clicks}</td>
            <td class="text-green font-bold text-sm">{ad.roas}</td>
            <td class="text-dark text-sm">{ad.conversions}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="section-title">
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="s-icon" />
    <h3>Google Search Console</h3>
  </div>
  <div class="card mb-10">
    <table class="data-table no-borders m-4">
      <thead><tr><th>TOP KEYWORDS</th><th>CLICKS</th><th>IMPRESSIONS</th><th>AVG. POSITION</th></tr></thead>
      <tbody>
        {#each searchConsole as sc}
          <tr>
            <td class="font-medium text-dark text-sm">{sc.keyword}</td>
            <td class="text-dark text-sm">{sc.clicks}</td>
            <td class="text-dark text-sm">{sc.impressions}</td>
            <td class="text-dark text-sm">{sc.pos}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- COD vs Prepaid Split -->
  <div class="section-title">
    <h3>COD vs Prepaid Comparison</h3>
  </div>
  <div class="charts-row split-2-1" style="grid-template-columns: 1fr 1fr;">
    <div class="card p-6">
      <h4 class="text-sm font-bold text-dark mb-6">Revenue Split</h4>
      <div class="progress-bg big-progress">
        <div class="progress-fill red" style="width: 65%"><span class="p-text">65% Prepaid</span></div>
        <div class="progress-fill gray" style="width: 35%"><span class="p-text text-dark">35% COD</span></div>
      </div>
      <p class="text-xs text-muted mt-4 text-center">Prepaid orders drive higher lifetime value and lower cancellation rates.</p>
    </div>
    <div class="card p-6">
      <h4 class="text-sm font-bold text-dark mb-6">Orders Split</h4>
      <div class="progress-bg big-progress">
        <div class="progress-fill red" style="width: 52%"><span class="p-text">52% Prepaid</span></div>
        <div class="progress-fill gray" style="width: 48%"><span class="p-text text-dark">48% COD</span></div>
      </div>
      <p class="text-xs text-muted mt-4 text-center">Order count is nearly equal, but COD has a 12% higher RTO rate.</p>
    </div>
  </div>

</div>

<style>
  .analytics-container {
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

  .dropdown-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
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

  .shadow-none { box-shadow: none !important; }
  .border-gray { border: 1px solid #F3F4F6; }

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

  .metric-trend.positive { color: #10B981; }
  .metric-trend.negative { color: #DC2626; }

  .trend-text {
    color: #9CA3AF;
    font-weight: 400;
    margin-left: 4px;
  }

  /* Charts Rows */
  .charts-row {
    display: grid;
    gap: 24px;
    margin-bottom: 24px;
  }

  .split-2-1 { grid-template-columns: 2fr 1fr; }
  .split-3 { grid-template-columns: repeat(3, 1fr); }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .p-6 { padding: 24px; }
  .pb-6 { padding-bottom: 24px; }
  .pt-6 { padding-top: 24px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-10 { margin-bottom: 40px; }
  .mt-4 { margin-top: 16px; }
  .mt-6 { margin-top: 24px; }
  .pl-6 { padding-left: 24px; }
  .m-4 { margin: 16px; width: calc(100% - 32px) !important; }

  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  .text-green { color: #10B981; }
  
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 16px; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }

  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .flex { display: flex; }
  .align-center { align-items: center; }
  .gap-10 { gap: 40px; }

  /* Charts */
  .chart-card { display: flex; flex-direction: column; }
  .card-header { padding: 24px; border-bottom: 1px solid #F3F4F6; }
  .border-0 { border: none !important; }
  .pb-0 { padding-bottom: 0 !important; }
  .card-header h3 { font-size: 16px; font-weight: 700; margin: 0; color: #111827; }
  
  .chart-placeholder { padding: 24px; flex: 1; display: flex; align-items: center; min-height: 200px; }
  .line-chart { width: 100%; height: 100%; }

  .progress-bg { width: 100%; height: 10px; background: #F3F4F6; border-radius: 5px; overflow: hidden; display: flex; }
  .progress-fill { height: 100%; background: #F05139; border-radius: 5px; }

  .big-progress { height: 32px; border-radius: 8px; }
  .big-progress .progress-fill { display: flex; align-items: center; justify-content: center; border-radius: 0; }
  .big-progress .red { background: #F05139; }
  .big-progress .gray { background: #E5E7EB; }
  .p-text { color: white; font-size: 12px; font-weight: 700; }

  .bar-chart-simple { display: flex; justify-content: space-between; align-items: flex-end; width: 100%; height: 160px; gap: 12px; }
  .bar-col { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; height: 100%; justify-content: flex-end; }
  .bar { width: 100%; background: #F05139; }
  .bar-col span { font-size: 11px; color: #9CA3AF; }

  /* Tables */
  .table-responsive { overflow-x: auto; }
  .p-x { padding-left: 24px; padding-right: 24px; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; }
  .data-table th, .data-table td { padding: 16px 0; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  
  .no-borders th, .no-borders td { padding: 12px 16px; border-bottom: 1px solid #F9FAFB; }
  
  .badge-red-light { background: #FEF2F2; color: #DC2626; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; }
  .badge-gray-light { background: #F3F4F6; color: #4B5563; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  /* Sections */
  .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .section-title h3 { font-size: 18px; font-weight: 700; margin: 0; }
  .s-icon { width: 24px; height: 24px; }
  .blue-icon { color: #1877F2; font-size: 24px; font-weight: 800; }

  /* Clarity grid */
  .clarity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .a-stat-box { display: flex; flex-direction: column; gap: 4px; padding: 16px; background: #F9FAFB; border-radius: 8px; }
  .red-box { background: #FEF2F2; }
  .red-box-light { background: #FFFAFA; border: 1px solid #FEE2E2; }
  .a-label { font-size: 11px; font-weight: 700; color: #6B7280; letter-spacing: 0.05em; }
  .a-val { font-size: 24px; font-weight: 800; }
  .a-trend { font-size: 12px; font-weight: 600; }
  .a-trend.green { color: #10B981; }
  .a-trend.gray { color: #9CA3AF; }
  .red { color: #DC2626 !important; }
  .border-bottom-dashed { border-bottom: 1px dashed #E5E7EB; }
  .border-left-dashed { border-left: 1px dashed #E5E7EB; }

  /* GA circular */
  .circular-chart.small-circle { width: 120px; height: 120px; }
  .traffic-legend { display: flex; flex-wrap: wrap; gap: 16px; max-width: 300px; }
  .tl-row { display: flex; align-items: center; gap: 8px; width: 45%; }
  .dot { width: 12px; height: 12px; border-radius: 2px; }
  .dot.red { background: #F05139; }
  .dot.blue { background: #3B82F6; }
  .dot.green { background: #10B981; }
  .dot.purple { background: #8B5CF6; }
</style>
