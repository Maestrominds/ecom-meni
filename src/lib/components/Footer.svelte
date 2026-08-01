<script lang="ts">
  import { store } from '$lib/store.svelte';
  import companyLogo from '$lib/assets/company_logo.svg';

  function handleNav() {
    store.triggerLoading(600);
  }
</script>

<footer class="footer">
  <div class="container footer-grid">
    <!-- Brand / Logo Info Column -->
    <div class="footer-column brand-column">
      <div class="brand-logo-wrapper">
        <img src={companyLogo} alt="MENI" class="footer-logo-img" />
      </div>

      <!-- Custom Brand Social SVGs (Lucide-style vector paths) -->
      <div class="social-circles">
        <a href="#facebook" class="social-circle-btn" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="#instagram" class="social-circle-btn" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <a href="#youtube" class="social-circle-btn" aria-label="Youtube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
            <polygon points="10 15 15 12 10 9"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Quick Links Column -->
    <div class="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/" onclick={handleNav}>Home</a></li>
        <li><a href="/hair-wellness" onclick={handleNav}>Hair Wellness</a></li>
        <li><a href="/skin-wellness" onclick={handleNav}>Skin Wellness</a></li>
        <li><a href="/best-selling-combo" onclick={handleNav}>Best Selling Combo</a></li>
        <li><a href="/shop" onclick={handleNav}>Shop</a></li>
        <li><button onclick={() => store.openQuiz()}>Take Quiz</button></li>
      </ul>
    </div>

    <!-- Policies Column -->
    <div class="footer-column">
      <h4>Policies</h4>
      <ul>
        <li><a href="/terms-and-conditions" onclick={handleNav}>Terms & Conditions</a></li>
        <li><a href="/privacy-policy" onclick={handleNav}>Privacy Policy</a></li>
        <li><a href="/shipping-and-cancellation" onclick={handleNav}>Shipping & Cancellation</a></li>
        <li><a href="/return-and-refund" onclick={handleNav}>Return & Fund</a></li>
      </ul>
    </div>

    <!-- Information Column -->
    <div class="footer-column">
      <h4>Information</h4>
      <ul>
        <li><a href="/blog" onclick={handleNav}>Blogs</a></li>
        <li><a href="/policies" onclick={handleNav}>About Us</a></li>
        <li><a href="/contact-us" onclick={handleNav}>Contact Us</a></li>
      </ul>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #E55B3C;
    color: white;
    padding: 64px 0 80px 0;
    margin-top: 80px;
    font-family: var(--font-body);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .brand-column {
    gap: 24px;
  }

  .brand-logo-wrapper {
    display: flex;
    align-items: center;
  }

  .footer-logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  .social-circles {
    display: flex;
    gap: 12px;
  }

  .social-circle-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: var(--transition-smooth);
  }

  .social-circle-btn:hover {
    background: white;
    color: #E55B3C;
    border-color: white;
    transform: translateY(-2px);
  }

  .footer-column h4 {
    color: white;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .footer-column ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-column li, .footer-column a, .footer-column button {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
  }

  .footer-column a:hover, .footer-column button:hover {
    color: black;
    transform: translateX(2px);
  }

  .subscribe-column {
    gap: 16px;
  }

  .subscribe-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .subscribe-form input {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    padding: 12px 16px;
    color: white;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: var(--transition-smooth);
  }

  .subscribe-form input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .subscribe-form input:focus {
    background: rgba(255, 255, 255, 0.25);
    border-color: white;
  }

  .subscribe-btn {
    background: white;
    color: #E55B3C;
    padding: 12px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-align: center;
  }

  .subscribe-btn:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  @media (max-width: 992px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .brand-column, .subscribe-column {
      grid-column: span 2;
    }
  }

  @media (max-width: 576px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
    .brand-column, .subscribe-column {
      grid-column: span 1;
    }
  }
</style>
