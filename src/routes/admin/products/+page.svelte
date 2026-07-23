<script lang="ts">
  import { Search, Download, Plus, ChevronDown } from 'lucide-svelte';

  const products = [
    { 
      id: 1, 
      name: 'Hair Fall Control Oil', 
      variants: '2 variants', 
      sku: 'MN-HFO-100', 
      category: 'Hair Care', 
      price: '₹599', 
      stock: 142, 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop'
    },
    { 
      id: 2, 
      name: 'Hair Fall Control Oil', 
      variants: '2 variants', 
      sku: 'MN-HFO-100', 
      category: 'Hair Care', 
      price: '₹599', 
      stock: 142, 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop'
    },
    { 
      id: 3, 
      name: 'Hair Fall Control Oil', 
      variants: '2 variants', 
      sku: 'MN-HFO-100', 
      category: 'Hair Care', 
      price: '₹599', 
      stock: 142, 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop'
    },
    { 
      id: 4, 
      name: 'Hair Fall Control Oil', 
      variants: '2 variants', 
      sku: 'MN-HFO-100', 
      category: 'Hair Care', 
      price: '₹599', 
      stock: 142, 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop'
    },
    { 
      id: 5, 
      name: 'Hair Fall Control Oil', 
      variants: '2 variants', 
      sku: 'MN-HFO-100', 
      category: 'Hair Care', 
      price: '₹599', 
      stock: 142, 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop'
    }
  ];

  let searchTerm = $state('');
  
  let filteredProducts = $derived.by(() => {
    if (searchTerm) {
      return products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return products;
  });

  let activeTab = $state('All');
  const tabs = ['All', 'Active', 'Draft', 'Low stock', 'Out of stock'];
</script>

<svelte:head>
  <title>Admin | Products</title>
</svelte:head>

<div class="products-container">
  <!-- Header -->
  <div class="page-header">
    <div>
      <h1>Products</h1>
      <p class="subtitle">6 products • 3 low stock</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <Download size={16} /> Export
      </button>
      <button class="btn-primary">
        <Plus size={16} /> Add product
      </button>
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
            <th>SKU</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each filteredProducts as product}
            <tr>
              <td>
                <div class="product-cell">
                  <div class="product-img" style="background-image: url('{product.image}')"></div>
                  <div>
                    <div class="font-bold text-dark">{product.name}</div>
                    <div class="text-muted text-xs mt-1">{product.variants}</div>
                  </div>
                </div>
              </td>
              <td class="text-muted text-sm">{product.sku}</td>
              <td class="text-dark font-medium">{product.category}</td>
              <td class="font-bold text-dark">{product.price}</td>
              <td class="font-bold text-dark">{product.stock}</td>
              <td>
                {#if product.status === 'Active'}
                  <span class="badge-active">{product.status}</span>
                {/if}
              </td>
              <td class="action-cell">
                <a href="/admin/products/{product.id}" class="action-link">Edit</a>
              </td>
            </tr>
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
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
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
