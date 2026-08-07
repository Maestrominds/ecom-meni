<script lang="ts">
  import { Star, ChevronLeft, ChevronRight, UploadCloud, ChevronDown } from 'lucide-svelte';
  
  let { data } = $props();
  let reviews = $state(data.reviews || []);
  
  // Pagination State
  let currentPage = $state(1);
  const itemsPerPage = 20;
  
  let totalPages = $derived(Math.ceil(reviews.length / itemsPerPage));
  let paginatedReviews = $derived(reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  
  function prevPage() {
    if (currentPage > 1) currentPage--;
  }
  
  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  async function updateReviewStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/content/reviews/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updatedIndex = reviews.findIndex((r: any) => r.ID === id);
        if (updatedIndex > -1) {
          reviews[updatedIndex].Status = status;
        }
      } else {
        alert('Failed to update status');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating status');
    }
  }

  async function deleteReview(id: string) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/content/reviews/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        reviews = reviews.filter((r: any) => r.ID !== id);
        // adjust pagination if necessary
        if (currentPage > Math.ceil(reviews.length / itemsPerPage)) {
            currentPage = Math.max(1, currentPage - 1);
        }
      } else {
        alert('Failed to delete review');
      }
    } catch (e) {
      console.error(e);
      alert('Error deleting review');
    }
  }

  async function replyToReview(id: string) {
    const text = prompt('Enter your reply:');
    if (!text) return;
    try {
      const res = await fetch(`/api/admin/content/reviews/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply_text: text })
      });
      if (res.ok) {
        const updatedIndex = reviews.findIndex((r: any) => r.ID === id);
        if (updatedIndex > -1) {
          reviews[updatedIndex].ReplyText = { String: text, Valid: true };
        }
      } else {
        alert('Failed to send reply');
      }
    } catch (e) {
      console.error(e);
      alert('Error replying to review');
    }
  }
</script>

<div class="p-6">
  <div class="flex-between align-center mb-6">
    <div class="flex align-center gap-4">
        <a href="/admin/content" class="btn-outline-small text-decoration-none p-2 flex-center" aria-label="Back"><ChevronLeft size={16} /></a>
        <h1 class="text-2xl font-bold text-dark m-0">All Reviews ({reviews.length})</h1>
    </div>
  </div>

  <div class="card p-0">
    <div class="review-list">
      {#if reviews.length === 0}
        <div class="p-8 text-muted text-center">No reviews found.</div>
      {/if}
      {#each paginatedReviews as review}
        <div class="review-item border-bottom p-6">
          <div class="flex-between mb-2">
            <div>
              <div class="font-bold text-dark text-sm">Product ID: {review.ProductID}</div>
              <div class="text-xs text-muted">User: {review.UserID} • Status: {review.Status}</div>
            </div>
            <div class="flex text-yellow gap-2">
              {#each Array(5) as _, i}
                <Star size={14} fill={i < review.Rating ? "currentColor" : "none"} strokeWidth={i < review.Rating ? 0 : 1} class={i >= review.Rating ? "text-gray-300" : ""} />
              {/each}
            </div>
          </div>
          <p class="text-dark text-sm mb-4">{review.Comment?.String || ''}</p>
          {#if review.ReplyText?.String}
            <div class="text-sm bg-gray-50 p-3 rounded-md mb-4 border border-gray-100">
              <span class="font-bold text-xs text-gray-500 uppercase tracking-wider block mb-1">Admin Reply</span>
              {review.ReplyText.String}
            </div>
          {/if}
          <div class="flex gap-12">
            {#if review.Status !== 'APPROVED'}
              <button onclick={() => updateReviewStatus(review.ID, 'APPROVED')} class="btn-primary-small">Approve</button>
            {/if}
            <button onclick={() => replyToReview(review.ID)} class="btn-outline-small">Reply</button>
            {#if review.Status !== 'REJECTED'}
              <button onclick={() => updateReviewStatus(review.ID, 'REJECTED')} class="btn-text-small text-muted">Reject</button>
            {/if}
            <button onclick={() => deleteReview(review.ID)} class="btn-text-small text-red">Delete</button>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Pagination Controls -->
    {#if totalPages > 1}
      <div class="p-6 flex-between align-center border-top bg-gray-50">
        <span class="text-sm text-muted">Page {currentPage} of {totalPages}</span>
        <div class="flex gap-12">
            <button 
                class="btn-outline-small" 
                onclick={prevPage} 
                disabled={currentPage === 1}
                style="opacity: {currentPage === 1 ? 0.5 : 1};"
            >
                Previous
            </button>
            <button 
                class="btn-outline-small" 
                onclick={nextPage} 
                disabled={currentPage === totalPages}
                style="opacity: {currentPage === totalPages ? 0.5 : 1};"
            >
                Next
            </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .flex-between { display: flex; justify-content: space-between; }
  .align-center { align-items: center; }
  .flex { display: flex; }
  .gap-4 { gap: 16px; }
  .gap-2 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .p-6 { padding: 24px; }
  .p-2 { padding: 8px; }
  .p-8 { padding: 32px; }
  .m-0 { margin: 0; }
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-6 { margin-bottom: 24px; }
  .text-2xl { font-size: 1.5rem; }
  .font-bold { font-weight: 700; }
  .text-dark { color: #111827; }
  .text-muted { color: #6B7280; }
  .text-sm { font-size: 0.875rem; }
  .text-xs { font-size: 0.75rem; }
  .text-yellow { color: #F59E0B; }
  .text-gray-300 { color: #D1D5DB; }
  .text-gray-500 { color: #6B7280; }
  .text-red { color: #DC2626; }
  .uppercase { text-transform: uppercase; }
  .tracking-wider { letter-spacing: 0.05em; }
  .block { display: block; }
  .bg-gray-50 { background-color: #F9FAFB; }
  .rounded-md { border-radius: 0.375rem; }
  .border { border: 1px solid #E5E7EB; }
  .border-top { border-top: 1px solid #E5E7EB; }
  .border-bottom { border-bottom: 1px solid #E5E7EB; }
  .border-gray-100 { border-color: #F3F4F6; }
  .text-center { text-align: center; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .text-decoration-none { text-decoration: none; }
  
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .btn-primary-small {
    background: var(--primary);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    font-size: 0.875rem;
    cursor: pointer;
  }
  .btn-outline-small {
    background: white;
    color: #374151;
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #D1D5DB;
    font-size: 0.875rem;
    cursor: pointer;
  }
  .btn-text-small {
    background: none;
    border: none;
    padding: 6px 12px;
    font-size: 0.875rem;
    cursor: pointer;
  }
  .btn-text-small:hover { text-decoration: underline; }
</style>
