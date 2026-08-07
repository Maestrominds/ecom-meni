<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  
  let { data, children } = $props();

  // Sync server cookie state with client store
  $effect.pre(() => {
    if (data.hasToken && !store.isAdminLoggedIn) {
      store.isAdminLoggedIn = true;
    } else if (!data.hasToken && store.isAdminLoggedIn) {
      store.isAdminLoggedIn = false;
    }
  });
  import companyLogo from '$lib/assets/company_logo.svg';
  import { 
    LayoutDashboard, 
    ShoppingCart, 
    Package, 
    Users as CustomersIcon, 
    Megaphone, 
    BarChart3, 
    FileText, 
    CircleDollarSign, 
    Rss, 
    Settings,
    Search,
    Bell,
    LogOut
  } from 'lucide-svelte';

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Customers', path: '/admin/customers', icon: CustomersIcon },
    { name: 'Marketing', path: '/admin/marketing', icon: Megaphone },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Finance', path: '/admin/finance', icon: CircleDollarSign },
    { name: 'Subscription', path: '/admin/subscription', icon: Rss },
    { name: 'Referrals', path: '/admin/referrals', icon: Megaphone },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  // Disable global layout header and footer inside admin panel
  // SvelteKit layouts wrap everything, but we can customize styling or omit header/footer dynamically inside the root layout or here by styling our page.
  
  $effect(() => {
    if (!browser) return;
    
    // Exact match for login page
    const isLoginPage = page.url.pathname === '/admin/login';
    
    // Exclude /admin itself so it can natively throw a 404 without redirect loop
    const isRootAdmin = page.url.pathname === '/admin' || page.url.pathname === '/admin/';
    
    if (!store.isAdminLoggedIn && !isLoginPage && !isRootAdmin && page.url.pathname.startsWith('/admin')) {
      goto('/admin/login');
    } else if (store.isAdminLoggedIn && isLoginPage) {
      goto('/admin/dashboard');
    }
  });

  let hideHeader = $derived(
    page.url.pathname.includes('/edit/') || 
    page.url.pathname.endsWith('/new')
  );

  async function handleLogout(e: Event) {
    e.preventDefault();
    try {
      await fetch('/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed', err);
    }
    store.isAdminLoggedIn = false;
    goto('/admin/login', { invalidateAll: true });
  }
</script>

{#if page.url.pathname === '/admin/login'}
  <!-- Login page doesn't show sidebar -->
  {@render children()}
{:else}
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <span class="logo">
          <img src={companyLogo} alt="MENI" class="brand-logo" />
        </span>
        <span class="badge">ADMIN</span>
      </div>

      <nav class="sidebar-nav">
        {#each menuItems as item}
          {@const Icon = item.icon}
          <a 
            href={item.path} 
            class="nav-item" 
            class:active={page.url.pathname === item.path}
          >
            <Icon size={18} />
            <span>{item.name}</span>
          </a>
        {/each}
      </nav>

      <div class="sidebar-footer">
        <a href="/admin/login" onclick={handleLogout} class="nav-item logout">
          <LogOut size={18} />
          <span>Exit Admin</span>
        </a>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="main-wrapper">


      <main class="content">
        {@render children()}
      </main>
    </div>
  </div>
{/if}

<style>
  .admin-layout {
    display: flex;
    min-height: 100vh;
    background: #FAFAFA;
    font-family: var(--font-body);
  }

  .sidebar {
    width: 260px;
    background: #FFFFFF;
    color: #4B5563;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E5E7EB;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 10;
  }

  .brand {
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-logo {
    height: 32px;
    width: auto;
  }

  .text-logo {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 800;
    color: #111827;
  }

  .brand .badge {
    background: #F3F4F6;
    color: #6B7280;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sidebar-nav {
    flex: 1;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: #4B5563;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .nav-item:hover {
    color: #111827;
    background: #F3F4F6;
  }

  .nav-item.active {
    color: white;
    background: #F05139; /* Orange-red from Figma */
  }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid #E5E7EB;
  }

  .logout {
    color: #6B7280;
  }

  .logout:hover {
    background: #FEF2F2;
    color: #DC2626;
  }

  .main-wrapper {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .top-header {
    background: #FFFFFF;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    border-bottom: 1px solid #E5E7EB;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .search-container {
    display: flex;
    align-items: center;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 0 16px;
    width: 400px;
    height: 40px;
  }

  .search-icon {
    color: #9CA3AF;
    margin-right: 8px;
  }

  .search-container input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #111827;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .icon-btn {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification-dot {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #F05139;
    border-radius: 50%;
    border: 2px solid white;
  }

  .btn-primary-add {
    background: #F05139;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }

  .content {
    padding: 32px;
    flex: 1;
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
    .main-wrapper {
      margin-left: 0;
    }
  }
</style>
