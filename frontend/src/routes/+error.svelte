<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import PaerLogo from '$lib/components/PaerLogo.svelte';
</script>

<div class="min-h-screen flex flex-col bg-paer-bg dark:bg-paer-bg-dark transition-colors">
	<header class="flex items-center justify-between px-4 h-12 border-b border-paer-border-light dark:border-paer-border-light-dark">
		<a href="/" class="no-underline">
			<PaerLogo size={18} theme={$theme} />
		</a>
	</header>

	<main class="flex-1 flex flex-col items-center justify-center px-6 text-center">
		<p class="font-mono text-6xl text-paer-text-tertiary dark:text-paer-text-tertiary-dark mb-4">
			{page.status}
		</p>
		<p class="font-body text-lg text-paer-text dark:text-paer-text-dark mb-2">
			{#if page.status === 404}
				Nothing here to pare.
			{:else}
				Something went wrong.
			{/if}
		</p>
		<p class="font-ui text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark mb-8">
			{page.error?.message || 'An unexpected error occurred.'}
		</p>
		<a 
			href="/"
			class="font-ui text-sm text-paer-accent dark:text-paer-accent-dark 
				   border border-paer-accent dark:border-paer-accent-dark rounded px-4 py-2
				   hover:bg-paer-accent-soft dark:hover:bg-paer-accent-soft-dark transition-colors"
		>
			Back to pær
		</a>
	</main>
</div>
