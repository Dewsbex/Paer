<script lang="ts">
	import { getSupabase } from '$lib/supabase';
	import { user } from '$lib/stores/session';

	interface Props {
		open: boolean;
		onclose: () => void;
		onadded: () => void;
	}

	let { open, onclose, onadded }: Props = $props();

	let feedUrl = $state('');
	let loading = $state(false);
	let error = $state('');

	async function addFeed(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		const supabase = getSupabase();
		if (!supabase) { error = 'Not connected.'; loading = false; return; }

		let url = feedUrl.trim();
		if (!url.startsWith('http')) url = 'https://' + url;

		try {
			// Insert or get existing feed
			let { data: feed, error: feedErr } = await supabase
				.from('feeds')
				.select('id')
				.eq('url', url)
				.maybeSingle();

			if (!feed) {
				const { data: newFeed, error: insertErr } = await supabase
					.from('feeds')
					.insert({ url, title: url })
					.select('id')
					.single();

				if (insertErr) throw insertErr;
				feed = newFeed;
			}

			// Subscribe user to feed
			const { error: subErr } = await supabase
				.from('subscriptions')
				.upsert({ 
					user_id: ($user as any)?.id, 
					feed_id: feed.id 
				});

			if (subErr) throw subErr;

			feedUrl = '';
			onadded();
			onclose();
		} catch (err: any) {
			error = err.message || 'Failed to add feed.';
		}
		loading = false;
	}

	async function handleOpml(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		loading = true;
		error = '';

		try {
			const text = await file.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, 'text/xml');
			const outlines = doc.querySelectorAll('outline[xmlUrl]');

			const supabase = getSupabase();
			if (!supabase) throw new Error('Not connected.');

			let added = 0;
			for (const outline of outlines) {
				const url = outline.getAttribute('xmlUrl');
				const title = outline.getAttribute('title') || outline.getAttribute('text') || url;
				if (!url) continue;

				const { data: feed } = await supabase
					.from('feeds')
					.upsert({ url, title }, { onConflict: 'url' })
					.select('id')
					.single();

				if (feed) {
					await supabase
						.from('subscriptions')
						.upsert({ user_id: ($user as any)?.id, feed_id: feed.id });
					added++;
				}
			}

			feedUrl = '';
			onadded();
			onclose();
		} catch (err: any) {
			error = err.message || 'Failed to import OPML.';
		}
		loading = false;
	}
</script>

{#if open}
	<!-- Backdrop -->
	<div 
		class="fixed inset-0 bg-black/30 dark:bg-black/50 z-40" 
		onclick={onclose}
		role="presentation"
	></div>

	<!-- Bottom sheet on mobile, centered modal on desktop -->
	<div class="fixed inset-x-0 bottom-0 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
				z-50 w-full lg:max-w-md
				bg-paer-surface dark:bg-paer-surface-dark
				rounded-t-2xl lg:rounded-2xl
				border-t border-paer-border dark:border-paer-border-dark lg:border
				shadow-xl p-6
				max-h-[80vh] overflow-y-auto"
		role="dialog"
		aria-label="Add feed"
	>
		<!-- Drag handle (mobile) -->
		<div class="w-10 h-1 bg-paer-border dark:bg-paer-border-dark rounded-full mx-auto mb-4 lg:hidden"></div>

		<h2 class="font-body text-lg text-paer-text dark:text-paer-text-dark mb-4">Add a feed</h2>

		<div class="space-y-4">
			<!-- URL input -->
			<div>
				<label for="feed-url" class="block font-ui text-xs font-semibold text-paer-text-secondary dark:text-paer-text-secondary-dark uppercase tracking-wider mb-1.5">
					Feed URL
				</label>
				<input
					id="feed-url"
					type="url"
					inputmode="url"
					bind:value={feedUrl}
					placeholder="https://example.com/feed.xml"
					class="w-full px-4 py-3 rounded-lg border border-paer-border dark:border-paer-border-dark 
						   bg-paer-bg dark:bg-paer-bg-dark
						   text-paer-text dark:text-paer-text-dark 
						   font-ui text-base
						   placeholder:text-paer-text-tertiary dark:placeholder:text-paer-text-tertiary-dark
						   focus:outline-none focus:ring-2 focus:ring-paer-accent dark:focus:ring-paer-accent-dark
						   min-h-touch"
				/>
			</div>

			{#if error}
				<p class="font-ui text-sm text-red-600 dark:text-red-400">{error}</p>
			{/if}

			<button
				onclick={addFeed}
				disabled={loading || !feedUrl.trim()}
				class="w-full px-4 py-3 rounded-lg font-ui text-sm font-semibold min-h-touch
					   bg-paer-accent dark:bg-paer-accent-dark text-white
					   hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
					   transition-opacity"
			>
				{loading ? 'Adding…' : 'Add feed'}
			</button>

			<!-- Divider -->
			<div class="flex items-center gap-3 py-2">
				<div class="flex-1 h-px bg-paer-border-light dark:bg-paer-border-light-dark"></div>
				<span class="font-ui text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark">or</span>
				<div class="flex-1 h-px bg-paer-border-light dark:bg-paer-border-light-dark"></div>
			</div>

			<!-- OPML import -->
			<label class="flex items-center justify-center w-full px-4 py-3 rounded-lg font-ui text-sm font-medium min-h-touch
						  border border-paer-border dark:border-paer-border-dark
						  text-paer-text-secondary dark:text-paer-text-secondary-dark
						  hover:bg-paer-surface-hover dark:hover:bg-paer-surface-hover-dark
						  cursor-pointer transition-colors">
				Import OPML file
				<input type="file" accept=".opml,.xml" onchange={handleOpml} class="hidden" />
			</label>
		</div>
	</div>
{/if}
