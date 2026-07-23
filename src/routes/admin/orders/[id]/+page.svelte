<script lang="ts">
  import { ArrowLeft, Mail, FileText, RotateCcw, Truck, Check } from 'lucide-svelte';

  const order = {
    id: 'MN-10421',
    date: 'Jun 5, 2026',
    paymentType: 'Prepaid',
    status: 'UNFULFILLED'
  };

  const items = [
    { name: 'Hair Fall Control Oil — 100ml', qty: 1, price: '₹599', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
    { name: 'Hair Fall Control Oil — 100ml', qty: 1, price: '₹599', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' }
  ];

  const timeline = [
    { title: 'Order placed', subtitle: 'Jun 5, 2026 • 10:24 AM', completed: true },
    { title: 'Payment captured', subtitle: 'Jun 5, 2026 • 10:24 AM', completed: true },
    { title: 'Order packed', subtitle: 'Jun 5, 2026 • 03:12 PM', completed: false },
    { title: 'Shipped via Delhivery', subtitle: 'Tracking AWB 38219204192', completed: false },
    { title: 'Delivered', subtitle: 'Pending', completed: false }
  ];
</script>

<svelte:head>
  <title>Admin | Order Details</title>
</svelte:head>

<div class="order-details-container">
  
  <a href="/admin/orders" class="back-link">
    <ArrowLeft size={16} /> Back to orders
  </a>

  <!-- Header -->
  <div class="page-header">
    <div>
      <h1>Order {order.id}</h1>
      <p class="subtitle">Placed on {order.date} • {order.paymentType}</p>
    </div>
    <div class="header-actions">
      <button class="btn-outline">
        <Mail size={16} /> Resend email
      </button>
      <button class="btn-outline">
        <FileText size={16} /> Invoice PDF
      </button>
      <button class="btn-outline">
        <RotateCcw size={16} /> Refund
      </button>
      <button class="btn-primary">
        <Truck size={16} /> Mark shipped
      </button>
    </div>
  </div>

  <div class="layout-grid">
    
    <!-- Left Column -->
    <div class="col-left">
      
      <!-- Items Card -->
      <div class="card mb-6">
        <div class="card-header flex-between border-bottom">
          <h3>Items</h3>
          <span class="badge-red-light">{order.status}</span>
        </div>
        
        <div class="items-list p-6">
          {#each items as item}
            <div class="item-row">
              <div class="flex gap-16">
                <div class="item-img" style="background-image: url('{item.image}')"></div>
                <div>
                  <div class="font-bold text-dark text-sm">{item.name}</div>
                  <div class="text-xs text-muted mt-1">Qty {item.qty}</div>
                </div>
              </div>
              <div class="font-bold text-dark text-sm">{item.price}</div>
            </div>
          {/each}
        </div>

        <div class="summary-section p-6 border-top">
          <div class="flex-between mb-4"><span class="text-muted text-sm">Subtotal</span><span class="font-medium text-dark text-sm">₹1,048</span></div>
          <div class="flex-between mb-4"><span class="text-muted text-sm">Shipping</span><span class="font-medium text-dark text-sm">₹49</span></div>
          <div class="flex-between mb-4"><span class="text-muted text-sm">Discount (WELCOME10)</span><span class="font-medium text-dark text-sm">-₹50</span></div>
          <div class="flex-between mb-6"><span class="text-muted text-sm">GST (18%)</span><span class="font-medium text-dark text-sm">₹189</span></div>
          
          <div class="flex-between total-row pt-4 border-top">
            <span class="font-bold text-dark text-lg">Total</span>
            <span class="font-bold text-dark text-lg">₹1,236</span>
          </div>
        </div>
      </div>

      <!-- Timeline Card -->
      <div class="card">
        <div class="card-header border-bottom">
          <h3>Timeline</h3>
        </div>
        <div class="p-6">
          <div class="timeline">
            {#each timeline as event, i}
              <div class="timeline-event" class:last={i === timeline.length - 1}>
                <div class="timeline-dot" class:completed={event.completed}></div>
                {#if i !== timeline.length - 1}
                  <div class="timeline-line"></div>
                {/if}
                <div class="timeline-content">
                  <div class="font-bold text-dark text-sm">{event.title}</div>
                  <div class="text-xs text-muted mt-1" class:italic={!event.completed && event.subtitle === 'Pending'}>{event.subtitle}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    </div>

    <!-- Right Column -->
    <div class="col-right">
      
      <!-- Customer Card -->
      <div class="card mb-6 p-6">
        <h3 class="mb-4 text-dark font-bold">Customer</h3>
        <div class="font-bold text-dark text-sm mb-1">Priya Sharma</div>
        <div class="text-muted text-sm mb-1">priya@gmail.com</div>
        <div class="text-muted text-sm mb-4">+91 98200 12345</div>
        <a href="#" class="text-primary font-medium text-sm text-decoration-none flex align-center gap-4">View profile <ArrowLeft size={14} style="transform: rotate(180deg);" /></a>
      </div>

      <!-- Shipping Address -->
      <div class="card mb-6 p-6">
        <h3 class="mb-4 text-dark font-bold">Shipping address</h3>
        <div class="text-dark text-sm mb-1">Priya Sharma</div>
        <div class="text-muted text-sm mb-1">42, Marine Drive Apartments</div>
        <div class="text-muted text-sm mb-1">Mumbai, Maharashtra 400020</div>
        <div class="text-muted text-sm">India</div>
      </div>

      <!-- Billing Address -->
      <div class="card mb-6 p-6">
        <h3 class="mb-4 text-dark font-bold">Billing address</h3>
        <div class="text-dark text-sm mb-1">Priya Sharma</div>
        <div class="text-muted text-sm mb-1">42, Marine Drive Apartments</div>
        <div class="text-muted text-sm mb-1">Mumbai, Maharashtra 400020</div>
        <div class="text-muted text-sm">India</div>
      </div>

      <!-- Payment -->
      <div class="card mb-6 p-6">
        <h3 class="mb-4 text-dark font-bold">Payment</h3>
        <div class="flex-between mb-4">
          <span class="text-muted text-sm">Method</span>
          <span class="font-bold text-dark text-sm">Prepaid</span>
        </div>
        <div class="flex-between mb-4">
          <span class="text-muted text-sm">Status</span>
          <span class="badge-green-light">PAID</span>
        </div>
        <div class="flex-between mb-6">
          <span class="text-muted text-sm">Txn ID</span>
          <span class="text-dark text-sm">rzp_F8d2...j41</span>
        </div>
        <button class="btn-outline w-full justify-center text-primary border-primary">Cancel order</button>
      </div>

      <!-- RTO Information -->
      <div class="card p-6">
        <h3 class="mb-4 text-dark font-bold flex align-center gap-8">
          <RotateCcw size={18} /> RTO Information
        </h3>
        <div class="flex-between mb-4">
          <span class="text-muted text-sm">RTO Status</span>
          <span class="text-primary font-bold text-sm">Initiated</span>
        </div>
        <div class="flex-between mb-4">
          <span class="text-muted text-sm">RTO Reason</span>
          <span class="font-bold text-dark text-sm">Customer Unavailable</span>
        </div>
        <div class="flex-between mb-4">
          <span class="text-muted text-sm">Returned Date</span>
          <span class="font-bold text-dark text-sm">Jun 8, 2026</span>
        </div>
        <div class="flex-between mb-6">
          <span class="text-muted text-sm">Inventory Updated</span>
          <span class="text-primary font-bold text-sm flex align-center gap-4"><RotateCcw size={12} /> Pending</span>
        </div>
        <button class="btn-outline w-full justify-center text-primary border-primary">Update Inventory</button>
      </div>

    </div>

  </div>
</div>

<style>
  .order-details-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
    padding-bottom: 40px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #6B7280;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    margin-bottom: 16px;
  }

  .back-link:hover { color: #111827; }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111827;
  }

  .subtitle {
    color: #6B7280;
    font-size: 14px;
  }

  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .btn-outline {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #E5E7EB;
    color: #4B5563;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .border-primary { border-color: #F05139 !important; }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F05139;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Grid */
  .layout-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-header { padding: 24px; }
  .border-bottom { border-bottom: 1px solid #F3F4F6; }
  .border-top { border-top: 1px solid #F3F4F6; }
  .p-6 { padding: 24px; }
  .pt-4 { padding-top: 16px; }
  .mb-6 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-1 { margin-bottom: 4px; }

  .card-header h3 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }
  h3 { font-size: 16px; margin: 0; }

  .badge-red-light { background: #FEF2F2; color: #DC2626; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }
  .badge-green-light { background: #ECFDF5; color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }

  /* Items */
  .item-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .item-row:last-child { margin-bottom: 0; }
  .item-img { width: 48px; height: 48px; border-radius: 6px; background-size: cover; background-position: center; border: 1px solid #E5E7EB; }

  /* Timeline */
  .timeline { position: relative; padding-left: 8px; }
  .timeline-event { position: relative; padding-left: 24px; margin-bottom: 32px; }
  .timeline-event.last { margin-bottom: 0; }
  .timeline-dot { position: absolute; left: 0; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: #E5E7EB; z-index: 2; }
  .timeline-dot.completed { background: #10B981; }
  .timeline-line { position: absolute; left: 4px; top: 14px; bottom: -32px; width: 2px; background: #E5E7EB; z-index: 1; }

  /* Utilities */
  .flex { display: flex; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .align-center { align-items: center; }
  .justify-center { justify-content: center; }
  .gap-16 { gap: 16px; }
  .gap-8 { gap: 8px; }
  .gap-4 { gap: 4px; }
  .w-full { width: 100%; }
  
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-primary { color: #F05139; }
  
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-lg { font-size: 18px; }
  .italic { font-style: italic; }
  .text-decoration-none { text-decoration: none; }
</style>
