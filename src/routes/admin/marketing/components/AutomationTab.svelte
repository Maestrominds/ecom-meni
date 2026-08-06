<script lang="ts">
  import { Settings, Play, Pause, MessageSquare, Plus, Save, Activity, Zap, CheckCircle2 } from 'lucide-svelte';

  let { data = {} } = $props();
</script>

<div class="premium-container">
  
  <div class="header-section">
    <div>
      <h2 class="title"><Activity size={24} class="icon-sparkle" /> Abandoned Cart Recovery</h2>
      <p class="subtitle">Automated workflows to recover lost sales effortlessly.</p>
    </div>
    <div class="header-actions">
      <button class="btn-glass">Save Draft</button>
      <button class="btn-primary"><Zap size={16} /> Publish Workflow</button>
    </div>
  </div>

  <!-- Premium Metrics -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="m-label">ACTIVE WORKFLOWS</div>
      <div class="m-value">{data?.active || 0} <span class="m-sub text-blue">Live</span></div>
    </div>
    <div class="metric-card">
      <div class="m-label">RECOVERY RATE</div>
      <div class="m-value">{data?.recoveryRate || '0%'} <span class="m-sub text-green">Avg</span></div>
    </div>
    <div class="metric-card">
      <div class="m-label">RECOVERED REVENUE</div>
      <div class="m-value">₹{data?.recoveredRevenue || 0} <span class="m-sub text-purple">Total</span></div>
    </div>
    <div class="metric-card">
      <div class="m-label">MESSAGES SENT TODAY</div>
      <div class="m-value">{data?.sentToday || 0} <span class="m-sub text-orange">Today</span></div>
    </div>
  </div>

  <!-- Linear Workflow Builder -->
  <div class="builder-layout">
    
    <!-- Left: Step-by-step Flow -->
    <div class="flow-container glass-panel">
      <div class="panel-header">
        <h3>Workflow Timeline</h3>
        <span class="badge-active">Active</span>
      </div>
      
      <div class="timeline">
        
        <!-- Step 1 -->
        <div class="timeline-step">
          <div class="step-icon trigger"><Play size={20} /></div>
          <div class="step-content active-step">
            <div class="step-type">TRIGGER</div>
            <div class="step-title">Customer abandons cart</div>
            <div class="step-desc">Waits until a cart is idle for 30 minutes.</div>
          </div>
        </div>

        <div class="timeline-connector"></div>

        <!-- Step 2 -->
        <div class="timeline-step">
          <div class="step-icon delay"><Pause size={20} /></div>
          <div class="step-content">
            <div class="step-type">TIME DELAY</div>
            <div class="step-title">Wait 1 Hour</div>
            <div class="step-desc">Gives the customer time to return naturally.</div>
          </div>
        </div>

        <div class="timeline-connector"></div>

        <!-- Step 3 -->
        <div class="timeline-step">
          <div class="step-icon action"><MessageSquare size={20} /></div>
          <div class="step-content">
            <div class="step-type">ACTION</div>
            <div class="step-title">Send WhatsApp Message</div>
            <div class="step-desc">"Hi! You left something behind..."</div>
          </div>
        </div>

        <div class="timeline-connector"></div>

        <button class="add-step-btn">
          <div class="add-icon"><Plus size={18} /></div>
          <span>Add Next Step</span>
        </button>

      </div>
    </div>

    <!-- Right: Step Configuration -->
    <div class="settings-container glass-panel">
      <div class="panel-header">
        <h3><Settings size={18} /> Configure Trigger</h3>
      </div>
      
      <div class="settings-body">
        <div class="config-section">
          <h4>Trigger Settings</h4>
          
          <div class="form-group">
            <label>When should this fire?</label>
            <select class="premium-input">
              <option>Cart is abandoned</option>
              <option>User signs up</option>
              <option>Order is placed</option>
            </select>
          </div>

          <div class="form-group">
            <label>Minimum Cart Value (₹)</label>
            <input type="number" class="premium-input" value="500" />
          </div>
          
          <div class="form-group">
            <label>Exclude specific products?</label>
            <div class="pill-container">
              <span class="pill outline">Yes</span>
              <span class="pill filled">No</span>
            </div>
          </div>
        </div>

        <div class="save-footer">
          <button class="btn-primary w-full"><CheckCircle2 size={16} /> Save Trigger</button>
        </div>
      </div>
    </div>
  </div>

