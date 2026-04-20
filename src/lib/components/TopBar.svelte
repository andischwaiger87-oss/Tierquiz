<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	// State für unsere Overlays
	let isMenuOpen = $state(false);
	let isProfileOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) isProfileOpen = false; // Schließt das andere Menü
	}

	function toggleProfile() {
		isProfileOpen = !isProfileOpen;
		if (isProfileOpen) isMenuOpen = false; // Schließt das andere Menü
	}
</script>

<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-20 px-6 md:px-12 bg-background/80 backdrop-blur-2xl shadow-[0px_20px_40px_rgba(0,0,0,0.25)] border-b border-outline-variant/10">
	<div class="flex items-center gap-4">
		<button onclick={toggleMenu} class="text-primary hover:bg-white/5 transition-colors p-2 rounded-full active:scale-95 duration-200 z-50">
			<span class="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
		</button>
		<h1 class="font-headline font-black text-primary tracking-tighter text-2xl relative z-50">Digital Biome</h1>
	</div>
	
	<div class="flex items-center relative">
		<button onclick={toggleProfile} class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 transition-colors duration-200 z-50 {isProfileOpen ? 'border-primary' : 'border-outline-variant/15 hover:border-primary/50'}">
			<img alt="Nutzerprofil" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=150&auto=format&fit=crop" />
		</button>
		
		{#if isProfileOpen}
			<div 
				transition:fly={{ y: -10, duration: 200 }}
				class="absolute top-14 right-0 w-64 bg-surface-container-low rounded-2xl border border-outline-variant/15 p-4 shadow-[0px_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
			>
				<div class="text-center mb-4 pb-4 border-b border-outline-variant/15">
					<h3 class="font-bold text-on-surface">Explorer</h3>
					<span class="text-primary text-xs font-label uppercase tracking-widest">Rang: Novize</span>
				</div>
				<a href="/settings" onclick={toggleProfile} class="w-full flex items-center gap-3 text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-surface-container transition-colors mb-1">
					<span class="material-symbols-outlined text-[20px]">settings</span>
					<span class="text-sm font-medium">Einstellungen</span>
				</a>
				<button class="w-full flex items-center gap-3 text-error hover:text-error-container hover:bg-error/10 p-2 rounded-lg transition-colors">
					<span class="material-symbols-outlined text-[20px]">logout</span>
					<span class="text-sm font-medium">Abmelden</span>
				</button>
			</div>
		{/if}
	</div>
</header>

{#if isMenuOpen}
	<div 
		transition:fade={{ duration: 200 }}
		onclick={toggleMenu}
		class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
	></div>
	
	<div 
		transition:fly={{ x: -300, duration: 300 }}
		class="fixed top-0 left-0 h-full w-72 bg-surface-container-lowest border-r border-outline-variant/15 p-6 pt-24 z-40 shadow-2xl flex flex-col"
	>
		<span class="text-on-surface-variant font-label text-xs tracking-widest uppercase mb-4">Navigation</span>
		<a href="/" onclick={toggleMenu} class="flex items-center gap-4 text-on-surface hover:text-primary p-4 rounded-xl hover:bg-surface-container transition-all mb-2">
			<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">eco</span>
			<span class="font-bold">Startseite</span>
		</a>
		<a href="/lexicon" onclick={toggleMenu} class="flex items-center gap-4 text-on-surface hover:text-primary p-4 rounded-xl hover:bg-surface-container transition-all mb-2">
			<span class="material-symbols-outlined">auto_stories</span>
			<span class="font-bold">Tierlexikon</span>
		</a>
		<a href="/quest" onclick={toggleMenu} class="flex items-center gap-4 text-on-surface hover:text-primary p-4 rounded-xl hover:bg-surface-container transition-all mb-auto">
			<span class="material-symbols-outlined">psychology</span>
			<span class="font-bold">Aktuelle Quest</span>
		</a>
		
	</div>
{/if}