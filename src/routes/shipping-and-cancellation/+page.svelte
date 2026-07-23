<script lang="ts">
</script>

<svelte:head>
  <title>Shipping & Cancellation | MENI</title>
</svelte:head>

<div class="policy-page">
  <div class="page-header">
    <h1>Shipping & Cancellation</h1>
    <p>Last updated: July 23, 2026</p>
  </div>

  <div class="policy-content">
    <section>
      <h2>1. Shipping Policy</h2>
      <p>We strive to deliver your MENI wellness products as quickly and safely as possible. Please review our shipping practices below:</p>
      <ul>
        <li><strong>Processing Time:</strong> All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</li>
        <li><strong>Shipping Rates & Estimates:</strong> Shipping charges for your order will be calculated and displayed at checkout. We offer free standard shipping on all orders over ₹500.</li>
        <li><strong>Delivery Time:</strong> Standard delivery typically takes 3-5 business days within India. Express options are available at an additional cost.</li>
      </ul>
    </section>

    <section>
      <h2>2. Order Tracking</h2>
      <p>Once your order has shipped, you will receive a shipment confirmation email containing your tracking number(s). The tracking number will be active within 24 hours.</p>
    </section>

    <section>
      <h2>3. Cancellation Policy</h2>
      <p>We understand that circumstances may change. You may cancel your order under the following conditions:</p>
      <ul>
        <li>Orders can be cancelled free of charge if they have not yet been dispatched from our warehouse (typically within 4 hours of placing the order).</li>
        <li>To request a cancellation, please contact our support team immediately at support@meniwellness.com with your Order ID.</li>
        <li>If the order has already been shipped, it cannot be cancelled. You will need to initiate a return once the package arrives.</li>
      </ul>
    </section>
  </div>
</div>

<style>
  .policy-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 60px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border-light);
  }
  
  .page-header h1 {
    font-size: 3rem;
    font-family: var(--font-heading);
    margin-bottom: 12px;
    color: var(--text-dark);
  }
  
  .page-header p {
    color: var(--text-muted);
  }

  .policy-content section {
    margin-bottom: 40px;
  }

  .policy-content h2 {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    margin-bottom: 16px;
    color: var(--text-dark);
  }

  .policy-content p {
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 16px;
    font-size: 1.05rem;
  }

  .policy-content ul {
    margin-left: 24px;
    margin-bottom: 24px;
  }

  .policy-content li {
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 8px;
    font-size: 1.05rem;
  }
  
  .policy-content strong {
    color: var(--text-dark);
  }
</style>
