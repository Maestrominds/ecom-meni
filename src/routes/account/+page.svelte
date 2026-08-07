<script lang="ts">
  import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-svelte';

  // Mock user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'March 2026'
  };
</script>

<svelte:head>
  <title>My Account | MENI</title>
</svelte:head>

<div class="account-page">
  <aside class="sidebar">
    <div class="profile-card">
      <div class="avatar">
        {user.name.charAt(0)}
      </div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>

    <nav class="account-nav">
      <a href="/account" class="nav-item active">
        <User size={18} />
        <span>Profile Information</span>
      </a>
      <a href="/account/orders" class="nav-item">
        <ShoppingBag size={18} />
        <span>Order History</span>
      </a>
      <a href="/wishlist" class="nav-item">
        <Heart size={18} />
        <span>Wishlist</span>
      </a>
      <a href="/account/wallet" class="nav-item">
        <Settings size={18} />
        <span>Wallet & Referrals</span>
      </a>
      <a href="/account/settings" class="nav-item">
        <Settings size={18} />
        <span>Settings</span>
      </a>
      <button class="nav-item logout">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </nav>
  </aside>

  <main class="main-content">
    <div class="content-header">
      <h2>Profile Information</h2>
      <p>Manage your account details and preferences.</p>
    </div>

    <div class="card">
      <form class="profile-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" value={user.name} />
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" value={user.email} readonly />
          <span class="hint">To change your email, please contact support.</span>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" />
        </div>

        <button type="button" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  </main>
</div>

<style>
  .account-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 24px 100px;
    font-family: var(--font-body);
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
  }

  .sidebar {
    position: sticky;
    top: 100px;
    align-self: start;
  }

  .profile-card {
    background: #FAFAFA;
    padding: 32px 24px;
    border-radius: 16px;
    border: 1px solid var(--border-light);
    text-align: center;
    margin-bottom: 24px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--primary-light);
    color: var(--primary);
    font-size: 2rem;
    font-weight: 700;
    font-family: var(--font-heading);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }

  .profile-card h3 {
    font-size: 1.2rem;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  .profile-card p {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .account-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    color: var(--text-muted);
    font-weight: 500;
    transition: var(--transition-smooth);
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover {
    background: #FAFAFA;
    color: var(--text-dark);
  }

  .nav-item.active {
    background: var(--primary-light);
    color: var(--primary);
    font-weight: 600;
  }

  .nav-item.logout {
    margin-top: 16px;
    color: #DC2626;
  }

  .nav-item.logout:hover {
    background: #FEF2F2;
  }

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
    font-size: 1.05rem;
  }

  .card {
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 16px;
    padding: 32px;
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

  input {
    width: 100%;
    max-width: 500px;
    padding: 14px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 1rem;
    transition: var(--transition-smooth);
    background: #FAFAFA;
  }

  input:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
  }

  input[readonly] {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .hint {
    display: block;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .btn {
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
    border: none;
    font-size: 1rem;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--primary-hover);
  }

  @media (max-width: 900px) {
    .account-page {
      grid-template-columns: 1fr;
    }
    .sidebar {
      position: static;
    }
  }
</style>
