<script lang="ts">
  import { Mail, Phone, MapPin, Send } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Contact Us | MENI</title>
</svelte:head>

<div class="contact-page">
  <div class="page-header">
    <h1>Contact Us</h1>
    <p>Have questions about our products or your order? We're here to help.</p>
  </div>

  <div class="contact-layout">
    <div class="contact-info">
      <h2>Get in Touch</h2>
      <p class="subtitle">Reach out to our customer support team for any inquiries.</p>
      
      <div class="info-card">
        <div class="icon-wrapper"><Mail size={24} /></div>
        <div class="info-content">
          <h3>Email Support</h3>
          <p>support@meniwellness.com</p>
          <span class="text-sm">We aim to reply within 24 hours.</span>
        </div>
      </div>
      
      <div class="info-card">
        <div class="icon-wrapper"><Phone size={24} /></div>
        <div class="info-content">
          <h3>Phone Support</h3>
          <p>+91 1800 123 4567</p>
          <span class="text-sm">Mon-Fri from 9am to 6pm (IST).</span>
        </div>
      </div>
      
      <div class="info-card">
        <div class="icon-wrapper"><MapPin size={24} /></div>
        <div class="info-content">
          <h3>Headquarters</h3>
          <p>123 Wellness Avenue<br>Bangalore, Karnataka 560001<br>India</p>
        </div>
      </div>
    </div>
    
    <div class="contact-form-card">
      <h2>Send a Message</h2>
      <form class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="Jane" required />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Doe" required />
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="jane@example.com" required />
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <select id="subject" required>
            <option value="" disabled selected>Select a subject</option>
            <option value="order">Order Inquiry</option>
            <option value="product">Product Information</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" rows="5" placeholder="How can we help you?" required></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary">
          <Send size={18} />
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  .contact-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .page-header h1 {
    font-size: 3rem;
    font-family: var(--font-heading);
    margin-bottom: 16px;
    color: var(--text-dark);
  }
  
  .page-header p {
    font-size: 1.15rem;
    color: var(--text-muted);
  }

  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 60px;
    align-items: start;
  }

  .contact-info h2 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 40px;
  }

  .info-card {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    background: var(--primary-light);
    color: var(--primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .info-content h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .info-content p {
    color: var(--text-dark);
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 4px;
  }

  .text-sm {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .contact-form-card {
    background: white;
    padding: 40px;
    border-radius: 24px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-light);
  }

  .contact-form-card h2 {
    font-size: 1.8rem;
    font-family: var(--font-heading);
    margin-bottom: 32px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  input, select, textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 1rem;
    transition: var(--transition-smooth);
    background: #FAFAFA;
    font-family: var(--font-body);
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
    padding: 16px 32px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: var(--transition-smooth);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }

  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    .contact-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
</style>
