<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import database from '$lib/data/quiz_database.json';
	import { playerState, addXp, unlockAnimal } from '$lib/state.svelte.ts';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	// 1. Wir holen die ID des gewählten Tiers aus der URL (z.B. "animal_zebra")
	let animalId = $derived($page.params.id);

	// 2. Wir laden NUR die Fragen für dieses spezifische Tier
	let animalQuests = $derived(() => {
		for (const biome of database.biomes) {
			const foundAnimal = biome.animals.find(a => a.id === animalId);
			if (foundAnimal) {
				return foundAnimal.quests.sort(() => Math.random() - 0.5); // Fragen mischen
			}
		}
		return [];
	});

	let currentIndex = $state(0);
	let currentQuestion = $derived(animalQuests()[currentIndex]);
	
	let selectedAnswer = $state<string | null>(null);
	let isSubmitted = $state(false);

	onMount(() => {
		window.scrollTo(0, 0);
	});

	function selectAndSubmitAnswer(id: string) {
		if (isSubmitted || !currentQuestion) return;
		
		selectedAnswer = id;
		isSubmitted = true;
		
		const chosenOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
		if (chosenOption && chosenOption.isCorrect) {
    addXp(150); 
    unlockAnimal(animalId);
}
	}

	function nextQuestion() {
		if (currentIndex < animalQuests().length - 1) {
			isSubmitted = false;
			selectedAnswer = null;
			currentIndex++;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			// Quiz beendet -> Zurück ins Menü
			goto('/quest'); 
		}
	}
</script>

<main class="min-h-screen bg-background text-on-background pb-32 px-4 sm:px-6 md:px-12 max-w-2xl mx-auto pt-24">
	
	{#if !currentQuestion}
		<div class="text-center py-20">
			<h2 class="text-2xl font-bold text-error mb-4">Tier nicht gefunden</h2>
			<a href="/quest" class="text-primary hover:underline">Zurück zur Auswahl</a>
		</div>
	{:else}
		<div class="flex justify-between items-end mb-2">
			<span class="text-primary font-bold text-sm">Frage {currentIndex + 1} / {animalQuests().length}</span>
			<span class="text-on-surface-variant font-label text-xs tracking-widest uppercase text-right">Biom:<br>{currentQuestion.biome}</span>
		</div>
		
		<div class="w-full h-2 bg-surface-container-highest rounded-full mb-8 overflow-hidden">
			<div 
				class="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-500 ease-out" 
				style="width: {((currentIndex) / animalQuests().length) * 100}%"
			></div>
		</div>

		<div class="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 border-2 border-outline-variant/20 shadow-2xl">
			{#key currentQuestion.image}
				<img 
					src={currentQuestion.image} 
					alt="Quest Tier" 
					class="w-full h-full object-cover"
					in:fade={{ duration: 400 }}
				/>
			{/key}
			<div class="absolute bottom-4 right-4 w-12 h-12 bg-surface-container-lowest/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-outline-variant/30">
				<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">eco</span>
			</div>
		</div>

		<div class="mb-8">
			<span class="inline-block px-3 py-1.5 rounded-lg bg-tertiary-container/30 text-tertiary font-label text-[10px] font-bold tracking-widest uppercase mb-4 border border-tertiary/20">
				{currentQuestion.challengeType}
			</span>
			<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface leading-tight">
				{currentQuestion.questionText}
			</h2>
		</div>

		<div class="flex flex-col gap-3 mb-8">
			{#each currentQuestion.options as option}
				<button 
					onclick={() => selectAndSubmitAnswer(option.id)}
					disabled={isSubmitted}
					class="w-full text-left p-4 sm:p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border-2 active:scale-[0.98]
					{isSubmitted 
						? (option.isCorrect 
							? 'bg-primary-container/40 border-primary text-primary shadow-[0_0_15px_rgba(149,212,179,0.2)]' 
							: (selectedAnswer === option.id 
								? 'bg-error-container/40 border-error text-error' 
								: 'bg-surface-container-lowest border-outline-variant/10 text-on-surface opacity-40 grayscale-[50%]')) 
						: 'bg-surface-container-low border-outline-variant/15 text-on-surface hover:border-primary/50 hover:bg-surface-container shadow-sm'}" 
				>
					<div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-label shrink-0 transition-colors
						{isSubmitted 
							? (option.isCorrect 
								? 'bg-primary text-on-primary' 
								: (selectedAnswer === option.id 
									? 'bg-error text-on-error' 
									: 'bg-surface-container-highest text-on-surface-variant'))
							: 'bg-surface-container-highest text-on-surface-variant'}">
						
						{#if isSubmitted && option.isCorrect}
							<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check</span>
						{:else if isSubmitted && selectedAnswer === option.id && !option.isCorrect}
							<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">close</span>
						{:else}
							{option.id}
						{/if}
					</div>
					<span class="font-medium text-base sm:text-lg flex-1 leading-snug">{option.text}</span>
				</button>
			{/each}
		</div>

		{#if isSubmitted}
			<div transition:slide={{ duration: 400 }}>
				<div class="pb-8 pt-4">
					<div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xl border border-outline-variant/15 relative overflow-hidden">
						<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-secondary"></div>
						
						<h3 class="font-headline font-bold text-xl text-tertiary mb-6 flex items-center gap-2">
							<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">lightbulb</span> 
							Wusstest du schon?
						</h3>
						
						<div class="flex flex-col gap-5">
							{#each currentQuestion.facts as fact}
								<div class="flex gap-4 items-start">
									<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/10 shadow-sm">
										<span class="material-symbols-outlined text-on-surface-variant text-[24px]">{fact.icon}</span>
									</div>
									<div>
										<h4 class="font-bold text-on-surface text-base mb-1">{fact.title}</h4>
										<p class="text-on-surface-variant text-sm leading-relaxed">{fact.desc}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<button 
					onclick={nextQuestion}
					class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all flex justify-center items-center gap-3 border border-primary-fixed/30"
				>
					{currentIndex < animalQuests().length - 1 ? 'Nächste Frage' : 'Zurück zur Auswahl'}
					<span class="material-symbols-outlined text-2xl font-bold">
						{currentIndex < animalQuests().length - 1 ? 'arrow_forward' : 'list'}
					</span>
				</button>
			</div>
		{/if}
	{/if}
</main>