<script lang="ts">
  import { Search, Download, MessageCircle, ChevronDown } from 'lucide-svelte';

  let { data } = $props();
  
  // Transform backend data to match the UI, or fallback if fields are missing
  let customers = $derived((data.customers || []).map((c: any) => ({
    id: c.id,
    initials: c.name ? c.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : '??',
    name: c.name || 'Unknown',
    email: c.email || 'No email',
    phone: c.phone || 'No phone',
    orders: c.total_orders || 0,
    spent: `₹${c.total_spent || 0}`,
    lastOrder: c.last_order_date || 'N/A',
    segment: c.total_orders > 5 ? 'High-value' : 'New'
  })));

  let searchTerm = $state('');
  
  let filteredCustomers = $derived.by(() => {
    if (searchTerm) {
      return customers.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      );
    }
    return customers;
  });

  let activeTopTab = $state('CUSTOMERS');
  let activeFilterTab = $state('All');

  const topTabs = ['CUSTOMERS', 'SUPPORT TICKET'];
  const filterTabs = [
    { name: 'All', count: 6 },
    { name: 'New', count: 1 },
    { name: 'Repeat', count: 2 },
    { name: 'High-value', count: 2 },
    { name: 'Inactive', count: 1 },
    { name: 'COD-only', count: 2 }
  ];
</script>

<svelte:head>
  <title>Admin | Customers</title>
</svelte:head>

<div class="customers-container">
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
    <div>
      <h1>Customers</h1>
      <p class="subtitle">{customers.length} customers</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <MessageCircle size={16} /> WhatsApp campaign
      </button>
      <button class="btn-outline">
        <Download size={16} /> Export CSV
      </button>
    </div>
  </div>

  <!-- Filter Pills -->
  <div class="filter-pills">
    {#each filterTabs as tab}
      <button 
        class="pill" 
        class:active={activeFilterTab === tab.name}
        onclick={() => activeFilterTab = tab.name}
      >
        {tab.name} <span class="pill-count">{tab.count}</span>
      </button>
    {/each}
  </div>

  <!-- Data Card -->
  <div class="card">
    <div class="filter-section">
      <div class="search-box">
        <Search size={18} class="text-muted" />
        <input type="text" placeholder="Search by name, email, phone..." bind:value={searchTerm} />
      </div>
      <div class="sort-section">
        <span class="text-muted text-sm">Sort:</span>
        <button class="dropdown-btn border-0">Last order <ChevronDown size={14} /></button>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>CUSTOMER</th>
            <th>PHONE</th>
            <th>ORDERS</th>
            <th>TOTAL SPENT</th>
            <th>LAST ORDER</th>
            <th>SEGMENT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each filteredCustomers as customer}
            <tr>
              <td>
                <div class="customer-cell">
                  <div class="avatar-black">{customer.initials}</div>
                  <div>
                    <div class="font-bold text-dark">{customer.name}</div>
                    <div class="text-muted text-xs mt-1">{customer.email}</div>
                  </div>
                </div>
              </td>
              <td class="text-muted text-sm">{customer.phone}</td>
              <td class="font-bold text-dark">{customer.orders}</td>
              <td class="font-bold text-dark">{customer.spent}</td>
              <td class="text-muted text-sm">
                {customer.lastOrder}
              </td>
              <td>
                {#if customer.segment === 'High-value'}
                  <span class="badge-green-light">{customer.segment}</span>
                {/if}
              </td>
              <td class="action-cell">
                <a href="#" class="action-link">View</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .customers-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

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
    align-items: center;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
    color: #111827;
  }

  .subtitle {
    color: #6B7280;
    font-size: 14px;
  }

  .header-actions {
    display: flex;
    gap: 12px;
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

  /* Filter Pills */
  .filter-pills {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }

  .pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pill-count {
    color: #9CA3AF;
  }

  .pill.active {
    background: #F05139;
    border-color: #F05139;
    color: white;
  }
  
  .pill.active .pill-count {
    color: #FFD2CC;
  }

  /* Card */
  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .filter-section {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F3F4F6;
  }

  .search-box {
    width: 400px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 0 16px;
    height: 40px;
  }

  .search-box input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    margin-left: 12px;
    font-size: 14px;
    color: #111827;
  }

  .sort-section {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    height: 40px;
  }
  
  .border-0 {
    border: none;
    padding: 0;
  }

  /* Table */
  .table-container {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    white-space: nowrap;
  }

  .data-table th, .data-table td {
    padding: 16px 20px;
    border-bottom: 1px solid #F3F4F6;
  }

  .data-table tr:last-child td {
    border-bottom: none;
  }

  .data-table th {
    color: #6B7280;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Cells */
  .customer-cell {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .avatar-black {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #111827;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
  }

  .font-bold { font-weight: 700; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 13px; }
  .mt-1 { margin-top: 4px; }

  .badge-green-light {
    background: #ECFDF5;
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
    font-size: 13px;
    text-decoration: none;
  }
</style>
