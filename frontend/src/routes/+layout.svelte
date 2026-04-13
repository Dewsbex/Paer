<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	import { initSession } from '$lib/stores/session';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
		initSession();
	});
</script>

{@render children()}
