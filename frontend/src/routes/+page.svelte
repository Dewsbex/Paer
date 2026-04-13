<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	import { user, initSession } from '$lib/stores/session';
	import PaerLogo from '$lib/components/PaerLogo.svelte';

	onMount(async () => {
		await initSession();
		if ($user) goto('/feeds');
	});
</script>

<svelte:head>
	<title>pær — Many sources. One signal.</title>
</svelte:head>

<!-- Mobile-first: single column, full viewport -->
<div class="min-h-screen flex flex-col bg-paer-bg dark:bg-paer-bg-dark transition-colors duration-300">
	
	<!-- Top bar -->
	<header class="flex items-center justify-between px-4 h-12 border-b border-paer-border-light dark:border-paer-border-light-dark">
		<PaerLogo size={20} theme={$theme} />
		<button
			onclick={() => theme.toggle()}
			class="text-sm text-paer-text-tertiary dark:text-paer-text-tertiary-dark 
				   border border-paer-border dark:border-paer-border-dark rounded px-2 py-1
				   hover:text-paer-text dark:hover:text-paer-text-dark transition-colors"
			aria-label="Toggle theme"
		>
			{$theme === 'dark' ? '☀' : '☾'}
		</button>
	</header>

	<!-- Main content — centered, mobile-first -->
	<main class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
		
		<!-- Hero mark -->
		<div class="mb-8">
			<PaerLogo size={48} theme={$theme} />
		</div>

		<!-- Tagline -->
		<p class="font-body text-lg text-paer-text dark:text-paer-text-dark mb-2 tracking-tight">
			Many sources. One signal.
		</p>
		<p class="font-ui text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark max-w-xs leading-relaxed">
			An RSS reader built for synthesis, not just consumption. 
			See patterns across sources. Turn reading into action.
		</p>

		<!-- Status -->
		<div class="mt-10 flex flex-col items-center gap-3">
			<span class="font-mono text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark tracking-wide">
				v0.1 — building in public
			</span>
			<a 
				href="/login"
				class="font-ui text-sm font-medium text-paer-accent dark:text-paer-accent-dark 
					   border border-paer-accent dark:border-paer-accent-dark 
					   rounded px-4 py-2 
					   hover:bg-paer-accent-soft dark:hover:bg-paer-accent-soft-dark 
					   transition-colors min-h-touch flex items-center"
			>
				Sign in
			</a>
		</div>
	</main>

	<!-- Footer -->
	<footer class="px-4 py-4 text-center border-t border-paer-border-light dark:border-paer-border-light-dark">
		<p class="font-mono text-[10px] text-paer-text-tertiary dark:text-paer-text-tertiary-dark tracking-wide">
			pær — chaff removed
		</p>
	</footer>
</div>
