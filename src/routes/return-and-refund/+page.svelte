<script lang="ts">
</script>

<svelte:head>
  <title>Return & Refund Policy | MENI</title>
</svelte:head>

<div class="policy-page">
  <div class="page-header">
    <h1>Return & Refund Policy</h1>
    <p>Last updated: July 23, 2026</p>
  </div>

  <div class="policy-content">
    <section>
      <h2>1. Returns</h2>
      <p>We stand behind the quality of our wellness products. If you are not entirely satisfied with your purchase, we're here to help.</p>
      <ul>
        <li>You have 14 calendar days to return an item from the date you received it.</li>
        <li>To be eligible for a return, your item must be unused, sealed, and in the same condition that you received it.</li>
        <li>Your item must be in the original packaging.</li>
        <li>Your item needs to have the receipt or proof of purchase.</li>
      </ul>
    </section>

    <section>
      <h2>2. Refunds</h2>
      <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
      <p>If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies (typically 5-7 business days).</p>
    </section>

    <section>
      <h2>3. Shipping for Returns</h2>
      <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
    </section>
    
    <section>
      <h2>4. Damaged or Defective Items</h2>
      <p>If you received a damaged or defective product, please contact us immediately at support@meniwellness.com with photos of the product and packaging. We will expedite a replacement or full refund at no additional cost to you.</p>
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
</style>
