<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import QuizModal from '$lib/components/QuizModal.svelte';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { store } from '$lib/store.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		// Load persistent cart
		store.loadCart();

		// Check for Referral URL Code
		const refCode = page.url.searchParams.get("ref");
		if (refCode) {
			localStorage.setItem('meni_referral_code', refCode);
		}
	});
</script>

<svelte:head>
	<title>MENI | Rejuvenate Your Hair & Skin</title>
</svelte:head>

{#if !page.url.pathname.startsWith('/admin')}
	<Header />
{/if}

{#if store.isLoading}
	<SkeletonLoader type="page" />
{:else}
	<main class="page-content-wrapper">
		{@render children()}
	</main>
{/if}

{#if !page.url.pathname.startsWith('/admin')}
	<Footer />
	<CartDrawer />
	<QuizModal />
{/if}

<style>
	.page-content-wrapper {
		min-height: 60vh;
		animation: fadeIn 0.4s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
