<script lang="ts">
  import { Users, DollarSign, Settings, Search, Edit } from 'lucide-svelte';

  // Mock data until API is fully wired
  let influencers = $state([
    { id: 1, name: 'BeautyByJane', code: 'JANE10', commission: 50, max_uses: 100, earned: 150, uses: 3, bank: 'jane@upi' },
    { id: 2, name: 'VlogMaster', code: 'VLOG15', commission: 100, max_uses: 100, earned: 1000, uses: 10, bank: 'vlog@upi' }
  ]);

  let pendingCommissions = $state([
    { id: 'c1', name: 'BeautyByJane', amount: 50, order: 'ORD-1234', date: '2026-08-01' },
    { id: 'c2', name: 'BeautyByJane', amount: 50, order: 'ORD-5678', date: '2026-08-02' }
  ]);

  let isSettling = $state(false);

  async function handleSettle(id: string) {
    isSettling = true;
    try {
      const res = await fetch(`/api/admin/commissions/${id}/settle`, { method: 'PUT' });
      if (res.ok) {
        pendingCommissions = pendingCommissions.filter(c => c.id !== id);
        alert('Payout Settled successfully via Cashfree!');
      } else {
        alert('Cannot settle yet. Refund window may still be active.');
      }
    } catch (e) {
      console.error(e);
      alert('Settlement failed.');
    } finally {
      isSettling = false;
    }
  }

  let showAddModal = $state(false);
  let newInfUser = $state('');
  let newInfComm = $state(50);
  let newInfMaxUses = $state(100);
  let newInfBank = $state('');
  let newInfUpi = $state('');

  function handleAddInfluencer() {
    if (!newInfUser) {
      alert("Please provide a User Email/ID.");
      return;
    }
    
    // Generate a mock code
    const mockCode = 'REF-' + Math.floor(Math.random()*10000);
    
    influencers = [...influencers, {
      id: Date.now(),
      name: newInfUser,
      code: mockCode,
      commission: newInfComm,
      max_uses: newInfMaxUses,
      earned: 0,
      uses: 0,
      bank: newInfBank || newInfUpi
    }];
    
    alert("Influencer added locally! (Waiting for backend API to save permanently)");
    showAddModal = false;
    newInfUser = '';
    newInfBank = '';
    newInfUpi = '';
  }
</script>

<svelte:head>
  <title>Admin | Referral Management</title>
</svelte:head>

<div class="dashboard-header">
  <div>
    <h1>Referral & Affiliate System</h1>
    <p>Manage influencers, set commission caps, and settle payouts.</p>
  </div>
  <button class="btn btn-primary" onclick={() => showAddModal = true}>
    <Users size={18} />
    <span>Add Influencer</span>
  </button>
</div>

<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-icon" style="background: #e0e7ff; color: #4338ca;">
      <Users size={24} />
    </div>
    <div class="metric-info">
      <p>Total Influencers</p>
      <h3>24</h3>
    </div>
  </div>
  <div class="metric-card">
    <div class="metric-icon" style="background: #dcfce7; color: #15803d;">
      <DollarSign size={24} />
    </div>
    <div class="metric-info">
      <p>Total Payouts (Settled)</p>
      <h3>₹12,450</h3>
    </div>
  </div>
  <div class="metric-card">
    <div class="metric-icon" style="background: #fef3c7; color: #b45309;">
      <Settings size={24} />
    </div>
    <div class="metric-info">
      <p>Pending Settlements</p>
      <h3>₹4,200</h3>
    </div>
  </div>
</div>

<div class="content-grid">
  <!-- Influencers Table -->
  <div class="card">
    <div class="card-header">
      <h2>Influencer Accounts</h2>
      <div class="search-bar">
        <Search size={16} />
        <input type="text" placeholder="Search by name or code..." />
      </div>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Coupon Code</th>
            <th>Commission / Max Uses</th>
            <th>Earned (Uses)</th>
            <th>Bank/UPI</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each influencers as inf}
            <tr>
              <td><strong>{inf.name}</strong></td>
              <td><span class="badge">{inf.code}</span></td>
              <td>₹{inf.commission} / {inf.max_uses} uses</td>
              <td>
                <div class="progress-bar">
                  <div class="fill" style="width: {(inf.uses/inf.max_uses)*100}%"></div>
                </div>
                <small>₹{inf.earned} ({inf.uses} uses)</small>
              </td>
              <td><code>{inf.bank}</code></td>
              <td>
                <button class="icon-btn"><Edit size={16} /></button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Pending Commissions Table -->
  <div class="card">
    <div class="card-header">
      <h2>Pending Payouts</h2>
      <p class="subtitle">Commissions waiting to clear the refund window.</p>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Influencer</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#if pendingCommissions.length === 0}
            <tr>
              <td colspan="4" style="text-align: center; color: #666;">No pending payouts.</td>
            </tr>
          {/if}
          {#each pendingCommissions as pc}
            <tr>
              <td>{pc.name}</td>
              <td>{pc.order}</td>
              <td><strong>₹{pc.amount}</strong></td>
              <td>
                <button class="btn btn-sm" onclick={() => handleSettle(pc.id)} disabled={isSettling}>
                  Settle via Cashfree
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

{#if showAddModal}
  <div class="modal-backdrop" onclick={() => showAddModal = false}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>Add New Influencer</h2>
        <button class="close-btn" onclick={() => showAddModal = false}>&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Existing User Email or ID</label>
          <input type="text" bind:value={newInfUser} placeholder="e.g. user@example.com" />
          <small style="color: #6B7280; font-size: 11px;">Must be an existing registered user.</small>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Commission Amount (₹)</label>
            <input type="number" bind:value={newInfComm} />
          </div>
          <div class="form-group">
            <label>Max Uses (User Limit)</label>
            <input type="number" bind:value={newInfMaxUses} />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Bank Account (Optional)</label>
            <input type="text" bind:value={newInfBank} placeholder="e.g. Acc: 1234..." />
          </div>
          <div class="form-group">
            <label>UPI ID (Optional)</label>
            <input type="text" bind:value={newInfUpi} placeholder="e.g. user@upi" />
          </div>
        </div>
        <button class="btn btn-primary w-full" style="margin-top: 16px; justify-content: center;" onclick={handleAddInfluencer}>
          Create Influencer
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: var(--transition-smooth);
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }
  
  .btn-primary:hover {
    background: var(--primary-hover);
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 0.85rem;
    background: #15803d;
    color: white;
  }
  
  .btn-sm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .metric-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .metric-info p {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    width: 100%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-light);
  }

  .modal-header h2 {
    font-size: 1.2rem;
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
  }

  .modal-body {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;
  }

  .form-row .form-group {
    flex: 1;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
  }

  .form-group input:focus {
    border-color: var(--primary);
  }

  .w-full { width: 100%; }

  .metric-info h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .content-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h2 {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-top: 4px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #FAFAFA;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--border-light);
  }

  .search-bar input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 0.9rem;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 16px 24px;
    text-align: left;
    border-bottom: 1px solid var(--border-light);
  }

  th {
    background: #FAFAFA;
    font-weight: 600;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .badge {
    background: var(--primary-light);
    color: var(--primary);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .progress-bar {
    height: 6px;
    background: var(--border-light);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .progress-bar .fill {
    height: 100%;
    background: var(--primary);
  }

  .icon-btn {
    padding: 8px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 4px;
  }

  .icon-btn:hover {
    background: #FAFAFA;
    color: var(--primary);
  }
</style>
