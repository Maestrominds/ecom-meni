<script lang="ts">
  import { Megaphone, Zap, Mail, MousePointerClick, Image as ImageIcon, Sparkles, Send, LayoutTemplate } from 'lucide-svelte';
  import { env } from '$env/dynamic/public';

  let { data = {} } = $props();

  let templates = $derived(data?.templates || []);
  let recentCampaigns = $derived(data?.recent || []);

  let campaignName = $state('Summer Flash Sale 2024');
  let emailSubject = $state('Exclusive deals just for you! 🌟');
  let emailBody = $state('Get ready for the hottest deals of the season. Exclusive discounts for our loyal subscribers only.');
  let buttonText = $state('SHOP NOW');
  let buttonUrl = $state('https://meni.com/shop');
  let headerImageUrl = $state('');

  // Pagination State
  let currentPage = $state(1);
  const itemsPerPage = 5;
  let totalPages = $derived(Math.ceil(recentCampaigns.length / itemsPerPage) || 1);
  let paginatedCampaigns = $derived(recentCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
</script>

<div class="premium-container">
  
  <div class="header-section">
    <div>
      <h2 class="title"><Sparkles size={24} class="icon-sparkle" /> Email Campaign Studio</h2>
      <p class="subtitle">Design beautiful, high-converting emails in seconds.</p>
    </div>
    <div class="header-actions">
      <button class="btn-glass">Save Draft</button>
      <button class="btn-primary"><Send size={16} /> Send Campaign</button>
    </div>
  </div>

  <!-- Glassmorphism Metrics -->
  <div class="metrics-grid">
    <div class="metric-glass">
      <div class="metric-top">
        <span class="m-title">Live Campaigns</span>
        <div class="icon-circle bg-orange-soft"><Megaphone size={18} class="text-orange" /></div>
      </div>
      <div class="m-value">{data?.total || 0}</div>
      <div class="m-trend positive">↑ Active now</div>
    </div>
    <div class="metric-glass">
      <div class="metric-top">
        <span class="m-title">Running Automations</span>
        <div class="icon-circle bg-blue-soft"><Zap size={18} class="text-blue" /></div>
      </div>
      <div class="m-value">{data?.active || 0}</div>
      <div class="m-trend">In background</div>
    </div>
    <div class="metric-glass">
      <div class="metric-top">
        <span class="m-title">Avg Open Rate</span>
        <div class="icon-circle bg-green-soft"><Mail size={18} class="text-green" /></div>
      </div>
      <div class="m-value">{data?.avgOpenRate || '0%'}</div>
      <div class="m-trend positive">↑ Above industry avg</div>
    </div>
    <div class="metric-glass">
      <div class="metric-top">
        <span class="m-title">Click-Through Rate</span>
        <div class="icon-circle bg-purple-soft"><MousePointerClick size={18} class="text-purple" /></div>
      </div>
      <div class="m-value">{data?.clickRate || '0%'}</div>
      <div class="m-trend">Based on opens</div>
    </div>
  </div>

  <!-- Studio Layout (2 Columns) -->
  <div class="studio-layout">
    
    <!-- Left: Settings -->
    <div class="studio-settings">
      <div class="glass-card">
        <h3><LayoutTemplate size={20} /> Campaign Settings</h3>
        
        <div class="form-group">
          <label>Campaign Name</label>
          <input type="text" bind:value={campaignName} class="premium-input" />
        </div>
        <div class="form-group">
          <label>Subject Line</label>
          <input type="text" bind:value={emailSubject} class="premium-input" />
        </div>
        
        <div class="form-group">
          <label>Header Image URL</label>
          <input type="url" bind:value={headerImageUrl} class="premium-input" placeholder="https://example.com/image.jpg" />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Button Text</label>
            <input type="text" bind:value={buttonText} class="premium-input" />
          </div>
          <div class="form-group">
            <label>Button URL</label>
            <input type="url" bind:value={buttonUrl} class="premium-input" placeholder="https://" />
          </div>
        </div>

        <div class="form-group mb-0">
          <label>Email Message</label>
          <textarea rows="4" bind:value={emailBody} class="premium-input"></textarea>
        </div>
      </div>

      <div class="glass-card mt-6">
        <h3>Target Audience</h3>
        <div class="audience-stats">
          <div class="stat-box">
            <span class="s-label">Total Recipients</span>
            <span class="s-val">42,500</span>
          </div>
          <div class="stat-box">
            <span class="s-label">Estimated Open</span>
            <span class="s-val text-green">~8,500</span>
          </div>
        </div>
        <div class="progress-bar"><div class="fill gradient-fill" style="width: 30%"></div></div>
      </div>
    </div>

    <!-- Right: Live Preview -->
    <div class="studio-preview">
      <div class="preview-device">
        <div class="device-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">mail.google.com</div>
        </div>
        <div class="device-body">
          <div class="email-envelope">
            <div class="env-header">
              <div class="env-avatar">M</div>
              <div>
                <div class="env-sender">MENI <span class="env-email">&lt;hello@meni.com&gt;</span></div>
                <div class="env-subject">{emailSubject}</div>
              </div>
            </div>
            
            <div class="env-content">
              {#if headerImageUrl}
                <div class="hero-image" style="background-image: url({headerImageUrl}); background-size: cover; background-position: center;"></div>
              {:else}
                <div class="hero-image flex-center">
                  <ImageIcon size={40} class="text-white opacity-50" />
                </div>
              {/if}
              <h1 class="email-h1">{campaignName}</h1>
              <p class="email-p">{emailBody}</p>
              
              <button class="email-btn">{buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Campaigns Table -->
  <div class="glass-card mt-6" style="margin-bottom: 24px;">
    <div class="table-header flex-between mb-4">
      <h3><LayoutTemplate size={20} /> Recent Campaigns</h3>
    </div>
    
    <div class="table-responsive">
      <table class="premium-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience</th>
            <th>Status</th>
            <th>Sent / Date</th>
            <th>Open Rate</th>
            <th>CTR</th>
          </tr>
        </thead>
        <tbody>
          {#each paginatedCampaigns as campaign}
            <tr>
              <td>
                <div class="camp-name">{campaign.name}</div>
                <div class="camp-sub">{campaign.sub}</div>
              </td>
              <td>{campaign.audience}</td>
              <td>
                <span class="badge" class:bg-green-soft={campaign.status === 'SENT'} class:text-green={campaign.status === 'SENT'} class:bg-orange-soft={campaign.status === 'ACTIVE'} class:text-orange={campaign.status === 'ACTIVE'}>
                  {campaign.status}
                </span>
              </td>
              <td>{campaign.sent}</td>
              <td class="font-bold">{campaign.open}</td>
              <td class="font-bold">{campaign.ctr}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <div class="pagination-controls">
      <button class="btn-page" disabled={currentPage === 1} onclick={() => currentPage--}>Previous</button>
      <span class="page-info">Page {currentPage} of {totalPages}</span>
      <button class="btn-page" disabled={currentPage === totalPages} onclick={() => currentPage++}>Next</button>
    </div>
  </div>

</div>

<style>
  /* Base & Premium Aesthetic */
  .premium-container {
    font-family: 'Inter', system-ui, sans-serif;
    color: #1f2937;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .title {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #F05139 0%, #ff8a7a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .icon-sparkle { color: #F05139; }
  .subtitle { margin: 0; color: #6b7280; font-size: 15px; }

  .header-actions { display: flex; gap: 16px; }
  
  .btn-primary {
    background: linear-gradient(135deg, #F05139 0%, #e03e26 100%);
    color: white; border: none; padding: 12px 24px; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 4px 14px rgba(240, 81, 57, 0.3);
    transition: all 0.2s ease;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(240, 81, 57, 0.4); }
  
  .btn-glass {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0,0,0,0.05);
    color: #374151; padding: 12px 24px; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    backdrop-filter: blur(10px); transition: all 0.2s ease;
  }
  .btn-glass:hover { background: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

  /* Glassmorphism Metrics */
  .metrics-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px;
  }
  .metric-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .metric-glass:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }
  .metric-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .m-title { font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
  .icon-circle { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .bg-orange-soft { background: #fff0ed; } .text-orange { color: #F05139; }
  .bg-blue-soft { background: #eff6ff; } .text-blue { color: #3b82f6; }
  .bg-green-soft { background: #ecfdf5; } .text-green { color: #10b981; }
  .bg-purple-soft { background: #f5f3ff; } .text-purple { color: #8b5cf6; }
  .m-value { font-size: 36px; font-weight: 800; color: #111827; margin-bottom: 4px; }
  .m-trend { font-size: 12px; color: #9ca3af; font-weight: 600; }
  .m-trend.positive { color: #10b981; }

  /* Studio Layout */
  .studio-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
  }
  .glass-card h3 {
    margin: 0 0 24px 0; font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #111827;
  }

  .mt-6 { margin-top: 24px; }

  /* Premium Forms */
  .form-group { margin-bottom: 24px; }
  .form-group label { display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .premium-input {
    width: 100%; padding: 14px 16px;
    background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;
    font-size: 15px; color: #111827; outline: none; transition: all 0.2s;
  }
  .premium-input:focus {
    background: white; border-color: #F05139; box-shadow: 0 0 0 4px rgba(240, 81, 57, 0.1);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .mb-0 { margin-bottom: 0; }

  /* Audience Stats */
  .audience-stats { display: flex; gap: 24px; margin-bottom: 20px; }
  .stat-box { flex: 1; background: #f9fafb; border-radius: 12px; padding: 16px; }
  .s-label { display: block; font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
  .s-val { display: block; font-size: 20px; font-weight: 800; color: #111827; }
  
  .progress-bar { width: 100%; height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }
  .gradient-fill { height: 100%; background: linear-gradient(90deg, #F05139 0%, #ff8a7a 100%); border-radius: 4px; }

  /* Live Preview (MacBook-style frame) */
  .studio-preview { display: flex; justify-content: center; }
  .preview-device {
    width: 100%; max-width: 500px;
    background: white; border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid #e5e7eb;
    overflow: hidden;
    display: flex; flex-direction: column;
  }
  .device-header {
    background: #f9fafb; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 16px;
  }
  .browser-dots { display: flex; gap: 6px; }
  .browser-dots span { width: 10px; height: 10px; border-radius: 50%; background: #e5e7eb; }
  .browser-dots span:nth-child(1) { background: #ff5f56; }
  .browser-dots span:nth-child(2) { background: #ffbd2e; }
  .browser-dots span:nth-child(3) { background: #27c93f; }
  .browser-url { flex: 1; background: white; border-radius: 6px; padding: 4px 12px; font-size: 12px; color: #9ca3af; text-align: center; border: 1px solid #f3f4f6; }
  
  .device-body { background: white; flex: 1; padding: 0; }
  .env-header { padding: 16px 24px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 16px; }
  .env-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
  .env-sender { font-weight: 700; font-size: 14px; color: #111827; }
  .env-email { color: #6b7280; font-weight: 400; font-size: 12px; }
  .env-subject { font-size: 18px; font-weight: 700; color: #111827; margin-top: 4px; }
  
  .env-content { padding: 24px; }
  .hero-image { width: 100%; height: 200px; border-radius: 12px; background: linear-gradient(135deg, #F05139 0%, #ff8a7a 100%); margin-bottom: 24px; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .opacity-50 { opacity: 0.5; }
  
  .email-h1 { font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 12px 0; text-align: center; }
  .email-p { font-size: 15px; line-height: 1.6; color: #4b5563; text-align: center; margin: 0 0 24px 0; }
  
  .product-cards { display: flex; gap: 16px; margin-bottom: 24px; }
  .p-card { flex: 1; background: #f9fafb; border-radius: 8px; padding: 12px; border: 1px solid #f3f4f6; }
  .p-img { height: 100px; background: #e5e7eb; border-radius: 6px; margin-bottom: 12px; }
  .p-line { height: 8px; background: #d1d5db; border-radius: 4px; width: 60%; margin: 0 auto; }
  
  .email-btn { width: 100%; padding: 14px; background: #111827; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s; }
  .email-btn:hover { background: #374151; }
  
  /* Table Styles */
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .mb-4 { margin-bottom: 16px; }
  .text-primary { color: #F05139; text-decoration: none; }
  .text-sm { font-size: 14px; }
  .font-bold { font-weight: 700; }
  
  .table-responsive { overflow-x: auto; }
  .premium-table { width: 100%; border-collapse: collapse; text-align: left; }
  .premium-table th { padding: 16px; font-size: 12px; font-weight: 700; color: #6b7280; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; }
  .premium-table td { padding: 16px; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6; }
  .premium-table tr:hover td { background: #f9fafb; }
  .camp-name { font-weight: 700; color: #111827; }
  .camp-sub { font-size: 12px; color: #6b7280; margin-top: 4px; }
  .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-block; }
  
  /* Pagination Styles */
  .pagination-controls { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; margin-top: 16px; border-top: 1px solid #e5e7eb; }
  .btn-page { background: white; border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 14px; font-size: 13px; font-weight: 600; color: #374151; cursor: pointer; transition: all 0.2s; }
  .btn-page:hover:not(:disabled) { background: #f9fafb; border-color: #9ca3af; }
  .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }
  .page-info { font-size: 13px; color: #6b7280; font-weight: 600; }
</style>
