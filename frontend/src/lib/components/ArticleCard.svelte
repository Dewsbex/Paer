<script lang="ts">
	interface Article {
		id: string;
		title: string;
		source: string;
		time: string;
		excerpt?: string;
		cluster?: string | null;
		clusterCount?: number;
		read: boolean;
	}

	interface Props {
		article: Article;
		selected: boolean;
		compact: boolean;
		onclick: () => void;
	}

	let { article, selected, compact, onclick }: Props = $props();
</script>

{#if compact}
	<!-- Compact mode: title-only row for scanning -->
	<button
		{onclick}
		class="flex items-baseline gap-2.5 w-full text-left px-4 py-1.5 border-b border-paer-border-light dark:border-paer-border-light-dark transition-all
			   {selected ? 'bg-paer-surface-hover dark:bg-paer-surface-hover-dark border-l-2 border-l-paer-accent dark:border-l-paer-accent-dark' : 'border-l-2 border-l-transparent'}
			   {article.read && !selected ? 'opacity-50' : ''}"
		aria-current={selected ? 'true' : undefined}
	>
		<span class="text-[10.5px] font-ui font-semibold text-paer-accent dark:text-paer-accent-dark min-w-[72px] shrink-0 tracking-wide">
			{article.source.length > 10 ? article.source.slice(0, 10) + '…' : article.source}
		</span>
		<span class="text-[13px] font-body text-paer-text dark:text-paer-text-dark leading-tight flex-1 truncate">
			{article.title}
		</span>
		<span class="text-[10px] font-mono text-paer-text-tertiary dark:text-paer-text-tertiary-dark shrink-0">
			{article.time}
		</span>
		{#if article.cluster}
			<span class="text-[7px] text-paer-cluster-text dark:text-paer-cluster-text-dark">●</span>
		{/if}
	</button>
{:else}
	<!-- Comfortable mode: source, title, cluster badge -->
	<button
		{onclick}
		class="w-full text-left px-4 py-3.5 border-b border-paer-border-light dark:border-paer-border-light-dark transition-all
			   {selected ? 'bg-paer-surface-hover dark:bg-paer-surface-hover-dark border-l-2 border-l-paer-accent dark:border-l-paer-accent-dark' : 'border-l-2 border-l-transparent'}
			   {article.read && !selected ? 'opacity-50' : ''}"
		aria-current={selected ? 'true' : undefined}
	>
		<div class="flex items-center gap-2 mb-1.5">
			<span class="text-[11px] font-ui font-semibold text-paer-accent dark:text-paer-accent-dark tracking-wide">
				{article.source}
			</span>
			<span class="text-[10px] font-mono text-paer-text-tertiary dark:text-paer-text-tertiary-dark">
				{article.time}
			</span>
		</div>
		<h3 class="text-sm font-body text-paer-text dark:text-paer-text-dark leading-snug mb-1.5">
			{article.title}
		</h3>
		{#if article.cluster}
			<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-ui font-medium text-paer-cluster-text dark:text-paer-cluster-text-dark bg-paer-cluster dark:bg-paer-cluster-dark rounded">
				<span class="text-[7px] opacity-80">●</span>
				{article.cluster} · {article.clusterCount}
			</span>
		{/if}
	</button>
{/if}
