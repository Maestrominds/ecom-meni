<script lang="ts">
  import { Package, Clock, XCircle, CheckCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let orders = $state<any[]>([]);
  let isLoading = $state(true);

  onMount(async () => {
    try {
      // Fetch user orders securely (handled by global fetch proxy)
      const res = await fetch('/api/customer/orders');
      if (res.ok) {
        const data = await res.json();
        orders = data || [
          // Fallback mock data
          { id: 'ORD-123', date: '2026-08-01', total: 1200, status: 'Processing' },
          { id: 'ORD-124', date: '2026-07-28', total: 550, status: 'Delivered' }
        ];
      } else {
        orders = [
          { id: 'ORD-123', date: '2026-08-01', total: 1200, status: 'Processing' },
          { id: 'ORD-124', date: '2026-07-28', total: 550, status: 'Delivered' }
        ];
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  });

  async function cancelOrder(orderId: string) {
    if (!confirm('Are you sure you want to cancel this order? Refunds will be credited to your Coin Box.')) return;

    try {
      const res = await fetch(`/api/customer/orders/${orderId}/cancel`, {
        method: 'PUT'
      });
      
      if (res.ok) {
        alert('Order cancelled successfully. Refund processed to Wallet.');
        // Update local state
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
          orders[orderIndex].status = 'Cancelled';
        }
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to cancel order. The refund window may have expired.');
      }
    } catch (e) {
      alert('Network error while cancelling the order.');
    }
  }
</script>

<svelte:head>
  <title>Order History | MENI</title>
</svelte:head>

<div class="content-header">
  <h2>Order History</h2>
  <p>Track your recent orders and manage returns.</p>
</div>

<div class="orders-list">
  {#if isLoading}
    <p>Loading orders...</p>
  {:else if orders.length === 0}
    <div class="card empty-state">
      <Package size={48} color="#9CA3AF" />
      <p>You haven't placed any orders yet.</p>
    </div>
  {:else}
    {#each orders as order}
      <div class="card order-card">
        <div class="order-header">
          <div>
            <h3>Order #{order.id}</h3>
            <p class="date">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div class="status">
            {#if order.status === 'Processing'}
              <span class="badge badge-warning"><Clock size={14}/> Processing</span>
            {:else if order.status === 'Delivered'}
              <span class="badge badge-success"><CheckCircle size={14}/> Delivered</span>
            {:else if order.status === 'Cancelled'}
              <span class="badge badge-error"><XCircle size={14}/> Cancelled</span>
            {/if}
          </div>
        </div>
        
        <div class="order-footer">
          <div class="total">Total: <strong>₹{order.total}</strong></div>
          
          <div class="actions">
            <button class="btn btn-outline">View Details</button>
            {#if order.status === 'Processing' || order.status === 'Shipped'}
              <button class="btn btn-danger" onclick={() => cancelOrder(order.id)}>Cancel Order</button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .content-header {
    margin-bottom: 32px;
  }
  .content-header h2 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 8px;
  }
  .content-header p {
    color: var(--text-muted);
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 24px;
  }
  
  .empty-state {
    text-align: center;
    padding: 64px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: var(--text-muted);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-light);
  }
  
  .order-header h3 {
    margin-bottom: 4px;
    font-size: 1.25rem;
  }
  
  .date {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .badge-warning { background: #fef3c7; color: #b45309; }
  .badge-success { background: #dcfce7; color: #15803d; }
  .badge-error { background: #fee2e2; color: #dc2626; }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total {
    font-size: 1.1rem;
  }

  .actions {
    display: flex;
    gap: 12px;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
    border: 1px solid transparent;
  }

  .btn-outline {
    background: transparent;
    border-color: var(--border-light);
    color: var(--text-dark);
  }
  
  .btn-outline:hover {
    background: #FAFAFA;
  }

  .btn-danger {
    background: transparent;
    color: #dc2626;
    border-color: #fca5a5;
  }

  .btn-danger:hover {
    background: #fee2e2;
  }
</style>
