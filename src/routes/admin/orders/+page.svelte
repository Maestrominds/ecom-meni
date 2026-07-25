<script lang="ts">
  import { Search, Printer, Download, ChevronDown, SlidersHorizontal } from 'lucide-svelte';

  let { data } = $props();
  
  // Transform backend data to match the UI
  let orders = $derived((data.orders || []).map((o: any) => ({
    id: o.id || 'N/A',
    date: o.created_at ? new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
    customerName: o.customer_name || 'Unknown',
    customerEmail: o.customer_email || 'No email',
    items: o.total_items || 1,
    total: `₹${o.total_amount || 0}`,
    paymentStatus: o.payment_status || 'PENDING',
    paymentMethod: o.payment_method || 'Prepaid',
    fulfillment: o.status || 'UNFULFILLED',
    shipping: o.shipping_status || 'Pending',
    rtoStatus: o.rto_status || '—',
    rtoReason: o.rto_reason || '—',
    hasRestockBtn: o.status === 'RETURNED'
  })));

  let searchTerm = $state('');
  
  let filteredOrders = $derived(orders.filter(order => {
    return order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
  }));
</script>

<svelte:head>
  <title>Admin | Orders</title>
</svelte:head>

<div class="orders-container">
  <div class="page-header">
    <div>
      <h1>Orders</h1>
      <p class="subtitle">{orders.length} orders</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <Printer size={16} /> Print invoices
      </button>
      <button class="btn-outline">
        <Download size={16} /> Export CSV
      </button>
    </div>
  </div>

  <div class="card">
    <div class="filter-section">
      <div class="search-box">
        <Search size={18} class="text-muted" />
        <input type="text" placeholder="Search by order #, customer, email..." bind:value={searchTerm} />
      </div>
      
      <div class="dropdown-row">
        <button class="dropdown-btn">All status <ChevronDown size={14} /></button>
        <button class="dropdown-btn">All Payment <ChevronDown size={14} /></button>
        <button class="dropdown-btn">Last 30 days <ChevronDown size={14} /></button>
        <button class="dropdown-btn">RTO Orders <ChevronDown size={14} /></button>
        <button class="icon-btn-filter"><SlidersHorizontal size={14} /></button>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ORDER #</th>
            <th>DATE</th>
            <th>CUSTOMER</th>
            <th>ITEMS</th>
            <th>TOTAL</th>
            <th>PAYMENT</th>
            <th>FULFILLMENT</th>
            <th>SHIPPING</th>
            <th>RTO STATUS</th>
            <th>RTO REASON</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredOrders as order}
            <tr>
              <td class="font-bold text-primary">{order.id}</td>
              <td class="text-dark">{order.date}</td>
              <td>
                <div class="font-bold text-dark">{order.customerName}</div>
                <div class="text-muted text-xs">{order.customerEmail}</div>
              </td>
              <td class="text-dark">{order.items}</td>
              <td class="font-bold text-dark">{order.total}</td>
              <td>
                <div class="badge-paid">{order.paymentStatus}</div>
                <div class="text-muted text-xs text-center mt-1">{order.paymentMethod}</div>
              </td>
              <td>
                {#if order.fulfillment === 'UNFULFILLED'}
                  <span class="badge-outline-orange">{order.fulfillment}</span>
                {:else if order.fulfillment === 'RETURNED'}
                  <span class="badge-solid-gray">{order.fulfillment}</span>
                {/if}
              </td>
              <td class="text-dark">{order.shipping}</td>
              <td>
                {#if order.rtoStatus === '—'}
                  <span class="text-muted">—</span>
                {:else}
                  <span class="badge-outline-red">{order.rtoStatus}</span>
                {/if}
              </td>
              <td class="text-dark">{order.rtoReason}</td>
              <td>
                <div class="actions-wrapper">
                  <a href="#" class="text-primary font-bold action-link">Open</a>
                  {#if order.hasRestockBtn}
                    <button class="btn-restock">Restock Inventory</button>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="pagination-footer">
      <span class="text-muted text-sm">Showing 1 to {Math.min(5, orders.length)} of {orders.length} orders</span>
      <div class="pagination-controls">
        <button class="page-btn text-muted">Previous</button>
        <button class="page-btn active-page">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn text-muted">Next</button>
      </div>
    </div>
  </div>
</div>

<style>
  .orders-container {
    max-width: 1400px;
    margin: 0 auto;
    font-family: var(--font-body);
  }

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

  .btn-outline:hover {
    background: #F9FAFB;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .filter-section {
    padding: 20px;
    border-bottom: 1px solid #E5E7EB;
  }

  .search-box {
    display: flex;
    align-items: center;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 10px 16px;
    margin-bottom: 16px;
    background: #FFFFFF;
  }

  .search-box input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 12px;
    font-size: 14px;
    color: #111827;
  }

  .dropdown-row {
    display: flex;
    gap: 12px;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }

  .icon-btn-filter {
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

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
    border-bottom: 1px solid #E5E7EB;
  }

  .data-table th {
    color: #6B7280;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .font-bold { font-weight: 700; }
  .text-primary { color: #F05139; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 13px; }
  .mt-1 { margin-top: 4px; }
  .text-center { text-align: center; }

  /* Badges */
  .badge-paid {
    background: #D1FAE5;
    color: #059669;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }

  .badge-outline-orange {
    color: #D97706;
    border: 1px solid #FDE68A;
    background: #FFFBEB;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .badge-solid-gray {
    background: #F3F4F6;
    color: #4B5563;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .badge-outline-red {
    color: #DC2626;
    border: 1px solid #FECACA;
    background: #FEF2F2;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .action-link {
    text-decoration: none;
  }

  .btn-restock {
    background: #F05139;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .pagination-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
  }

  .pagination-controls {
    display: flex;
    gap: 8px;
  }

  .page-btn {
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }

  .active-page {
    border-color: #F05139;
    color: #F05139;
    font-weight: 600;
    background: #FEF2F2;
  }
</style>
