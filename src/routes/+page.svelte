<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	// Wir importieren unseren globalen State
	import { playerState, nextLevelXp } from '$lib/state.svelte.ts';

	// Live-Berechnungen basierend auf dem State
	let progressPercent = $derived(Math.min(100, Math.round((playerState.totalXp / nextLevelXp) * 100)));
	let missingXp = $derived(Math.max(0, nextLevelXp - playerState.totalXp));
	
	// State für das Pop-up Fenster "Regeln"
	let isRulesModalOpen = $state(false);
</script>

<main class="pt-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-32">
	
	<section class="relative mb-16 mt-4">
		<div class="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-xl overflow-hidden group">
			<img alt="Schneeleopard" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544982772-d83aeb8cf70f?q=80&w=1200&auto=format&fit=crop" />
			<div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 md:via-background/20 to-transparent"></div>
			
			<div class="absolute bottom-0 left-0 p-5 sm:p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
				<div>
					<span class="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full bg-tertiary-container text-tertiary font-label text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">Seltene Art</span>
					<h2 class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-2 leading-none break-words hyphens-auto">Schneeleopard</h2>
					<p class="text-on-surface-variant max-w-md text-sm md:text-lg line-clamp-3 md:line-clamp-none">Der "Geist der Berge" ist ein absoluter Meister der Tarnung in den rauen Bergen Zentralasiens.</p>
				</div>
				<a href="/lexicon" class="inline-block whitespace-nowrap bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-[0px_20px_40px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform text-center w-full md:w-auto mt-2 md:mt-0">
					Lebensraum betreten
				</a>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<div class="flex items-center justify-between mb-6 md:mb-8">
			<h3 class="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">Lebensräume</h3>
			<a href="/quest" class="text-primary font-medium hover:underline text-sm md:text-base">Alle ansehen</a>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
			<a href="/quest" class="relative group h-64 md:h-80 rounded-xl overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer block">
				<img alt="Tiefer Wald" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-5 md:p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-xl md:text-2xl font-bold text-on-surface mb-1">Tiefer Wald</h4>
					<p class="text-on-surface-variant text-xs md:text-sm">6 Arten katalogisiert</p>
				</div>
			</a>
			
			<a href="/quest" class="relative group h-64 md:h-80 rounded-xl overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer block">
				<img alt="Ozeanische Tiefe" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-5 md:p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-xl md:text-2xl font-bold text-on-surface mb-1">Ozeanische Tiefe</h4>
					<p class="text-on-surface-variant text-xs md:text-sm">5 Arten katalogisiert</p>
				</div>
			</a>

			<a href="/quest" class="relative group h-64 md:h-80 rounded-xl overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer block">
				<img alt="Savanne" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-5 md:p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-xl md:text-2xl font-bold text-on-surface mb-1">Savanne</h4>
					<p class="text-on-surface-variant text-xs md:text-sm">8 Arten katalogisiert</p>
				</div>
			</a>
		</div>
	</section>

	<section class="mb-16">
		<div class="bg-surface-container-high rounded-2xl p-6 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-[0px_20px_40px_rgba(0,0,0,0.1)]">
			<div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
			
			<div class="flex-1 z-10 w-full">
				<div class="flex items-center gap-2 mb-3 md:mb-4">
					<span class="material-symbols-outlined text-tertiary text-sm md:text-base">psychology</span>
					<span class="text-tertiary font-bold tracking-widest text-[10px] md:text-xs uppercase">Tägliche Mission</span>
				</div>
				<h3 class="text-3xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight text-on-surface">Das Tarnungs-Rätsel</h3>
				<p class="text-on-surface-variant text-sm md:text-lg mb-6 md:mb-8 max-w-xl">Kannst du die 5 versteckten Tiere im Amazonasgebiet in unter 60 Sekunden finden? Verdiene 250 Bio-Credits und schalte das "Scharfschützen"-Abzeichen frei.</p>
				
				<div class="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
					<button onclick={() => isRulesModalOpen = true} class="w-full sm:w-auto bg-surface-variant/40 border border-outline-variant/15 text-on-surface hover:bg-surface-variant/60 px-5 md:px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer text-center">Regeln lesen</button>
					<a href="/quest" class="w-full sm:w-auto inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 md:px-10 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0px_20px_40px_rgba(0,0,0,0.25)] text-center">Zur Quest-Auswahl</a>
				</div>
			</div>
			
			<div class="w-full md:w-1/3 aspect-[2/1] md:aspect-square bg-surface-container-highest rounded-xl flex items-center justify-center p-4 md:p-6 border border-outline-variant/15 relative z-10 overflow-hidden">
				<img alt="Chamäleon Auge" class="w-full h-full object-cover rounded-lg md:rounded-[1rem] rotate-0 md:rotate-3 opacity-80" src="https://images.unsplash.com/photo-1541414779316-d56599423097?q=80&w=600&auto=format&fit=crop" />
			</div>
		</div>
	</section>

	<section class="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
		<div class="bg-surface-container-low rounded-2xl p-6 md:p-8">
			<div class="flex justify-between items-center mb-5 md:mb-6">
				<h4 class="text-lg md:text-xl font-bold text-on-surface">Missions-Fortschritt</h4>
				<span class="text-primary text-sm font-bold">{progressPercent}%</span>
			</div>
			<div class="w-full h-3 md:h-4 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/15">
				<div class="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-1000" style="width: {progressPercent}%"></div>
			</div>
			<p class="mt-4 text-xs md:text-sm text-on-surface-variant">Du bist nur noch {missingXp} XP vom nächsten Rang entfernt.</p>
		</div>

		<div class="bg-surface-container-low rounded-2xl p-6 md:p-8">
			<div class="flex justify-between items-center mb-5 md:mb-6">
				<h4 class="text-lg md:text-xl font-bold text-on-surface">Sammlungs-Status</h4>
				<span class="text-tertiary text-sm font-bold">{playerState.collectedSpecies.length}/{playerState.totalSpecies}</span>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each playerState.collectedSpecies.slice(0, 8) as _}
					<div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-container flex items-center justify-center"><span class="material-symbols-outlined text-[14px] md:text-[16px] text-primary">check</span></div>
				{/each}
				{#if playerState.collectedSpecies.length < 8}
					{#each Array(Math.min(8 - playerState.collectedSpecies.length, playerState.totalSpecies)) as _}
						<div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-surface-container-highest border border-outline-variant/30"></div>
					{/each}
				{/if}
			</div>
			<p class="mt-4 text-xs md:text-sm text-on-surface-variant">Löse Quests, um fehlende Arten zu katalogisieren.</p>
		</div>
	</section>
</main>

{#if isRulesModalOpen}
	<div 
		transition:fade={{ duration: 200 }} 
		class="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
		onclick={(e) => { if(e.target === e.currentTarget) isRulesModalOpen = false; }}
	>
		<div 
			transition:fly={{ y: 50, duration: 300 }} 
			class="bg-surface-container-high rounded-3xl p-6 md:p-8 max-w-md w-full relative border border-outline-variant/20 shadow-2xl"
		>
			<button onclick={() => isRulesModalOpen = false} class="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-2">
				<span class="material-symbols-outlined">close</span>
			</button>
			
			<div class="flex items-center gap-3 mb-6">
				<span class="material-symbols-outlined text-tertiary text-2xl md:text-3xl">menu_book</span>
				<h3 class="text-xl md:text-2xl font-bold text-on-surface tracking-tight">Spielregeln</h3>
			</div>
			
			<ul class="space-y-4 mb-8 text-sm md:text-base text-on-surface-variant">
				<li class="flex items-start gap-3">
					<span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
					<span>Wähle ein Biom und ein Tier aus dem Auswahlmenü.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
					<span>Beantworte die kniffligen Fragen, um XP (Bio-Credits) zu sammeln.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
					<span>Schalte durch korrekte Antworten detaillierte Einträge im Archiv frei.</span>
				</li>
			</ul>
			
			<button onclick={() => isRulesModalOpen = false} class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-base md:text-lg py-4 rounded-xl active:scale-95 transition-transform">
				Alles klar, los geht's!
			</button>
		</div>
	</div>
{/if}