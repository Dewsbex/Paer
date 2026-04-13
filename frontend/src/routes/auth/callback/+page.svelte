<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getSupabase } from '$lib/supabase';

	let error = $state('');

	onMount(async () => {
		const supabase = getSupabase();
		if (!supabase) {
			error = 'Service not available.';
			return;
		}

		const { error: authError } = await supabase.auth.getSession();
		
		if (authError) {
			error = authError.message;
		} else {
			goto('/feeds');
		}
	});
</script>

<svelte:head>
	<title>Signing in… — pær</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-paer-bg dark:bg-paer-bg-dark">
	{#if error}
		<div class="text-center px-6">
			<p class="font-ui text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
			<a href="/login" class="font-ui text-sm text-paer-accent dark:text-paer-accent-dark">
				Try again
			</a>
		</div>
	{:else}
		<p class="font-mono text-sm text-paer-text-tertiary dark:text-paer-text-tertiary-dark">
			Signing you in…
		</p>
	{/if}
</div>
