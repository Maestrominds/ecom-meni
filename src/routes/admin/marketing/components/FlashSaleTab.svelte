<script lang="ts">
  import { Tag, Truck, Clock, ChevronDown, Calendar } from 'lucide-svelte';

  import { onMount, onDestroy } from 'svelte';

  import { getApiUrl } from '$lib/utils/apiUrl';

  let { data = {} } = $props();
  
  let countdown = $state(data?.endsIn || 'N/A');
  let timer: ReturnType<typeof setInterval>;

  let allProducts = $state<any[]>([]);
  let selectedProductId = $state('');
  let selectedProductName = $state('');
  let searchQuery = $state('');
  let showDropdown = $state(false);
  let salePrice = $state(399);
  let endTime = $state('');

  let flashSales = $derived(data?.flashSale?.list || []);

  onMount(async () => {
    // Fetch products for the dropdown
    try {
      const pRes = await fetch(`/api/public/products`);
      if (pRes.ok) {
        allProducts = await pRes.json();
      } else {
        alert("Failed to load products from server.");
      }
    } catch (e) {
      console.error("Failed to load products", e);
      alert("Error loading products.");
    }

    // If backend provides raw ISO date, parse it
    if (data?.end_time) {
      const endTimeDate = new Date(data.end_time).getTime();
      timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTimeDate - now;
        if (distance < 0) {
          countdown = 'EXPIRED';
          clearInterval(timer);
          return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdown = `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
      }, 1000);
    }
  });

  async function scheduleFlashSale() {
    if (!selectedProductId) {
      alert("Please select a product!");
      return;
    }
    try {
      // NOTE: The backend endpoint POST /admin/flash-sales does not exist yet!
      // This will return 404 until the backend developer creates the API.
      const res = await fetch(`/api/admin/flash-sales`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)admin_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
        },
        body: JSON.stringify({
          product_id: selectedProductId,
          sale_price: salePrice,
          end_time: endTime ? new Date(endTime).toISOString() : null
        })
      });
      if (res.ok) {
        alert("Flash sale scheduled successfully! Please refresh the page to see the updated countdown.");
        selectedProductId = '';
        selectedProductName = '';
        searchQuery = '';
      } else {
        const err = await res.json();
        alert(`Failed to schedule flash sale: ${err.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while scheduling the flash sale.");
    }
  }

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<!-- Metrics Cards -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-title"><Tag size={16} class="text-primary" /> ACTIVE COUPONS</div>
    <div class="metric-value">{data?.activeCount || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title"><Truck size={16} class="text-primary" /> FREE SHIPPING THRESHOLD</div>
    <div class="metric-value">₹{data?.freeShippingThreshold || 0}</div>
  </div>
  <div class="metric-card">
    <div class="metric-title"><Clock size={16} class="text-primary" /> FLASH SALE ENDS</div>
    <div class="metric-value">{countdown}</div>
  </div>
</div>

<!-- Content Grid -->
<div class="content-container">
  <div class="card flash-sale-card">
    <div class="card-header border-0">
      <h3>Flash sale / Countdown</h3>
    </div>
    
    <div class="form-body p-6 pt-0">
      <div class="form-group mb-6 relative">
        <label>PRODUCT</label>
        <div class="input-wrapper relative" style="display: flex; align-items: center; border: 1px solid #E5E7EB; border-radius: 8px; padding: 0 12px; background: white;">
          <input 
            type="text" 
            placeholder="Search products..." 
            bind:value={searchQuery}
            oninput={(e) => {
              if (selectedProductId && e.currentTarget.value !== selectedProductName) {
                selectedProductId = '';
                selectedProductName = '';
              }
            }}
            onfocus={() => showDropdown = true}
            onblur={() => setTimeout(() => showDropdown = false, 200)}
            style="width: 100%; border: none; padding: 12px 0; outline: none; background: transparent;"
          />
          <ChevronDown size={16} class="text-muted" style="pointer-events: none;" />
        </div>
        {#if showDropdown && !selectedProductId}
          <div class="product-dropdown">
            {#if allProducts.length === 0}
              <div class="p-3 text-muted text-sm text-center">Loading or no products...</div>
            {:else}
              {#each allProducts.filter(p => (p.name || p.Name || '').toLowerCase().includes(searchQuery.toLowerCase())) as prod}
                <button 
                  type="button" 
                  onmousedown={() => {
                    selectedProductId = prod.id || prod.ID;
                    selectedProductName = prod.name || prod.Name;
                    searchQuery = prod.name || prod.Name;
                  }}
                >
                  {prod.name || prod.Name}
                </button>
              {:else}
                <div class="p-3 text-muted text-sm text-center">No matching products found.</div>
              {/each}
            {/if}
          </div>
        {/if}
        {#if selectedProductId}
          <div class="text-sm mt-2 text-primary font-medium">
            ✓ Linked Product: {selectedProductName}
          </div>
        {/if}
      </div>
      
      <div class="form-row flex gap-24 mb-8">
        <div class="form-group flex-1">
          <label>SALE PRICE (₹)</label>
          <input type="number" bind:value={salePrice} class="bg-light" style="width: 100%; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; outline: none;" />
        </div>
        <div class="form-group flex-1">
          <label>ENDS AT</label>
          <div class="input-wrapper relative" style="display: flex; align-items: center; border: 1px solid #E5E7EB; border-radius: 8px; padding: 0 12px; background: white;">
            <input type="datetime-local" bind:value={endTime} style="width: 100%; border: none; padding: 12px 0; outline: none; background: transparent;" />
          </div>
        </div>
      </div>
      
      <button class="btn-primary-large" onclick={scheduleFlashSale}>Schedule flash sale</button>
    </div>
  </div>
</div>

<!-- Active Flash Sales Table -->
<div class="card mt-8">
  <div class="card-header border-bottom">
    <h3>Active & Upcoming Flash Sales</h3>
  </div>
  <div class="table-responsive">
    <table class="data-table">
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>SALE PRICE</th>
          <th>ENDS AT</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {#if flashSales.length > 0}
          {#each flashSales as fs}
            <tr>
              <td>
                <div class="font-medium text-dark">{fs.product_name || 'Product ' + fs.product_id.substring(0,6)}</div>
              </td>
              <td>₹{fs.sale_price}</td>
              <td>{new Date(fs.end_time).toLocaleString()}</td>
              <td>
                {#if new Date(fs.end_time) > new Date()}
                  <span class="badge-green-light">Active</span>
                {:else}
                  <span class="badge-gray">Expired</span>
                {/if}
              </td>
              <td>
                <button class="btn-text text-primary font-medium cursor-pointer" onclick={() => alert('Delete Flash Sale API coming soon!')}>Delete</button>
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="5" class="text-center text-muted" style="padding: 32px 0;">
              No flash sales found. (Waiting for Backend API update)
            </td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* Metrics Grid */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }

  .metric-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .metric-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .text-primary { color: #F05139; }

  .metric-value {
    font-size: 32px;
    font-weight: 800;
    color: #111827;
  }

  /* Content */
  .flash-sale-card {
    max-width: 800px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-0 { border: none !important; }
  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }

  /* Form */
  .p-6 { padding: 24px; }
  .pt-0 { padding-top: 0 !important; }
  .mb-6 { margin-bottom: 24px; }
  .mb-8 { margin-bottom: 32px; }

  .form-group label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #9CA3AF;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input-wrapper { position: relative; }
  .input-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  
  .form-group input {
    width: 100%;
    padding: 16px;
    border: 1px solid #F3F4F6;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    outline: none;
  }

  .bg-light { background: #F9FAFB !important; }
  .cursor-pointer { cursor: pointer; }

  .flex { display: flex; }
  .gap-24 { gap: 24px; }
  .flex-1 { flex: 1; }
  
  .text-muted { color: #9CA3AF; }

  .btn-primary-large {
    background: #F05139;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  .product-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 50;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .product-dropdown button {
    width: 100%;
    text-align: left;
    padding: 10px 16px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    font-size: 0.9rem;
    color: #111827;
  }

  .product-dropdown button:hover {
    background: #f9fafb;
    color: #F05139;
  }

  .mt-8 { margin-top: 32px; }
  .table-responsive { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
  .data-table th, .data-table td { padding: 24px; border-bottom: 1px solid #F3F4F6; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table th { color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

  .badge-gray { background: #E5E7EB; color: #111827; padding: 6px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  .font-medium { font-weight: 500; }
  .text-dark { color: #111827; }
  .text-center { text-align: center; }
  .btn-text { background: transparent; border: none; outline: none; }
</style>
