<script lang="ts">
  import { Search, Download, Plus, ChevronDown, Trash2 } from 'lucide-svelte';
  import { env } from '$env/dynamic/public';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const baseUrl = '/api';

  let products = $state(data.products ? data.products.map((p: any) => {
    const id = p.ID || p.id || '';
    const stock = p.Stock ?? p.stock ?? 0;
    const basePrice = parseFloat(p.BasePrice ?? p.base_price ?? p.Price ?? p.price) || 0;
    return {
      id,
      name: p.Name || p.name || 'Unnamed Product',
      category: p.Category || p.category || 'Uncategorized',
      price: `₹${basePrice.toFixed(0)}`,
      stock,
      status: stock > 0 ? 'In stock' : 'Out of stock',
      image: p.ImageUrl || p.image_url || p.image || null,
      sku: p.Sku || p.sku || ''
    };
  }) : []);

  let searchTerm = $state('');
  
  // Dynamic counts for subtitle
  let totalCount = $derived(products.length);
  let outOfStockCount = $derived(products.filter(p => p.status === 'Out of stock').length);

  let filteredProducts = $derived.by(() => {
    let list = products;
    // Apply tab filter
    if (activeTab !== 'All') {
      list = list.filter(p => p.status === activeTab);
    }
    // Apply search filter
    if (searchTerm) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  });

  let activeTab = $state('All');
  const tabs = ['All', 'In stock', 'Out of stock'];

  let deleteError = $state('');

  async function deleteProduct(id: number | string) {
    if (!id) {
      alert("Cannot delete: Missing product ID.");
      return;
    }
    if (!confirm("Are you sure you want to delete this product?")) return;
    deleteError = '';
    try {
      const res = await fetch(`${baseUrl}/admin/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        products = products.filter(p => p.id !== id);
        alert("Product deleted successfully!");
      } else {
        const body = await res.json().catch(() => ({}));
        deleteError = body.error || `Failed to delete (HTTP ${res.status})`;
        alert(deleteError);
      }
    } catch(e) {
      deleteError = 'Network error — backend may be offline.';
      alert(deleteError);
    }
  }
</script>

<svelte:head>
  <title>Admin | Products</title>
</svelte:head>

<div class="products-container">
  <!-- Header -->
  <div class="page-header">
    <div>
      <h1>Products</h1>
      <p class="subtitle">{totalCount} product{totalCount !== 1 ? 's' : ''}{outOfStockCount > 0 ? ` • ${outOfStockCount} out of stock` : ''}</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <Download size={16} /> Export
      </button>
      <a href="/admin/products/new" class="btn-primary" style="text-decoration: none;">
        <Plus size={16} /> Add product
      </a>
    </div>
  </div>

  <!-- Filter Pills -->
  <div class="filter-pills">
    {#each tabs as tab}
      <button 
        class="pill" 
        class:active={activeTab === tab}
        onclick={() => activeTab = tab}
      >
        {tab}
      </button>
    {/each}
  </div>

  <!-- Data Card -->
  <div class="card">
    <div class="filter-section">
      <div class="search-box">
        <Search size={18} class="text-muted" />
        <input type="text" placeholder="Search products, SKU..." bind:value={searchTerm} />
      </div>
      <button class="dropdown-btn">All categories <ChevronDown size={14} /></button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#if deleteError}
            <tr>
              <td colspan="7">
                <div class="error-banner">{deleteError}</div>
              </td>
            </tr>
          {/if}
          {#each filteredProducts as product}
            <tr>
              <td>
                <div class="product-cell">
                  {#if product.image}
                    <img src={product.image} alt={product.name} class="product-img" loading="lazy" decoding="async" />
                  {:else}
                    <div class="product-img product-img-placeholder"></div>
                  {/if}
                  <div>
                    <div class="font-bold text-dark">{product.name}</div>
                  </div>
                </div>
              </td>
              <td class="text-dark font-medium">{product.category}</td>
              <td class="font-bold text-dark">{product.price}</td>
              <td class="font-bold text-dark">{product.stock}</td>
              <td>
                {#if product.status === 'In stock'}
                  <span class="badge-active">{product.status}</span>
                {:else}
                  <span class="badge-outofstock">{product.status}</span>
                {/if}
              </td>
              <td class="action-cell">
                <div style="display: flex; gap: 12px; align-items: center;">
                  <a href="/admin/products/edit/{product.id}" class="action-link">Edit</a>
                  <button onclick={() => deleteProduct(product.id)} class="btn-text-small text-red" style="color: #dc2626; border: none; background: none; font-weight: 600; cursor: pointer;">Delete</button>
                </div>
              </td>
            </tr>
          {:else}
            {#if products.length === 0}
              <tr>
                <td colspan="7" class="empty-state">No products found. <a href="/admin/products/new" style="color:#F05139;">Add your first product</a>.</td>
              </tr>
            {:else}
              <tr>
                <td colspan="7" class="empty-state">No products match the current filter.</td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .products-container {
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

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F05139;
    color: white;
    border: none;
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

  .pill.active {
    background: #F05139;
    border-color: #F05139;
    color: white;
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
    gap: 16px;
    border-bottom: 1px solid #F3F4F6;
  }

  .search-box {
    flex: 1;
    display: flex;
    align-items: center;
    background: #F9FAFB;
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

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    height: 40px;
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
  .product-cell {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .product-img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
    background-color: var(--surface-light);
  }

  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .text-dark { color: #111827; }
  .text-muted { color: #9CA3AF; }
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 13px; }
  .mt-1 { margin-top: 4px; }

  .badge-active {
    background: #D1FAE5;
    color: #059669;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
  }

  .badge-lowstock {
    background: #FEF3C7;
    color: #D97706;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
  }

  .badge-outofstock {
    background: #FEE2E2;
    color: #DC2626;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
  }

  .product-img-placeholder {
    background: #F3F4F6;
    border: 1px dashed #D1D5DB;
  }

  .error-banner {
    background: #FEF2F2;
    border: 1px solid #FCA5A5;
    color: #DC2626;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    margin: 8px 20px;
  }

  .empty-state {
    text-align: center;
    color: #9CA3AF;
    font-size: 14px;
    padding: 40px 20px !important;
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
