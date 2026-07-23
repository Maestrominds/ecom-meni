<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { X, ArrowRight, Check } from '@lucide/svelte';

  const questions = [
    {
      id: 'hair-type',
      title: 'What is your hair type?',
      options: ['Straight', 'Wavy', 'Curly', 'Coily']
    },
    {
      id: 'primary-concern',
      title: 'What is your primary hair concern?',
      options: ['Hair Fall & Thinning', 'Dryness & Frizz', 'Dandruff & Scalp Itchiness', 'Damaged Hair']
    },
    {
      id: 'scalp-type',
      title: 'How would you describe your scalp?',
      options: ['Oily', 'Dry', 'Normal / Balanced', 'Sensitive']
    }
  ];

  let selectedOption = $state('');

  function handleSelect(opt: string) {
    selectedOption = opt;
  }

  function handleNext() {
    if (!selectedOption) return;
    const currentQ = questions[store.quizStep];
    store.quizAnswers[currentQ.id] = selectedOption;
    selectedOption = '';
    store.quizStep += 1;
  }

  function handleAddRecommendation() {
    // Add customized package based on quiz
    store.addToCart({
      id: 'quiz-recommendation-kit',
      name: 'Custom Hair Growth Combo (Recommended)',
      price: 2499,
      image: '',
      category: 'Combos'
    });
    store.closeQuiz();
  }
</script>

{#if store.isQuizOpen}
  <div class="modal-backdrop" onclick={store.closeQuiz} role="presentation">
    <div class="modal-content" onclick={(e) => e.stopPropagation()} role="presentation">
      <button class="close-btn" onclick={store.closeQuiz}>
        <X size={20} />
      </button>

      {#if store.quizStep < questions.length}
        {@const q = questions[store.quizStep]}
        <div class="quiz-header">
          <span class="step-indicator">Step {store.quizStep + 1} of {questions.length}</span>
          <h2>{q.title}</h2>
        </div>

        <div class="quiz-options">
          {#each q.options as option}
            <button 
              class="option-card" 
              class:selected={selectedOption === option}
              onclick={() => handleSelect(option)}
            >
              <span>{option}</span>
              {#if selectedOption === option}
                <div class="check-icon"><Check size={14} /></div>
              {/if}
            </button>
          {/each}
        </div>

        <div class="quiz-footer">
          <button 
            class="next-btn" 
            disabled={!selectedOption} 
            onclick={handleNext}
          >
            <span>Next Question</span>
            <ArrowRight size={16} />
          </button>
        </div>
      {:else}
        <div class="success-view">
          <div class="success-icon">✨</div>
          <h2>Your Custom Hair Analysis is Ready!</h2>
          <p class="desc">
            Based on your answers, we recommend the <strong>Complete Hair Regrowth & Nourishment Kit</strong>.
            This clinically formulated bundle targets your specific concerns.
          </p>

          <div class="recommended-card">
            <div class="rec-info">
              <span class="badge">Highly Recommended</span>
              <h3>Custom Hair Growth Combo</h3>
              <p>Tailored 3-Step Regime</p>
              <div class="price-row">
                <span class="price">₹2,499</span>
                <span class="original">₹2,999</span>
                <span class="save">Save 16%</span>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="add-rec-btn" onclick={handleAddRecommendation}>
              Add Recommendation to Cart & View Cart
            </button>
            <button class="skip-btn" onclick={store.closeQuiz}>
              Browse Shop Instead
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-content {
    background: var(--white);
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    padding: 32px;
    position: relative;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: var(--text-muted);
    padding: 8px;
    border-radius: 50%;
  }
  .close-btn:hover {
    background: #f5f5f5;
    color: var(--text-dark);
  }

  .quiz-header {
    margin-bottom: 24px;
  }

  .step-indicator {
    font-size: 12px;
    color: var(--primary);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .quiz-header h2 {
    font-size: 24px;
    margin-top: 4px;
  }

  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  .option-card {
    display: flex;
    align-center: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 20px;
    border: 1.5px solid var(--border-light);
    border-radius: 12px;
    text-align: left;
    font-weight: 500;
    transition: var(--transition-smooth);
  }

  .option-card:hover {
    border-color: var(--primary);
    background: var(--primary-light);
  }

  .option-card.selected {
    border-color: var(--primary);
    background: var(--primary-light);
    color: var(--primary);
  }

  .check-icon {
    background: var(--primary);
    color: white;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quiz-footer {
    display: flex;
    justify-content: flex-end;
  }

  .next-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--primary);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 600;
  }

  .next-btn:disabled {
    background: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }

  .next-btn:not(:disabled):hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .success-view {
    text-align: center;
    padding: 10px 0;
  }

  .success-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .desc {
    color: var(--text-muted);
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 24px;
  }

  .recommended-card {
    background: var(--bg-cream);
    border: 1.5px dashed var(--primary);
    border-radius: 16px;
    padding: 20px;
    text-align: left;
    margin-bottom: 24px;
  }

  .badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 20px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .recommended-card h3 {
    font-size: 18px;
  }

  .recommended-card p {
    font-size: 13px;
    color: var(--text-muted);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: 12px;
  }

  .price {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary);
  }

  .original {
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: line-through;
  }

  .save {
    font-size: 12px;
    color: #2e7d32;
    background: #e8f5e9;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .add-rec-btn {
    background: var(--primary);
    color: white;
    padding: 14px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
  }

  .add-rec-btn:hover {
    background: var(--primary-hover);
  }

  .skip-btn {
    color: var(--text-muted);
    font-size: 14px;
    padding: 8px;
  }
  .skip-btn:hover {
    color: var(--text-dark);
  }
</style>