</div>

<style>
  /* Base & Premium Aesthetic */
  .premium-container { font-family: 'Inter', system-ui, sans-serif; color: #1f2937; }

  .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .title { font-size: 28px; font-weight: 800; margin: 0 0 8px 0; display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #10B981 0%, #34d399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .icon-sparkle { color: #10B981; }
  .subtitle { margin: 0; color: #6b7280; font-size: 15px; }

  .header-actions { display: flex; gap: 16px; }
  .btn-primary { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3); transition: all 0.2s ease; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); }
  
  .btn-glass { background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0,0,0,0.05); color: #374151; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.2s ease; }
  .btn-glass:hover { background: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

  .w-full { width: 100%; }

  /* Premium Metrics */
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
  .metric-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); border: 1px solid #f3f4f6; }
  .m-label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
  .m-value { font-size: 32px; font-weight: 800; color: #111827; display: flex; align-items: baseline; gap: 8px; }
  .m-sub { font-size: 13px; font-weight: 700; }
  .text-blue { color: #3b82f6; } .text-green { color: #10b981; } .text-purple { color: #8b5cf6; } .text-orange { color: #F05139; }

  /* Builder Layout */
  .builder-layout { display: grid; grid-template-columns: 3fr 2fr; gap: 32px; }
  .glass-panel { background: rgba(255, 255, 255, 0.9); border: 1px solid #ffffff; border-radius: 20px; padding: 32px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04); }
  
  .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; }
  .panel-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: #111827; display: flex; align-items: center; gap: 8px; }
  .badge-active { background: #ecfdf5; color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid #d1fae5; }

  /* Linear Timeline Flow */
  .timeline { display: flex; flex-direction: column; padding-left: 20px; }
  
  .timeline-step { display: flex; gap: 24px; align-items: flex-start; cursor: pointer; position: relative; }
  .timeline-step:hover .step-content { transform: translateX(4px); border-color: #d1d5db; }
  
  .step-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; flex-shrink: 0; position: relative; z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .step-icon.trigger { background: linear-gradient(135deg, #ef4444, #f87171); }
  .step-icon.delay { background: linear-gradient(135deg, #6b7280, #9ca3af); }
  .step-icon.action { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
  
  .step-content { flex: 1; background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; transition: all 0.2s; }
  .step-content.active-step { background: white; border-color: #3b82f6; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1); }
  
  .step-type { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .step-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 4px; }
  .step-desc { font-size: 13px; color: #6b7280; }
  
  .timeline-connector { width: 2px; height: 32px; background: #e5e7eb; margin-left: 21px; margin-top: -8px; margin-bottom: -8px; position: relative; z-index: 1; }
  
  .add-step-btn { display: flex; align-items: center; gap: 16px; background: transparent; border: none; padding: 0; margin-top: 16px; cursor: pointer; color: #6b7280; font-weight: 600; transition: color 0.2s; }
  .add-step-btn:hover { color: #10b981; }
  .add-icon { width: 44px; height: 44px; border-radius: 50%; background: #f3f4f6; border: 2px dashed #d1d5db; display: flex; justify-content: center; align-items: center; transition: all 0.2s; }
  .add-step-btn:hover .add-icon { border-color: #10b981; background: #ecfdf5; color: #10b981; }

  /* Settings Right Panel */
  .settings-body { display: flex; flex-direction: column; height: 100%; }
  .config-section h4 { margin: 0 0 20px 0; font-size: 14px; font-weight: 700; color: #374151; }
  
  .form-group { margin-bottom: 24px; }
  .form-group label { display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 8px; }
  .premium-input { width: 100%; padding: 14px 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 14px; color: #111827; outline: none; transition: all 0.2s; }
  .premium-input:focus { background: white; border-color: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
  
  .pill-container { display: flex; gap: 12px; }
  .pill { padding: 10px 24px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .pill.outline { border: 1px solid #d1d5db; color: #6b7280; background: white; }
  .pill.filled { background: #111827; color: white; border: 1px solid #111827; }
  
  .save-footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #f3f4f6; }
</style>
