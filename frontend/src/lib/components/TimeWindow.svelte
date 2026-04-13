<script lang="ts">
	interface Props {
		active: string;
		onchange: (window: string) => void;
	}

	let { active, onchange }: Props = $props();

	const windows = ['15m', '1h', '24h', '3d'];
</script>

<div class="flex gap-px bg-paer-border-light dark:bg-paer-border-light-dark rounded-md p-0.5" role="radiogroup" aria-label="Time window">
	{#each windows as w}
		<button
			onclick={() => onchange(w)}
			role="radio"
			aria-checked={active === w}
			class="px-2.5 py-1 text-xs font-ui rounded transition-all
				   {active === w 
					   ? 'font-semibold text-paer-text dark:text-paer-text-dark bg-paer-surface dark:bg-paer-surface-dark shadow-sm' 
					   : 'text-paer-text-tertiary dark:text-paer-text-tertiary-dark'}"
		>
			{w}
		</button>
	{/each}
</div>
