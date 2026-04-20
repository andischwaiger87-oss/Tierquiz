<script lang="ts">
	import database from '$lib/data/quiz_database.json';
	import { playerState } from '$lib/state.svelte.ts';
	import { fade, slide } from 'svelte/transition';

	// 1. Alle Tiere in ein flaches Array laden und das Biom als Eigenschaft anhängen
	const allAnimals = database.biomes.flatMap(biome =>
		biome.animals.map(animal => ({ ...animal, biomeName: biome.name }))
	);

	// 2. Dynamische Filter-Optionen aus den Daten generieren
	const biomes = ['Alle', ...new Set(database.biomes.map(b => b.name))];
	const statuses = ['Alle', ...new Set(allAnimals.map(a => a.lexicon.wwf_status))];

	// 3. States für Suche und Filter (Svelte 5 Runes)
	let searchQuery = $state('');
	let selectedBiome = $state('Alle');
	let selectedStatus = $state('Alle');

	// 4. Automatisch gefilterte Liste basierend auf den Eingaben
	let filteredAnimals = $derived(
		allAnimals.filter(animal => {
			const matchesSearch = 
				animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				animal.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				animal.lexicon.description.toLowerCase().includes(searchQuery.toLowerCase());
			
			const matchesBiome = selectedBiome === 'Alle' || animal.biomeName === selectedBiome;
			const matchesStatus = selectedStatus === 'Alle' || animal.lexicon.wwf_status === selectedStatus;

			return matchesSearch && matchesBiome && matchesStatus;
		})
	);
</script>

<svelte:head>
	<title>Tierlexikon | Digital Biome</title>
</svelte:head>

<main class="pt-24 pb-32 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto min-h-screen" in:fade>
	
	<header class="mb-10">
		<h1 class="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tight mb-3">Das Tierlexikon</h1>
		<p class="text-on-surface-variant text-lg max-w-2xl">
			Entdecke die faszinierendsten Lebewesen unseres Planeten. Nutze die Suche und Filter, um bestimmte Arten schnell zu finden.
		</p>
	</header>

	<div class="sticky top-20 z-30 bg-background/90 backdrop-blur-xl py-4 border-b border-outline-variant/10 mb-8 flex flex-col gap-4">
		
		<div class="relative">
			<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
			<input 
				type="text" 
				bind:value={searchQuery} 
				placeholder="Suche nach Name, Art oder Beschreibung..." 
				class="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
			/>
			{#if searchQuery}
				<button onclick={() => searchQuery = ''} class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
					<span class="material-symbols-outlined">close</span>
				</button>
			{/if}
		</div>

		<div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
			
			<div class="flex flex-wrap gap-2">
				{#each biomes as biome}
					<button 
						onclick={() => selectedBiome = biome}
						class="px-4 py-2 rounded-full font-bold text-sm transition-colors active:scale-95
						{selectedBiome === biome 
							? 'bg-primary text-on-primary' 
							: 'bg-surface-container border border-outline-variant/15 text-on-surface-variant hover:bg-surface-container-high'}"
					>
						{biome}
					</button>
				{/each}
			</div>

			<div class="flex items-center gap-3 w-full md:w-auto">
				<span class="text-sm font-bold text-on-surface-variant uppercase tracking-widest shrink-0">Status:</span>
				<select 
					bind:value={selectedStatus}
					class="bg-surface-container border border-outline-variant/15 rounded-xl py-2 px-4 text-on-surface text-sm font-medium focus:outline-none focus:border-primary appearance-none w-full md:w-48"
				>
					{#each statuses as status}
						<option value={status}>{status}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="mb-6 flex justify-between items-center text-sm font-bold text-on-surface-variant">
		<span>Zeige {filteredAnimals.length} Ergebnis{filteredAnimals.length !== 1 ? 'se' : ''}</span>
	</div>

	<div class="flex flex-col gap-8">
		{#if filteredAnimals.length === 0}
			<div class="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/10" in:fade>
				<span class="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
				<h3 class="text-xl font-bold text-on-surface mb-2">Keine Tiere gefunden</h3>
				<p class="text-on-surface-variant">Passe deine Suchbegriffe oder Filter an.</p>
				<button onclick={() => { searchQuery = ''; selectedBiome = 'Alle'; selectedStatus = 'Alle'; }} class="mt-6 text-primary hover:underline font-medium">Filter zurücksetzen</button>
			</div>
		{:else}
			{#each filteredAnimals as animal (animal.id)}
				<div 
					class="bg-surface-container-low rounded-3xl overflow-hidden flex flex-col md:flex-row border border-outline-variant/15 shadow-lg group"
					in:fade={{ duration: 300 }}
				>
					<div class="w-full md:w-2/5 xl:w-1/3 aspect-square md:aspect-auto relative overflow-hidden shrink-0">
						<img 
							src={animal.lexicon.image_main} 
							alt={animal.name} 
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						
						{#if playerState.collectedSpecies.includes(animal.id)}
							<div class="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-2 shadow-md backdrop-blur-md bg-opacity-90">
								<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
								<span class="text-xs font-bold uppercase tracking-wide">Erforscht</span>
							</div>
						{/if}
					</div>

					<div class="p-6 md:p-8 flex flex-col flex-1">
						<div class="flex flex-wrap items-center gap-3 mb-3">
							<span class="bg-tertiary-container/30 border border-tertiary/20 text-tertiary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
								WWF: {animal.lexicon.wwf_status}
							</span>
							<span class="text-on-surface-variant text-sm italic font-medium">{animal.scientific_name}</span>
						</div>

						<h2 class="text-3xl font-headline font-extrabold text-on-surface mb-4">{animal.name}</h2>
						
						<p class="text-on-surface-variant text-base leading-relaxed mb-6 flex-1">
							{animal.lexicon.description}
						</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
							<div class="bg-surface-container rounded-2xl p-4 border border-outline-variant/5">
								<div class="flex items-center gap-2 mb-2 text-primary">
									<span class="material-symbols-outlined text-[20px]">public</span>
									<span class="text-[10px] font-bold uppercase tracking-widest">Lebensraum</span>
								</div>
								<p class="text-sm text-on-surface font-medium leading-snug">{animal.lexicon.habitat}</p>
							</div>
							
							<div class="bg-surface-container rounded-2xl p-4 border border-outline-variant/5">
								<div class="flex items-center gap-2 mb-2 text-tertiary">
									<span class="material-symbols-outlined text-[20px]">restaurant</span>
									<span class="text-[10px] font-bold uppercase tracking-widest">Ernährung</span>
								</div>
								<p class="text-sm text-on-surface font-medium leading-snug">{animal.lexicon.diet}</p>
							</div>
						</div>

						<a 
							href="/quest/{animal.id}" 
							class="inline-flex items-center justify-center gap-2 bg-surface-container-high border border-outline-variant/20 hover:border-primary/50 hover:bg-surface-container-highest text-on-surface font-bold py-4 px-6 rounded-xl transition-all active:scale-95 w-full sm:w-auto mt-auto"
						>
							<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
							Wissenstest starten
						</a>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</main>