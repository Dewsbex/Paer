<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getSupabase } from '$lib/supabase';
	import { user, initSession, signOut } from '$lib/stores/session';
	import { theme } from '$lib/stores/theme';
	import PaerLogo from '$lib/components/PaerLogo.svelte';
	import TimeWindow from '$lib/components/TimeWindow.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import AddFeed from '$lib/components/AddFeed.svelte';

	let articles: any[] = $state([]);
	let feeds: any[] = $state([]);
	let selectedId: string | null = $state(null);
	let activeWindow = $state('24h');
	let compact = $state(false);
	let showAddFeed = $state(false);
	let showArticle = $state(false); // mobile: full-screen article view
	let loading = $state(true);

	let selected = $derived(articles.find(a => a.id === selectedId) || null);

	const windowMinutes: Record<string, number> = {
		'15m': 15, '1h': 60, '24h': 1440, '3d': 4320
	};

	onMount(async () => {
		await initSession();
		if (!$user) { goto('/login'); return; }
		await loadFeeds();
		await loadArticles();
		loading = false;
	});

	async function loadFeeds() {
		const supabase = getSupabase();
		if (!supabase) return;
		const { data } = await supabase
			.from('subscriptions')
			.select('feed_id, folder, feeds(id, title, url)')
			.eq('user_id', $user?.id);
		feeds = data?.map((s: any) => s.feeds).filter(Boolean) || [];
	}

	async function loadArticles() {
		const supabase = getSupabase();
		if (!supabase) return;

		const mins = windowMinutes[activeWindow];
		const since = new Date(Date.now() - mins * 60 * 1000).toISOString();

		const { data } = await supabase
			.from('articles')
			.select('id, title, url, author, excerpt, content, published_at, feed_id, feeds(title)')
			.gte('published_at', since)
			.order('published_at', { ascending: false })
			.limit(100);

		articles = (data || []).map((a: any) => ({
			...a,
			source: a.feeds?.title || 'Unknown',
			time: formatTime(a.published_at),
			read: false,
			cluster: null,
			clusterCount: 0
		}));
	}

	function formatTime(iso: string): string {
		const diff = Date.now() - new Date(iso).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 60) return `${mins}m`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs}h`;
		const days = Math.floor(hrs / 24);
		return `${days}d`;
	}

	function selectArticle(id: string) {
		selectedId = id;
		showArticle = true; // on mobile, show full-screen article
	}

	function backToList() {
		showArticle = false;
	}

	async function changeWindow(w: string) {
		activeWindow = w;
		loading = true;
		await loadArticles();
		loading = false;
	}

	async function onFeedAdded() {
		await loadFeeds();
		await loadArticles();
	}
</script>

<svelte:head>
	<title>Feeds — pær</title>
</svelte:head>

<div class="h-screen flex flex-col bg-paer-bg dark:bg-paer-bg-dark transition-colors">

	<!-- Top bar -->
	<header class="flex items-center justify-between px-4 h-12 border-b border-paer-border-light dark:border-paer-border-light-dark shrink-0">
		<div class="flex items-center gap-3">
			{#if showArticle}
				<!-- Mobile back button -->
				<button onclick={backToList} class="lg:hidden text-paer-text-tertiary dark:text-paer-text-tertiary-dark text-lg" aria-label="Back">←</button>
			{/if}
			<PaerLogo size={18} theme={$theme} />
		</div>

		<div class="flex items-center gap-1.5">
			<button
				onclick={() => { compact = !compact; }}
				class="text-[10px] text-paer-text-secondary dark:text-paer-text-secondary-dark border border-paer-border dark:border-paer-border-dark rounded px-2 py-1 font-ui font-medium hidden sm:block"
				aria-label={compact ? 'Comfortable view' : 'Compact view'}
			>{compact ? '▤' : '▥'}</button>
			<button
				onclick={() => theme.toggle()}
				class="text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark border border-paer-border dark:border-paer-border-dark rounded px-2 py-1"
				aria-label="Toggle theme"
			>{$theme === 'dark' ? '☀' : '☾'}</button>
			<button
				onclick={() => signOut().then(() => goto('/login'))}
				class="text-xs font-ui text-paer-text-tertiary dark:text-paer-text-tertiary-dark px-2 py-1"
			>Out</button>
		</div>
	</header>

	<!-- Main content area -->
	<div class="flex-1 flex overflow-hidden">

		<!-- Article List (visible on mobile when not viewing article, always visible on desktop) -->
		<div class="w-full lg:w-[380px] lg:min-w-[320px] lg:border-r lg:border-paer-border-light dark:lg:border-paer-border-light-dark flex flex-col
					{showArticle ? 'hidden lg:flex' : 'flex'}">
			
			<!-- List header -->
			<div class="flex items-center justify-between px-4 py-2.5 border-b border-paer-border-light dark:border-paer-border-light-dark shrink-0">
				<span class="font-ui text-xs font-semibold text-paer-text dark:text-paer-text-dark">
					All Feeds
					{#if feeds.length > 0}
						<span class="font-normal text-paer-text-tertiary dark:text-paer-text-tertiary-dark">· {feeds.length}</span>
					{/if}
				</span>
				<TimeWindow active={activeWindow} onchange={changeWindow} />
			</div>

			<!-- Article list -->
			<div class="flex-1 overflow-y-auto">
				{#if loading}
					<div class="flex items-center justify-center py-12">
						<span class="font-mono text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark">Loading…</span>
					</div>
				{:else if articles.length === 0}
					<div class="flex flex-col items-center justify-center py-16 px-6 text-center">
						{#if feeds.length === 0}
							<p class="font-body text-base text-paer-text dark:text-paer-text-dark mb-2">No feeds yet</p>
							<p class="font-ui text-sm text-paer-text-secondary dark:text-paer-text-secondary-dark mb-6">
								Add your first RSS feed to start reading.
							</p>
							<button
								onclick={() => { showAddFeed = true; }}
								class="font-ui text-sm font-semibold text-white bg-paer-accent dark:bg-paer-accent-dark rounded-lg px-5 py-2.5 min-h-touch"
							>Add your first feed</button>
						{:else}
							<p class="font-mono text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark mb-1">
								Nothing in the last {activeWindow}.
							</p>
							<p class="font-ui text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark">
								Nothing missed. Nothing owed.
							</p>
						{/if}
					</div>
				{:else}
					{#each articles as article (article.id)}
						<ArticleCard 
							{article} 
							selected={selectedId === article.id}
							{compact}
							onclick={() => selectArticle(article.id)}
						/>
					{/each}
					<div class="py-8 text-center">
						<p class="font-mono text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark mb-1">
							End of {activeWindow} window.
						</p>
						<p class="font-ui text-[11px] text-paer-text-tertiary dark:text-paer-text-tertiary-dark">
							Nothing missed. Nothing owed.
						</p>
					</div>
				{/if}
			</div>

			<!-- Bottom bar: add feed (mobile) -->
			<div class="shrink-0 border-t border-paer-border-light dark:border-paer-border-light-dark px-4 py-2">
				<button
					onclick={() => { showAddFeed = true; }}
					class="flex items-center gap-1.5 font-ui text-sm font-medium text-paer-accent dark:text-paer-accent-dark"
				>
					<span class="text-lg leading-none">+</span> Add feed
				</button>
			</div>
		</div>

		<!-- Reading pane (full-screen on mobile when article selected, side pane on desktop) -->
		<div class="flex-1 overflow-y-auto bg-paer-surface dark:bg-paer-surface-dark
					{showArticle ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}">
			{#if selected}
				<article class="max-w-2xl mx-auto px-5 py-8 lg:px-10 lg:py-10 w-full">
					<!-- Article header -->
					<div class="mb-6">
						<div class="flex items-center gap-2 mb-3">
							<span class="text-xs font-ui font-bold text-paer-accent dark:text-paer-accent-dark tracking-wide">
								{selected.source}
							</span>
							<span class="text-paer-text-tertiary dark:text-paer-text-tertiary-dark text-[10px]">·</span>
							<span class="text-[11px] font-mono text-paer-text-secondary dark:text-paer-text-secondary-dark">
								{selected.time} ago
							</span>
						</div>
						<h1 class="font-body text-2xl lg:text-[26px] text-paer-text dark:text-paer-text-dark leading-tight tracking-tight mb-4">
							{selected.title}
						</h1>
						<div class="flex gap-2 flex-wrap">
							{#each ['Save', 'Flag', 'Original ↗'] as action}
								<button class="px-3 py-1.5 text-[11px] font-ui font-medium min-h-[36px]
											   {action === 'Flag' ? 'text-paer-accent dark:text-paer-accent-dark border-paer-accent dark:border-paer-accent-dark' : 'text-paer-text-secondary dark:text-paer-text-secondary-dark border-paer-border dark:border-paer-border-dark'}
											   border rounded">
									{action}
								</button>
							{/each}
						</div>
					</div>

					<!-- Article body -->
					<div class="font-body text-base lg:text-[17px] leading-[1.8] text-paer-text dark:text-paer-text-dark">
						{#if selected.content}
							{@html selected.content}
						{:else if selected.excerpt}
							<p>{selected.excerpt}</p>
							<p class="mt-4">
								<a 
									href={selected.url} 
									target="_blank" 
									rel="noopener noreferrer"
									class="font-ui text-sm text-paer-accent dark:text-paer-accent-dark underline"
								>
									Read full article ↗
								</a>
							</p>
						{:else}
							<p class="text-paer-text-secondary dark:text-paer-text-secondary-dark italic">
								No content available.
								{#if selected.url}
									<a href={selected.url} target="_blank" rel="noopener noreferrer" class="text-paer-accent dark:text-paer-accent-dark underline">
										View original ↗
									</a>
								{/if}
							</p>
						{/if}
					</div>
				</article>
			{:else}
				<!-- Empty state (desktop only) -->
				<div class="hidden lg:flex flex-1 items-center justify-center">
					<p class="font-mono text-xs text-paer-text-tertiary dark:text-paer-text-tertiary-dark">
						Select an article to read
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Add feed modal -->
<AddFeed open={showAddFeed} onclose={() => { showAddFeed = false; }} onadded={onFeedAdded} />
