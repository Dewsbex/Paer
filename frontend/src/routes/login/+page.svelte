<script lang="ts">
	import { getSupabase } from '$lib/supabase';
	import PaerLogo from '$lib/components/PaerLogo.svelte';
	import { theme } from '$lib/stores/theme';

	let email = $state('');
	let loading = $state(false);
	let sent = $state(false);
	let error = $state('');

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		const supabase = getSupabase();
		if (!supabase) {
			error = 'Service not available yet.';
			loading = false;
			return;
		}

		const { error: authError } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/callback`
			}
		});

		if (authError) {
			error = authError.message;
		} else {
			sent = true;
		}
		loading = false;
	}
</script>

<svelte:head>
	<title>Sign in — pær</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-paer-bg dark:bg-paer-bg-dark transition-colors">
	
	<!-- Top bar -->
	<header class="flex items-center justify-between px-4 h-12 border-b border-paer-border-light dark:border-paer-border-light-dark">
		<a href="/" class="no-underline">
			<PaerLogo size={18} theme={$theme} />
		</a>
		<button
			onclick={() => theme.toggle()}
			class="text-sm text-paer-text-tertiary dark:text-paer-text-tertiary-dark border border-paer-border dark:border-paer-border-dark rounded px-2 py-1"
			aria-label="Toggle theme"
		>
			{$theme === 'dark' ? '☀' : '☾'}
		</button>
	</header>

	<!-- Login form — centered, mobile-first -->
	<main class="flex-1 flex flex-col items-center justify-center px-6 py-12">
		
		{#if sent}
			<!-- Success state -->
			<div class="w-full max-w-sm text-center">
				<div class="text-4xl mb-4">✉</div>
				<h1 class="font-body text-xl text-paer-text dark:text-paer-text-dark mb-2">
					Check your email
				</h1>
				<p class="font-ui text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark leading-relaxed mb-6">
					We sent a sign-in link to <strong class="text-paer-text dark:text-paer-text-dark">{email}</strong>. 
					Click it to continue.
				</p>
				<button
					onclick={() => { sent = false; email = ''; }}
					class="font-ui text-sm text-paer-accent dark:text-paer-accent-dark"
				>
					Use a different email
				</button>
			</div>
		{:else}
			<!-- Login form -->
			<div class="w-full max-w-sm">
				<div class="text-center mb-8">
					<h1 class="font-body text-xl text-paer-text dark:text-paer-text-dark mb-2">
						Sign in to pær
					</h1>
					<p class="font-ui text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark">
						No password needed. We'll email you a link.
					</p>
				</div>

				<div class="space-y-4">
					<div>
						<label for="email" class="block font-ui text-xs font-semibold text-paer-text-secondary dark:text-paer-text-secondary-dark uppercase tracking-wider mb-2">
							Email address
						</label>
						<input
							id="email"
							type="email"
							autocomplete="email"
							inputmode="email"
							bind:value={email}
							placeholder="you@example.com"
							required
							class="w-full px-4 py-3 rounded-lg border border-paer-border dark:border-paer-border-dark 
								   bg-paer-surface dark:bg-paer-surface-dark 
								   text-paer-text dark:text-paer-text-dark 
								   font-ui text-base
								   placeholder:text-paer-text-tertiary dark:placeholder:text-paer-text-tertiary-dark
								   focus:outline-none focus:ring-2 focus:ring-paer-accent dark:focus:ring-paer-accent-dark focus:ring-offset-0
								   min-h-touch"
						/>
					</div>

					{#if error}
						<p class="font-ui text-sm text-red-600 dark:text-red-400">{error}</p>
					{/if}

					<button
						onclick={handleLogin}
						disabled={loading || !email}
						class="w-full px-4 py-3 rounded-lg font-ui text-sm font-semibold min-h-touch
							   bg-paer-accent dark:bg-paer-accent-dark text-white
							   hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
							   transition-opacity"
					>
						{loading ? 'Sending…' : 'Send magic link'}
					</button>
				</div>

				<p class="mt-6 text-center font-ui text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark leading-relaxed">
					By signing in, you agree to pær's terms.
					<br />Your data stays yours. No tracking, no ads.
				</p>
			</div>
		{/if}
	</main>
</div>
