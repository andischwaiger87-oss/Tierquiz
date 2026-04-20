<script lang="ts">
	import { goto } from '$app/navigation';
	import database from '$lib/data/quiz_database.json';
	import { quizState, resetQuiz, addCorrectAnswer } from '$lib/state.svelte.ts';
	import { onMount } from 'svelte';

	const allQuestions = database.biomes[0].animals.flatMap(animal => animal.quests);

	// Wenn die Seite geladen wird, setzen wir das Quiz zurück
	onMount(() => {
		resetQuiz(allQuestions.length);
	});

	let currentIndex = $state(0);
	let currentQuestion = $derived(allQuestions[currentIndex]);
	
	let selectedAnswer = $state<string | null>(null);
	let isSubmitted = $state(false);

	function selectAnswer(id: string) {
		if (!isSubmitted) selectedAnswer = id;
	}

	function submitAnswer() {
		if (selectedAnswer) {
			isSubmitted = true;
			
			// Prüfen, ob die Antwort richtig war und Punkte vergeben!
			const chosenOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
			if (chosenOption && chosenOption.isCorrect) {
				addCorrectAnswer(150); // 150 XP pro richtiger Antwort!
			}
		}
	}

	function nextQuestion() {
		if (currentIndex < allQuestions.length - 1) {
			currentIndex++;
			selectedAnswer = null;
			isSubmitted = false;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			goto('/quest/results');
		}
	}
</script>

<main class="min-h-screen bg-background text-on-background pb-32 px-6 md:px-12 max-w-3xl mx-auto pt-12">
	
	<div class="flex justify-between items-end mb-2">
		<span class="text-primary font-bold text-sm">Frage {currentQuestion.questionNumber}</span>
		<span class="text-on-surface-variant font-label text-xs tracking-widest uppercase">BIOM: {currentQuestion.biome}</span>
	</div>
	<div class="w-full h-1 bg-surface-container-highest rounded-full mb-8">
		<div 
			class="h-full bg-primary rounded-full transition-all duration-500" 
			style="width: {((currentIndex) / allQuestions.length) * 100}%"
		></div>
	</div>

	<div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-outline-variant/15">
		{#key currentQuestion.image}
			<img src={currentQuestion.image} alt="Quiz Tier" class="w-full h-full object-cover animate-in fade-in duration-500" />
		{/key}
		<div class="absolute bottom-4 right-4 w-12 h-12 bg-tertiary rounded-full flex items-center justify-center shadow-lg shadow-tertiary/20">
			<span class="material-symbols-outlined text-on-tertiary">lightbulb</span>
		</div>
	</div>

	<div class="mb-8">
		<span class="inline-block px-3 py-1 rounded-md bg-tertiary-container text-tertiary font-label text-[10px] font-bold tracking-widest uppercase mb-4">
			{currentQuestion.challengeType}
		</span>
		<h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
			{currentQuestion.questionText}
		</h2>
	</div>

	<div class="flex flex-col gap-4 mb-8">
		{#each currentQuestion.options as option}
			<button 
				onclick={() => selectAnswer(option.id)}
				class="w-full text-left p-4 rounded-md flex items-center gap-4 transition-all duration-300 border 
				{selectedAnswer === option.id && !isSubmitted ? 'bg-primary-container border-primary/50 text-on-primary-container' : 'bg-surface-container-low border-transparent text-on-surface hover:bg-surface-container'}
				{isSubmitted && option.isCorrect ? 'bg-primary border-primary text-on-primary' : ''}
				{isSubmitted && selectedAnswer === option.id && !option.isCorrect ? 'bg-error-container border-error/50 text-on-error-container' : ''}"
				disabled={isSubmitted}
			>
				<div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-bold font-label shrink-0 opacity-80">
					{option.id}
				</div>
				<span class="font-medium flex-1">{option.text}</span>
				
				{#if isSubmitted && option.isCorrect}
					<span class="material-symbols-outlined">check_circle</span>
				{/if}
				{#if isSubmitted && selectedAnswer === option.id && !option.isCorrect}
					<span class="material-symbols-outlined">cancel</span>
				{/if}
			</button>
		{/each}
	</div>

	<div class="mb-12">
		<button 
			onclick={submitAnswer}
			class="w-full py-4 rounded-xl font-bold text-lg transition-transform 
			{selectedAnswer ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg hover:scale-[1.02] active:scale-[0.98]' : 'bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-50'}"
			disabled={!selectedAnswer || isSubmitted}
		>
			Antwort bestätigen
		</button>
	</div>

	{#if isSubmitted}
		<div class="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{#each currentQuestion.facts as fact}
				<div class="bg-surface-container-low p-6 rounded-md border border-outline-variant/10">
					<span class="material-symbols-outlined text-tertiary mb-3">{fact.icon}</span>
					<h4 class="text-on-surface font-bold text-lg mb-2">{fact.title}</h4>
					<p class="text-on-surface-variant text-sm leading-relaxed">{fact.desc}</p>
				</div>
			{/each}
		</div>
		
		<div class="mt-8">
			<button 
				onclick={nextQuestion}
				class="w-full bg-surface-variant text-on-surface py-4 rounded-xl font-bold text-lg border border-outline-variant/20 hover:bg-surface-container-highest transition-colors flex justify-center items-center gap-2"
			>
				{currentIndex < allQuestions.length - 1 ? 'Nächste Frage' : 'Ergebnisse anzeigen'}
				<span class="material-symbols-outlined text-xl">
					{currentIndex < allQuestions.length - 1 ? 'arrow_forward' : 'done_all'}
				</span>
			</button>
		</div>
	{/if}
</main>