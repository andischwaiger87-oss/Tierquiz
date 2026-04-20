<script lang="ts">
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { page } from '$app/stores';
	// Wir importieren Sveltes Animations-Funktionen
	import { fade, fly } from 'svelte/transition';
	
	let { children } = $props();
	
	let isPlayingQuiz = $derived($page.url.pathname.includes('/quest'));
</script>

<TopBar />

{#key $page.url.pathname}
	<div 
		in:fly={{ y: 20, duration: 400, delay: 100 }} 
		out:fade={{ duration: 150 }}
		class="w-full"
	>
		{@render children()}
	</div>
{/key}

{#if !isPlayingQuiz}
	<div transition:fly={{ y: 50, duration: 300 }}>
		<BottomNav />
	</div>
{/if}