<script lang="ts">
  import { Megaphone, Zap, Mail, MousePointerClick, Image as ImageIcon, Search } from 'lucide-svelte';

  const recentCampaigns = [
    { name: 'Spring Essentials Launch', sub: 'Fresh looks for a fresh season', audience: 'Main Newsletter', status: 'SENT', sent: '12,450 / 04-12', open: '32.4%', ctr: '12.1%' },
    { name: 'Spring Essentials Launch', sub: 'Fresh looks for a fresh season', audience: 'Main Newsletter', status: 'SENT', sent: '12,450 / 04-12', open: '32.4%', ctr: '12.1%' },
    { name: 'Spring Essentials Launch', sub: 'Fresh looks for a fresh season', audience: 'Main Newsletter', status: 'SENT', sent: '12,450 / 04-12', open: '32.4%', ctr: '12.1%' }
  ];
</script>

<div class="email-campaigns-container">
  
  <div class="flex-between mb-6">
    <div class="flex align-center gap-12">
      <h2 class="text-xl font-bold text-dark m-0">Email Campaign Builder</h2>
    </div>
    <div class="flex gap-12">
      <button class="btn-outline">Save Draft</button>
      <button class="btn-outline">Schedule Campaign</button>
      <button class="btn-primary">Send Now</button>
    </div>
  </div>
  <p class="text-muted text-sm mb-6 mt-n4">Create, schedule, and monitor promotional and transactional email campaigns.</p>

  <!-- Metrics Grid -->
  <div class="metrics-grid mb-8">
    <div class="metric-card">
      <div class="flex-between mb-4">
        <div class="metric-title">TOTAL CAMPAIGNS</div>
        <Megaphone size={16} class="text-primary" />
      </div>
      <div class="flex align-end gap-8">
        <div class="metric-value">248</div>
        <div class="text-green text-xs font-bold mb-1">+12%↗</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="flex-between mb-4">
        <div class="metric-title">ACTIVE CAMPAIGNS</div>
        <Zap size={16} class="text-blue" />
      </div>
      <div class="flex align-end gap-8">
        <div class="metric-value">14</div>
        <div class="text-muted text-xs mb-1">No change</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="flex-between mb-4">
        <div class="metric-title">AVG OPEN RATE</div>
        <Mail size={16} class="text-orange" />
      </div>
      <div class="flex align-end gap-8">
        <div class="metric-value">24.8%</div>
        <div class="text-green text-xs font-bold mb-1">+2.4%↗</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="flex-between mb-4">
        <div class="metric-title">CLICK RATE (CTR)</div>
        <MousePointerClick size={16} class="text-blue-light" />
      </div>
      <div class="flex align-end gap-8">
        <div class="metric-value">8.2%</div>
        <div class="text-red text-xs font-bold mb-1">-0.5%↘</div>
      </div>
    </div>
  </div>

  <!-- Builder Layout -->
  <div class="builder-grid mb-8">
    
    <!-- Left: Content -->
    <div class="builder-left">
      <div class="card mb-6 p-6">
        <h3 class="font-bold text-dark text-lg mb-6">Campaign Content</h3>
        
        <div class="form-group">
          <label>Campaign Name</label>
          <input type="text" value="Summer Flash Sale 2024" />
        </div>
        <div class="form-group">
          <label>Email Subject</label>
          <input type="text" placeholder="Something catchy..." />
        </div>
        <div class="form-group">
          <label>Preview Text</label>
          <textarea rows="3"></textarea>
        </div>
        <div class="form-group mb-0">
          <label>Sender Name</label>
          <input type="text" value="E-Store Marketing" />
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-bold text-dark text-lg mb-6">Audience Summary</h3>
        <div class="flex-between mb-2">
          <span class="text-muted text-sm">Total Recipients</span>
          <span class="font-bold text-dark">42,500</span>
        </div>
        <div class="progress-bar mb-6"><div class="fill red" style="width: 30%"></div></div>
        <div class="flex gap-12">
          <div class="audience-box">
            <span class="text-xs text-muted">New Customers</span>
            <span class="font-bold text-dark">12k</span>
          </div>
          <div class="audience-box">
            <span class="text-xs text-muted">Returning</span>
            <span class="font-bold text-dark">30k</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle: Preview -->
    <div class="card builder-middle p-0">
      <div class="preview-header flex-between p-4 border-bottom">
        <div class="device-toggles flex gap-4">
          <button class="device-btn active">Desktop</button>
          <button class="device-btn">Mobile</button>
        </div>
        <div class="flex gap-12 align-center">
          <span class="text-muted">↺ ↻</span>
          <button class="btn-outline-small text-primary border-primary">Send Test</button>
        </div>
      </div>
      
      <div class="preview-body p-6">
        <div class="email-mockup">
          <div class="email-logo">LOGO</div>
          <div class="email-hero-img flex-center">
            <div class="text-center">
              <ImageIcon size={32} class="text-muted mb-2 mx-auto" />
              <div class="font-bold text-dark">Hero Banner 1200x500</div>
            </div>
          </div>
          <h2 class="text-center font-bold text-dark text-2xl mb-4 mt-6">Summer Flash Sale Is Live!</h2>
          <p class="text-center text-muted mb-6">Get ready for the hottest deals of the season. Exclusive discounts for our loyal subscribers only.</p>
          
          <div class="flex gap-16 mb-8">
            <div class="product-mockup">
              <div class="pm-img flex-center"><ImageIcon size={24} class="text-muted" /></div>
              <div class="pm-line short"></div>
              <div class="pm-line"></div>
            </div>
            <div class="product-mockup">
              <div class="pm-img flex-center"><ImageIcon size={24} class="text-muted" /></div>
              <div class="pm-line short"></div>
              <div class="pm-line"></div>
            </div>
          </div>
          
          <button class="btn-primary w-full justify-center mb-8">SHOP THE SALE</button>
          
          <div class="text-center text-xs text-muted pb-8 border-top pt-6">
            <p class="mb-2">© 2024 E-Store Corp. All rights reserved.</p>
            <p class="mb-2">You are receiving this because you opted in at our website.</p>
            <a href="#" class="text-primary text-decoration-none">Unsubscribe</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Settings -->
    <div class="builder-right">
      <div class="card p-6 mb-6">
        <h3 class="font-bold text-dark text-lg mb-6">Campaign Settings</h3>
        
        <div class="form-group">
          <label>Target Audience</label>
          <select><option>Main Newsletter List</option></select>
        </div>
        <div class="form-group">
          <label>Segment</label>
          <div class="flex flex-wrap gap-8">
            <span class="pill red">US Region x</span>
            <span class="pill red">Active Purchasers x</span>
            <span class="pill outline">+ Add</span>
          </div>
        </div>
        
        <div class="form-group mt-6">
          <label>Delivery Time</label>
          <input type="text" placeholder="mm/dd/yyyy" class="mb-2" />
          <input type="text" placeholder="--:-- --" />
        </div>
        <div class="form-group">
          <label>Time Zone</label>
          <div class="text-sm text-muted">(GMT-08:00) Pacific Time</div>
        </div>
        
        <div class="flex-between mb-4">
          <span class="font-bold text-dark text-sm">A/B Testing</span>
          <div class="toggle-switch"></div>
        </div>
        <div class="flex-between">
          <span class="font-bold text-dark text-sm">UTM Tracking</span>
          <div class="toggle-switch"></div>
        </div>
      </div>

      <div class="card p-6 mb-6">
        <div class="font-bold text-dark text-sm mb-2">Bounce Rate</div>
        <div class="font-bold text-dark text-2xl mb-2">0.82%</div>
        <div class="progress-bar thin"><div class="fill red" style="width: 15%"></div></div>
      </div>

      <div class="card p-6">
        <div class="font-bold text-dark text-sm mb-2">Unsubscribes</div>
        <div class="font-bold text-dark text-2xl mb-2">0.05%</div>
        <div class="progress-bar thin"><div class="fill blue" style="width: 5%"></div></div>
      </div>
    </div>
  </div>

  <!-- Charts Row -->
  <div class="charts-grid mb-8">
    <div class="card p-6">
      <div class="flex-between mb-8">
        <h3 class="font-bold text-dark text-lg">Email Performance</h3>
        <span class="badge-gray">Last 30 Days</span>
      </div>
      <div class="bar-chart">
        <div class="bar-col"><div class="bar-fill" style="height: 40%"></div><span class="day">MON</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 60%"></div><span class="day">TUE</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 90%"></div><span class="day">WED</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 70%"></div><span class="day">THU</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 50%"></div><span class="day">FRI</span></div>
      </div>
    </div>
    <div class="card p-6 text-center">
      <h3 class="font-bold text-dark text-lg text-left mb-8">Campaign Status Distribution</h3>
      <div class="flex justify-center align-center h-full">
        <div class="donut-container flex gap-32 align-center">
          <div class="donut-chart relative">
            <svg viewBox="0 0 100 100" width="160" height="160" style="transform: rotate(-90deg)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FDE8E8" stroke-width="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F05139" stroke-width="12" stroke-dasharray="150 1000" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0EA5E9" stroke-width="12" stroke-dasharray="50 1000" stroke-dashoffset="-150" />
            </svg>
            <div class="absolute-center text-center">
              <div class="text-xs text-muted font-bold">TOTAL</div>
              <div class="text-3xl font-bold text-dark">248</div>
            </div>
          </div>
          <div class="legend text-left">
            <div class="flex-between gap-16 mb-4"><div class="flex align-center gap-8"><span class="dot red"></span><span class="text-dark">Sent</span></div><strong class="text-dark">142</strong></div>
            <div class="flex-between gap-16 mb-4"><div class="flex align-center gap-8"><span class="dot blue"></span><span class="text-dark">Scheduled</span></div><strong class="text-dark">48</strong></div>
            <div class="flex-between gap-16"><div class="flex align-center gap-8"><span class="dot pink"></span><span class="text-dark">Draft</span></div><strong class="text-dark">58</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Campaigns Table -->
  <div class="card mb-10">
    <div class="card-header border-bottom flex-between p-6">
      <h3 class="font-bold text-dark text-lg">Recent Campaigns</h3>
      <a href="#" class="text-primary text-sm font-bold text-decoration-none">View All Campaigns</a>
    </div>
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience</th>
            <th>Status</th>
            <th>Sent / Date</th>
            <th>Open Rate</th>
            <th>CTR</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each recentCampaigns as c}
            <tr>
              <td>
                <div class="font-bold text-dark text-sm">{c.name}</div>
                <div class="text-xs text-muted mt-1">Sub: {c.sub}</div>
              </td>
              <td class="text-dark text-sm">{c.audience}</td>
              <td><span class="badge-green-light">{c.status}</span></td>
              <td class="text-dark text-sm">{c.sent}</td>
              <td class="font-bold text-dark">{c.open}</td>
              <td class="font-bold text-dark">{c.ctr}</td>
              <td>
                <div class="flex gap-12 text-muted">✎ 📄 🗑</div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  /* Layout */
  .builder-grid { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 24px; }
  .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  
  /* Metrics Grid */
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .metric-card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; }
  .metric-title { font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .metric-value { font-size: 32px; font-weight: 800; color: #111827; }

  /* Cards */
  .card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; }
  .p-6 { padding: 24px; }
  .p-4 { padding: 16px; }
  .p-0 { padding: 0 !important; }
  .mb-6 { margin-bottom: 24px; }
  .mb-8 { margin-bottom: 32px; }
  .mb-10 { margin-bottom: 40px; }
  .mt-n4 { margin-top: -16px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  .border-top { border-top: 1px solid #F3F4F6; }

  /* Forms */
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; font-size: 11px; font-weight: 700; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }
  .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 14px; outline: none; }
  .form-group input:focus, .form-group textarea:focus { border-color: #F05139; }

  /* Buttons */
  .btn-primary { background: #F05139; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-outline { background: white; border: 1px solid #E5E7EB; color: #111827; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-outline-small { background: white; border: 1px solid #E5E7EB; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
  .border-primary { border-color: #F05139 !important; }
  
  .device-toggles { background: #F3F4F6; padding: 4px; border-radius: 8px; }
  .device-btn { background: none; border: none; padding: 6px 16px; font-size: 12px; font-weight: 600; color: #6B7280; border-radius: 6px; cursor: pointer; }
  .device-btn.active { background: #F05139; color: white; }

  /* Audience & Progress */
  .progress-bar { width: 100%; height: 8px; background: #F3F4F6; border-radius: 4px; overflow: hidden; }
  .progress-bar.thin { height: 4px; }
  .progress-bar .fill { height: 100%; border-radius: 4px; }
  .fill.red { background: #F05139; }
  .fill.blue { background: #0EA5E9; }

  .audience-box { flex: 1; background: #F9FAFB; padding: 12px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; }

  .pill { padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; cursor: pointer; }
  .pill.red { background: #FEE2E2; color: #991B1B; }
  .pill.outline { border: 1px dashed #D1D5DB; color: #6B7280; }

  .toggle-switch { width: 36px; height: 20px; background: #E5E7EB; border-radius: 10px; position: relative; }
  .toggle-switch::after { content: ''; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; }

  /* Email Mockup */
  .preview-body { background: #F9FAFB; display: flex; justify-content: center; }
  .email-mockup { width: 100%; max-width: 400px; background: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 8px; padding: 24px; }
  .email-logo { width: 80px; height: 30px; background: #F3F4F6; border-radius: 4px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #9CA3AF; }
  .email-hero-img { width: 100%; height: 160px; background: #F9FAFB; border: 2px dashed #E5E7EB; border-radius: 8px; }
  .product-mockup { flex: 1; border: 1px solid #F3F4F6; border-radius: 8px; padding: 12px; }
  .pm-img { width: 100%; height: 100px; background: #F9FAFB; border-radius: 4px; margin-bottom: 12px; }
  .pm-line { height: 8px; background: #F3F4F6; border-radius: 4px; margin-bottom: 8px; }
  .pm-line.short { width: 60%; }

  /* Charts */
  .bar-chart { display: flex; justify-content: space-between; align-items: flex-end; height: 200px; padding-top: 20px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; height: 100%; justify-content: flex-end; }
  .bar-fill { width: 32px; background: #FCA5A5; border-radius: 4px 4px 0 0; }
  .bar-col:nth-child(3) .bar-fill { background: #F05139; }
  .day { font-size: 11px; font-weight: 700; color: #9CA3AF; }

  .relative { position: relative; }
  .absolute-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot.red { background: #F05139; }
  .dot.blue { background: #0EA5E9; }
  .dot.pink { background: #FDE8E8; }

  /* Table */
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; }
  .data-table th, .data-table td { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  /* Utilities */
  .flex { display: flex; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .align-end { align-items: flex-end; }
  .flex-center { display: flex; justify-content: center; align-items: center; }
  .justify-center { justify-content: center; }
  .flex-wrap { flex-wrap: wrap; }
  .gap-32 { gap: 32px; }
  .gap-16 { gap: 16px; }
  .gap-12 { gap: 12px; }
  .gap-8 { gap: 8px; }
  .gap-4 { gap: 4px; }
  .h-full { height: 100%; }
  .w-full { width: 100%; }
  
  .font-bold { font-weight: 700; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  .text-green { color: #10B981; }
  .text-orange { color: #F59E0B; }
  .text-blue { color: #3B82F6; }
  .text-blue-light { color: #0EA5E9; }
  .text-red { color: #EF4444; }
  
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 18px; }
  .text-xl { font-size: 24px; }
  .text-2xl { font-size: 28px; }
  .text-3xl { font-size: 32px; }
  
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-decoration-none { text-decoration: none; }
  
  .m-0 { margin: 0; }
  .mb-1 { margin-bottom: 4px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
  .mt-1 { margin-top: 4px; }
  .mt-6 { margin-top: 24px; }
  .pt-6 { padding-top: 24px; }
  .pb-8 { padding-bottom: 32px; }
  .mx-auto { margin: 0 auto; }
</style>
