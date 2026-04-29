<script lang="ts">
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	
	// Importiere unsere States und den Browser-Check
	import { settingsState, playerState } from '$lib/state.svelte.ts';
	import { browser } from '$app/environment';

	let { children } = $props();
	let isPlayingQuiz = $derived($page.url.pathname.includes('/quest'));

	// Dieser Effekt "beobachtet" die States und speichert sie automatisch bei jeder Änderung!
	$effect(() => {
		if (browser) {
			localStorage.setItem('settingsState', JSON.stringify(settingsState));
			localStorage.setItem('playerState', JSON.stringify(playerState));
			
			// Das ändert die Farben der gesamten App!
			document.body.className = `theme-${settingsState.theme} bg-background text-on-background min-h-screen font-body antialiased`;
		}
	});
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