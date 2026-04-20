<script lang="ts">
	import database from '$lib/data/quiz_database.json';

	// Wir holen uns das Biom "Savanne" für diese Ansicht
	const savannaBiome = database.biomes.find(b => b.id === 'biome_savanna');
	const animals = savannaBiome ? savannaBiome.animals : [];

	// Hilfsfunktion, um die WWF-Farbe dynamisch anzupassen
	function getWwfColorClass(status: string) {
		if (status === 'Stark gefährdet') return 'text-error bg-error-container';
		if (status === 'Gefährdet') return 'text-tertiary bg-tertiary-container';
		return 'text-primary bg-primary-container';
	}
</script>

<main class="min-h-screen bg-background text-on-background pb-32 px-6 md:px-12 max-w-5xl mx-auto pt-12">
	
	<div class="mb-12">
		<div class="flex items-center gap-2 mb-2">
			<span class="material-symbols-outlined text-primary">auto_stories</span>
			<span class="text-primary font-label text-xs font-bold tracking-widest uppercase">Living Archive</span>
		</div>
		<h1 class="text-5xl font-extrabold tracking-tight text-on-surface mb-4">Das Tierlexikon</h1>
		<p class="text-on-surface-variant text-lg max-w-2xl">
			Entdecke die faszinierendsten Lebewesen unseres Planeten. Wähle ein Biom, um mehr über seine Bewohner zu erfahren.
		</p>
	</div>

	<div class="flex gap-4 overflow-x-auto pb-4 mb-10 no-scrollbar">
		<button class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold whitespace-nowrap shadow-lg shadow-primary/20">
			Savanne
		</button>
		<button class="bg-surface-container-low text-on-surface px-6 py-2 rounded-full font-bold whitespace-nowrap border border-outline-variant/15 hover:bg-surface-container transition-colors">
			Tiefer Wald
		</button>
		<button class="bg-surface-container-low text-on-surface px-6 py-2 rounded-full font-bold whitespace-nowrap border border-outline-variant/15 hover:bg-surface-container transition-colors">
			Ozeanische Tiefe
		</button>
	</div>

	<div class="flex flex-col gap-12">
		{#each animals as animal}
			{#if animal.lexicon}
				<div class="bg-surface-container-lowest rounded-[2rem] overflow-hidden border border-outline-variant/10 shadow-[0px_20px_40px_rgba(0,0,0,0.1)] flex flex-col md:flex-row group transition-all duration-500 hover:-translate-y-2">
					
					<div class="w-full md:w-2/5 aspect-[4/3] md:aspect-auto relative overflow-hidden">
						<img src={animal.lexicon.image_main} alt={animal.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
						<div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
					</div>

					<div class="p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center">
						<div class="flex flex-wrap items-center gap-3 mb-4">
							<span class="px-3 py-1 rounded-md font-label text-[10px] font-bold tracking-widest uppercase {getWwfColorClass(animal.lexicon.wwf_status)}">
								WWF: {animal.lexicon.wwf_status}
							</span>
							<span class="text-on-surface-variant text-sm font-medium italic">
								{animal.scientific_name}
							</span>
						</div>

						<h2 class="text-4xl font-extrabold tracking-tight text-on-surface mb-6">
							{animal.name}
						</h2>
						
						<p class="text-on-surface-variant text-base leading-relaxed mb-8">
							{animal.lexicon.description}
						</p>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
							<div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
								<div class="flex items-center gap-2 mb-1">
									<span class="material-symbols-outlined text-sm text-primary">public</span>
									<span class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Lebensraum</span>
								</div>
								<span class="text-on-surface font-medium text-sm">{animal.lexicon.habitat}</span>
							</div>
							<div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
								<div class="flex items-center gap-2 mb-1">
									<span class="material-symbols-outlined text-sm text-tertiary">restaurant</span>
									<span class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Ernährung</span>
								</div>
								<span class="text-on-surface font-medium text-sm">{animal.lexicon.diet}</span>
							</div>
						</div>

						<a href="/quest" class="self-start inline-flex bg-surface-variant/40 border border-outline-variant/20 text-on-surface hover:bg-surface-container px-6 py-3 rounded-xl font-semibold transition-all items-center gap-2">
	<span class="material-symbols-outlined">play_arrow</span>
	Wissenstest starten
</a>
					</div>

				</div>
			{/if}
		{/each}
	</div>
</main>