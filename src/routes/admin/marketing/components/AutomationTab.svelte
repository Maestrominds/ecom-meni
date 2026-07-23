<script lang="ts">
  import { Settings, Play, Pause, Download, ChevronDown, Mail, MessageSquare } from 'lucide-svelte';

  const activeWorkflows = [
    { name: 'High Value Cart Recovery', trigger: 'Cart > ₹10k', status: 'ACTIVE', rate: '24.2%', revenue: '₹1,84,300', modified: '2 hours ago' },
    { name: 'High Value Cart Recovery', trigger: 'Cart > ₹10k', status: 'ACTIVE', rate: '24.2%', revenue: '₹1,84,300', modified: '2 hours ago' },
    { name: 'High Value Cart Recovery', trigger: 'Cart > ₹10k', status: 'ACTIVE', rate: '24.2%', revenue: '₹1,84,300', modified: '2 hours ago' }
  ];
</script>

<div class="automation-container">
  
  <div class="flex-between mb-6">
    <div>
      <h2 class="text-xl font-bold text-dark m-0 mb-2">Abandoned Cart Workflow Builder</h2>
      <p class="text-muted text-sm m-0">Create automated recovery workflows for abandoned carts across multiple channels.</p>
    </div>
    <div class="flex gap-12">
      <button class="btn-outline">Save Draft</button>
      <button class="btn-outline text-primary border-primary">Publish Workflow</button>
      <button class="btn-primary">Create Workflow</button>
    </div>
  </div>

  <!-- Metrics Grid -->
  <div class="metrics-grid mb-8">
    <div class="metric-card">
      <div class="metric-title mb-2">ACTIVE WORKFLOWS</div>
      <div class="flex align-end gap-8">
        <div class="metric-value">12</div>
        <div class="text-blue text-xs font-bold mb-1">+2 this month</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title mb-2">RECOVERY RATE</div>
      <div class="flex align-end gap-8">
        <div class="metric-value">18.5%</div>
        <div class="text-blue text-xs font-bold mb-1">+3.2%</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title mb-2">RECOVERED REVENUE</div>
      <div class="flex align-end gap-8">
        <div class="metric-value">₹4,82,290</div>
        <div class="text-blue text-xs font-bold mb-1">+12.4%</div>
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-title mb-2">SENT TODAY</div>
      <div class="flex align-end gap-8">
        <div class="metric-value">1,248</div>
        <div class="text-red text-xs font-bold mb-1">-1.5%</div>
      </div>
    </div>
  </div>

  <!-- Builder Layout -->
  <div class="builder-grid mb-8">
    
    <!-- Left: Canvas -->
    <div class="card builder-left">
      <div class="card-header border-bottom flex-between p-4 bg-light">
        <div class="flex align-center gap-8 font-bold text-dark text-sm">
          <Settings size={16} class="text-primary" /> Workflow Canvas
        </div>
        <div class="flex align-center gap-8 text-sm text-muted">
          Zoom: 100% 
          <div class="flex gap-4">
            <button class="zoom-btn">-</button>
            <button class="zoom-btn">+</button>
          </div>
        </div>
      </div>
      
      <div class="canvas-body flex-center p-8">
        <div class="workflow-flow flex flex-col align-center gap-24 relative">
          
          <div class="flow-line absolute"></div>

          <div class="node trigger">
            <div class="node-icon bg-red-transparent"><Play size={20} class="text-white" /></div>
            <div>
              <div class="node-type">TRIGGER</div>
              <div class="node-title">Abandons Cart</div>
            </div>
          </div>

          <div class="node wait">
            <div class="node-icon bg-gray-transparent"><Pause size={20} class="text-dark" /></div>
            <div>
              <div class="node-type text-dark">WAIT</div>
              <div class="node-title text-dark">1 Hour</div>
            </div>
          </div>

          <div class="node action active">
            <div class="node-icon bg-green-transparent"><MessageSquare size={20} class="text-green" /></div>
            <div class="flex-1">
              <div class="node-type text-dark">ACTION</div>
              <div class="node-title text-dark">WhatsApp Msg</div>
            </div>
            <div class="node-actions text-primary">✎ 🗑</div>
          </div>

          <div class="node wait">
            <div class="node-icon bg-gray-transparent"><Pause size={20} class="text-dark" /></div>
            <div>
              <div class="node-type text-dark">WAIT</div>
              <div class="node-title text-dark">24 Hours</div>
            </div>
          </div>

          <div class="node action">
            <div class="node-icon bg-blue-transparent"><Mail size={20} class="text-blue" /></div>
            <div class="flex-1">
              <div class="node-type text-dark">ACTION</div>
              <div class="node-title text-dark">Email Reminder</div>
            </div>
            <div class="node-actions text-primary">✎ 🗑</div>
          </div>

          <button class="btn-primary-large mt-4 z-10">END WORKFLOW</button>
        </div>
      </div>
    </div>

    <!-- Right: Settings -->
    <div class="builder-right flex flex-col gap-24">
      
      <div class="card p-6">
        <h3 class="font-bold text-dark text-lg flex align-center gap-8 mb-6 pb-4 border-bottom">
          <Settings size={18} class="text-primary" /> Node Settings: WhatsApp
        </h3>
        
        <div class="form-group">
          <label>Trigger Conditions</label>
          <div class="input-wrapper relative">
            <select class="appearance-none"><option>Cart Value > ₹5,000</option></select>
            <ChevronDown size={16} class="input-icon text-muted" />
          </div>
        </div>

        <div class="form-group mt-6">
          <label>Wait Duration</label>
          <div class="flex gap-12">
            <input type="text" value="1" class="w-32" />
            <div class="input-wrapper relative flex-1">
              <select class="appearance-none"><option>Hours</option></select>
              <ChevronDown size={16} class="input-icon text-muted" />
            </div>
          </div>
        </div>

        <div class="form-group mt-6">
          <label>Communication Channel</label>
          <div class="channel-select bg-green-light text-dark font-medium flex align-center gap-8">
            <MessageSquare size={16} class="text-green" /> WhatsApp Business
          </div>
        </div>

        <div class="form-group mt-6">
          <label>Message Template</label>
          <div class="input-wrapper relative">
            <select class="appearance-none"><option>Abandoned Cart - Gentle Nudge</option></select>
            <ChevronDown size={16} class="input-icon text-muted" />
          </div>
        </div>

        <div class="form-group mt-6">
          <label>Audience Rules</label>
          <button class="btn-outline w-full justify-center border-dashed text-primary">+ Add Exclusion Rule</button>
        </div>
      </div>

      <div class="card p-6 flex-1">
        <div class="flex-between mb-4">
          <h3 class="font-bold text-dark text-sm">Message Preview</h3>
          <span class="badge-green-light">LIVE</span>
        </div>
        
        <div class="chat-bubble mb-6">
          <p class="mb-4">Hi Rahul! 👋 We noticed you left some items in your cart. They are selling fast!</p>
          <p class="mb-4">Use code RECOVER10 for an extra 10% off.</p>
          <p class="mb-2">Shop now: <a href="#" class="text-dark">shop.co/cart</a></p>
          <div class="text-right text-xs text-muted">12:45 PM</div>
        </div>
        
        <div class="flex gap-12 mt-auto">
          <button class="btn-outline flex-1 justify-center">EDIT</button>
          <button class="btn-primary flex-1 justify-center">TEST</button>
        </div>
      </div>

    </div>
  </div>

  <!-- Charts Row -->
  <div class="charts-grid mb-8">
    <div class="card p-6">
      <h3 class="font-bold text-dark text-lg mb-8">Recovery Performance (Last 30 Days)</h3>
      <div class="bar-chart">
        <div class="bar-col"><div class="bar-fill" style="height: 40%"></div><span class="day">MON</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 60%"></div><span class="day">TUE</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 90%"></div><span class="day">WED</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 70%"></div><span class="day">THU</span></div>
        <div class="bar-col"><div class="bar-fill" style="height: 50%"></div><span class="day">FRI</span></div>
      </div>
    </div>
    
    <div class="card p-6">
      <h3 class="font-bold text-dark text-lg mb-8">Recovery Channel Performance</h3>
      <div class="flex justify-center align-center h-full">
        <div class="donut-container flex gap-32 align-center">
          <div class="donut-chart relative">
            <svg viewBox="0 0 100 100" width="160" height="160" style="transform: rotate(-90deg)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FDE8E8" stroke-width="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F05139" stroke-width="12" stroke-dasharray="130 1000" />
            </svg>
            <div class="absolute-center text-center">
              <div class="text-2xl font-bold text-dark">18.5%</div>
              <div class="text-xs text-muted font-bold">OVERALL</div>
            </div>
          </div>
          <div class="legend text-left">
            <div class="flex align-center gap-8 mb-4"><span class="dot red"></span><span class="text-dark text-sm">WhatsApp (45%)</span></div>
            <div class="flex align-center gap-8 mb-4"><span class="dot blue"></span><span class="text-dark text-sm">Email (30%)</span></div>
            <div class="flex align-center gap-8 mb-4"><span class="dot gray"></span><span class="text-dark text-sm">SMS (15%)</span></div>
            <div class="flex align-center gap-8"><span class="dot brown"></span><span class="text-dark text-sm">Push (10%)</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Active Workflows Table -->
  <div class="card mb-10">
    <div class="card-header border-bottom flex-between p-6">
      <h3 class="font-bold text-dark text-lg">Active Recovery Workflows</h3>
      <div class="input-wrapper relative w-64">
        <input type="text" placeholder="Search workflows..." class="table-search" />
      </div>
    </div>
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>WORKFLOW NAME</th>
            <th>TRIGGER</th>
            <th>STATUS</th>
            <th>RECOVERY RATE</th>
            <th>REVENUE GENERATED</th>
            <th>LAST MODIFIED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {#each activeWorkflows as w}
            <tr>
              <td class="font-bold text-dark text-sm">{w.name}</td>
              <td class="text-muted text-sm">{w.trigger}</td>
              <td><span class="badge-green-light">{w.status}</span></td>
              <td class="text-dark text-sm">{w.rate}</td>
              <td class="font-bold text-dark">{w.revenue}</td>
              <td class="text-muted text-sm">{w.modified}</td>
              <td>
                <div class="flex gap-12 text-muted">✎ 🗑</div>
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
  .builder-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
  .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  
  /* Metrics Grid */
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .metric-card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px; }
  .metric-title { font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .metric-value { font-size: 32px; font-weight: 800; color: #111827; }

  /* Cards */
  .card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; }
  .p-6 { padding: 24px; }
  .p-4 { padding: 16px; }
  .p-8 { padding: 32px; }
  .pb-4 { padding-bottom: 16px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-8 { margin-bottom: 32px; }
  .mb-10 { margin-bottom: 40px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  .bg-light { background: #F9FAFB; }

  /* Buttons */
  .btn-primary { background: #F05139; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-primary-large { background: #F05139; color: white; border: none; padding: 16px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
  .btn-outline { display: flex; align-items: center; background: white; border: 1px solid #E5E7EB; color: #111827; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .border-primary { border-color: #F05139 !important; }
  .border-dashed { border-style: dashed; }
  .zoom-btn { background: white; border: 1px solid #E5E7EB; width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6B7280; font-weight: bold; }

  /* Workflow Canvas */
  .canvas-body { background: #FAFAFA; min-height: 500px; }
  .flow-line { width: 2px; background: #E5E7EB; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 1; }
  
  .node { background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px 16px; width: 300px; display: flex; align-items: center; gap: 16px; z-index: 2; position: relative; }
  .node.trigger { background: #F05139; color: white; border-color: #F05139; }
  .node.trigger .node-type { color: rgba(255,255,255,0.8); }
  .node.trigger .node-title { color: white; }
  .node.active { border: 2px solid #F05139; box-shadow: 0 4px 6px -1px rgba(240, 81, 57, 0.2); }
  
  .node-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .bg-red-transparent { background: rgba(255,255,255,0.2); }
  .bg-gray-transparent { background: #F3F4F6; }
  .bg-green-transparent { background: #ECFDF5; }
  .bg-blue-transparent { background: #E0F2FE; }
  
  .node-type { font-size: 11px; font-weight: 700; margin-bottom: 4px; }
  .node-title { font-size: 14px; font-weight: 700; }
  .node-actions { font-size: 16px; cursor: pointer; }

  /* Forms */
  .form-group label { display: block; font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 8px; }
  .form-group input, .form-group select { width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px; outline: none; background: white; }
  .input-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .appearance-none { -webkit-appearance: none; appearance: none; }
  .channel-select { padding: 12px 16px; border-radius: 8px; border: 1px solid #E5E7EB; }

  /* Chat Bubble */
  .chat-bubble { background: #F3F4F6; padding: 16px; border-radius: 12px 12px 12px 0; font-size: 14px; color: #111827; line-height: 1.5; max-width: 80%; }

  /* Charts */
  .bar-chart { display: flex; justify-content: space-between; align-items: flex-end; height: 200px; padding-top: 20px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; height: 100%; justify-content: flex-end; }
  .bar-fill { width: 32px; background: #FDBA74; border-radius: 4px 4px 0 0; }
  .bar-col:nth-child(3) .bar-fill { background: #F05139; }
  .day { font-size: 11px; font-weight: 700; color: #9CA3AF; }

  .relative { position: relative; }
  .absolute { position: absolute; }
  .absolute-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .z-10 { z-index: 10; }
  
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot.red { background: #F05139; }
  .dot.blue { background: #3B82F6; }
  .dot.gray { background: #6B7280; }
  .dot.brown { background: #78350F; }

  /* Table */
  .table-search { padding: 10px 16px !important; border: 1px solid #E5E7EB; border-radius: 8px; width: 100%; outline: none; }
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; }
  .data-table th, .data-table td { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  /* Utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .align-end { align-items: flex-end; }
  .flex-center { display: flex; justify-content: center; align-items: center; }
  .justify-center { justify-content: center; }
  .flex-1 { flex: 1; }
  .gap-32 { gap: 32px; }
  .gap-24 { gap: 24px; }
  .gap-12 { gap: 12px; }
  .gap-8 { gap: 8px; }
  .gap-4 { gap: 4px; }
  .h-full { height: 100%; }
  .w-full { width: 100%; }
  .w-32 { width: 80px !important; }
  .w-64 { width: 256px; }
  .mt-4 { margin-top: 16px; }
  .mt-6 { margin-top: 24px; }
  .mt-auto { margin-top: auto; }
  
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  .text-green { color: #10B981; }
  .bg-green-light { background: #ECFDF5; }
  .text-blue { color: #3B82F6; }
  .text-red { color: #EF4444; }
  
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 18px; }
  .text-xl { font-size: 24px; }
  .text-2xl { font-size: 28px; }
  
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .m-0 { margin: 0; }
  .mb-1 { margin-bottom: 4px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
</style>
