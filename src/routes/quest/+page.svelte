<script lang="ts">
	import database from '$lib/data/quiz_database.json';
	import { playerState } from '$lib/state.svelte.ts';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Quest Auswahl | Digital Biome</title>
</svelte:head>

<main class="pt-24 pb-32 px-6 max-w-4xl mx-auto min-h-screen" in:fade>
	<header class="mb-10">
		<h1 class="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tight mb-3">Wähle dein Ziel</h1>
		<p class="text-on-surface-variant text-lg">Suche dir ein Biom aus und wähle die Art, die du erforschen möchtest.</p>
	</header>

	<div class="space-y-12">
		{#each database.biomes as biome}
			<section>
				<div class="relative w-full h-32 rounded-2xl overflow-hidden mb-6 shadow-md border border-outline-variant/10">
					<img src={biome.image} alt={biome.name} class="w-full h-full object-cover opacity-60" />
					<div class="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
					<div class="absolute bottom-4 left-6">
						<h2 class="text-2xl font-bold text-on-surface">{biome.name}</h2>
					</div>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					{#each biome.animals as animal}
						<a href="/quest/{animal.id}" class="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/15 hover:border-primary/50 transition-all active:scale-95 group block">
							<div class="aspect-square w-full relative">
								<img src={animal.lexicon.image_main} alt={animal.name} class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
								
								{#if playerState.collectedSpecies.includes(animal.id)}
									<div class="absolute top-2 right-2 bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shadow-md">
										<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">check</span>
									</div>
								{/if}
							</div>
							<div class="p-3 text-center bg-surface-container">
								<h3 class="font-bold text-on-surface text-sm truncate">{animal.name}</h3>
							</div>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</main>