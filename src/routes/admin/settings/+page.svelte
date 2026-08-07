<script lang="ts">
  import { Settings, Save, AlertTriangle } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let settings = $state({
    refunds_enabled: true,
    refund_window_days: 7
  });

  let isSaving = $state(false);
  let message = $state('');

  onMount(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        settings = await res.json();
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  });

  async function saveSettings(e: Event) {
    e.preventDefault();
    isSaving = true;
    message = '';

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (res.ok) {
        message = 'Settings saved successfully.';
      } else {
        message = 'Failed to save settings.';
      }
    } catch (e) {
      message = 'Network error.';
    } finally {
      isSaving = false;
    }
  }
</script>

<svelte:head>
  <title>Admin | Global Settings</title>
</svelte:head>

<div class="dashboard-header">
  <div>
    <h1>Global Settings</h1>
    <p>Manage store-wide configurations and policies.</p>
  </div>
</div>

<div class="settings-grid">
  <div class="card">
    <div class="card-header">
      <h2>Order & Refund Policies</h2>
    </div>
    
    <div class="card-body">
      {#if message}
        <div class="alert">
          <AlertTriangle size={16} />
          {message}
        </div>
      {/if}

      <form onsubmit={saveSettings}>
        <div class="form-group toggle-group">
          <div>
            <label for="refundsEnabled">Allow Customer Refunds</label>
            <span class="help-text">If disabled, customers cannot cancel orders from their dashboard.</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="refundsEnabled" bind:checked={settings.refunds_enabled}>
            <span class="slider round"></span>
          </label>
        </div>

        <div class="form-group">
          <label for="refundWindow">Refund Window (Days)</label>
          <span class="help-text">The number of days after purchase a customer can request a refund. Influencer payouts are locked during this window.</span>
          <input type="number" id="refundWindow" bind:value={settings.refund_window_days} min="0" max="30" />
        </div>

        <button type="submit" class="btn btn-primary" disabled={isSaving}>
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  .dashboard-header {
    margin-bottom: 32px;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 8px;
  }

  .dashboard-header p {
    color: var(--text-muted);
  }

  .settings-grid {
    max-width: 800px;
  }

  .card {
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    overflow: hidden;
  }

  .card-header {
    padding: 24px;
    border-bottom: 1px solid var(--border-light);
    background: #FAFAFA;
  }

  .card-header h2 {
    font-size: 1.25rem;
  }

  .card-body {
    padding: 32px;
  }

  .form-group {
    margin-bottom: 24px;
  }
  
  .toggle-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-light);
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-dark);
  }

  .help-text {
    display: block;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 8px;
    max-width: 500px;
    line-height: 1.4;
  }

  input[type="number"] {
    width: 200px;
    padding: 12px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 1rem;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }
  
  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .alert {
    background: #fef3c7;
    color: #b45309;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }

  /* Toggle Switch Styles */
  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 28px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #10b981;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #10b981;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
