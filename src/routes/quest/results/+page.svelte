<script lang="ts">
	import { quizState } from '$lib/state.svelte.ts';
	import { onMount } from 'svelte';

	let correctAnswers = $derived(quizState.correctAnswers);
	let totalQuestions = $derived(quizState.totalQuestions);
	let missedFacts = $derived(totalQuestions - correctAnswers);
	let earnedXp = $derived(quizState.earnedXp);
	
	let targetMasteryScore = $derived(totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0);
	
	// Neuer State für die Animation: Startet bei 0
	let animatedScore = $state(0);

	onMount(() => {
		// Kurz nach dem Laden füllen wir den Ring auf den Zielwert
		setTimeout(() => {
			animatedScore = targetMasteryScore;
		}, 300);
	});
</script>
<main class="min-h-screen bg-background text-on-background pb-32 px-6 md:px-12 max-w-3xl mx-auto pt-8">
	
	<div class="relative w-full rounded-[2rem] overflow-hidden bg-surface-container-low p-10 flex flex-col items-center text-center mb-8 border border-outline-variant/10 shadow-[0px_20px_40px_rgba(0,0,0,0.2)]">
		<div class="absolute inset-0 bg-gradient-to-br from-tertiary-container/20 to-transparent"></div>
		
		<div class="relative z-10 flex flex-col items-center">
			<span class="inline-block px-4 py-1 rounded-full bg-tertiary-container text-tertiary font-label text-xs font-bold tracking-widest uppercase mb-6">
				Erfolgreich
			</span>
			<h1 class="text-5xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">Quest<br>Abgeschlossen</h1>
			<p class="text-on-surface-variant max-w-xs text-sm mb-10">Du hast die Geheimnisse der Savanne erfolgreich entschlüsselt. Dein ökologischer Fußabdruck ist gewachsen.</p>
			
			<div class="relative w-40 h-40 rounded-full bg-surface-container-highest flex items-center justify-center p-2 mb-2 shadow-inner border border-outline-variant/15">
	<svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
		<circle cx="50" cy="50" r="46" fill="transparent" stroke="var(--color-surface-container-highest)" stroke-width="8"></circle>
		<circle cx="50" cy="50" r="46" fill="transparent" stroke="var(--color-primary)" stroke-width="8" stroke-dasharray="289" stroke-dashoffset={289 - (289 * animatedScore) / 100} class="transition-all duration-[1500ms] ease-out"></circle>
	</svg>
	<div class="relative flex flex-col items-center">
		<span class="text-4xl font-extrabold text-on-surface">{animatedScore}%</span>
		<span class="text-[9px] font-label tracking-widest uppercase text-primary mt-1">Meistergrad</span>
	</div>
</div>
		</div>
	</div>

	<div class="bg-surface-container-low rounded-2xl p-8 flex flex-col items-center text-center mb-8 border border-outline-variant/10">
		<div class="w-24 h-24 mb-4 rounded-full bg-surface-container-highest flex items-center justify-center shadow-[0px_10px_20px_rgba(0,0,0,0.3)] border border-tertiary/20">
			<span class="material-symbols-outlined text-5xl text-tertiary" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
		</div>
		<h3 class="text-xl font-bold text-tertiary mb-2">Steinadler-Abzeichen</h3>
		<p class="text-on-surface-variant text-sm max-w-xs">Verliehen für das korrekte Identifizieren von 4+ hochalpinen Arten.</p>
	</div>

	<div class="mb-10">
		<div class="flex items-center gap-2 mb-6">
			<span class="material-symbols-outlined text-primary">bar_chart</span>
			<h3 class="text-xl font-bold text-on-surface">Leistungsübersicht</h3>
		</div>
		
		<div class="flex flex-col gap-3">
			<div class="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/10">
				<div class="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center">
					<span class="material-symbols-outlined text-sm">check_circle</span>
				</div>
				<div class="flex flex-col">
					<span class="font-bold text-lg">{correctAnswers} / {totalQuestions}</span>
					<span class="text-[10px] font-label tracking-widest uppercase text-on-surface-variant">Richtige Antworten</span>
				</div>
			</div>
			
			<div class="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/10">
				<div class="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
					<span class="material-symbols-outlined text-sm">cancel</span>
				</div>
				<div class="flex flex-col">
					<span class="font-bold text-lg">{missedFacts} / {totalQuestions}</span>
					<span class="text-[10px] font-label tracking-widest uppercase text-on-surface-variant">Verpasste Fakten</span>
				</div>
			</div>

			<div class="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/10">
				<div class="w-10 h-10 rounded-full bg-surface-container-highest text-tertiary flex items-center justify-center">
					<span class="material-symbols-outlined text-sm">bolt</span>
				</div>
				<div class="flex flex-col">
					<span class="font-bold text-lg text-tertiary">+{earnedXp} XP</span>
					<span class="text-[10px] font-label tracking-widest uppercase text-on-surface-variant">Biom-Wachstum</span>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-4 mb-16">
		<a href="/quest" class="w-full flex justify-center bg-surface-container-low text-on-surface py-4 rounded-xl font-bold text-lg border border-outline-variant/15 hover:bg-surface-container transition-colors">
	Quiz wiederholen
</a>
		<button class="w-full bg-surface-container-low text-on-surface py-4 rounded-xl font-bold text-lg border border-outline-variant/15 hover:bg-surface-container transition-colors">
			Antworten überprüfen
		</button>
	</div>
</main>