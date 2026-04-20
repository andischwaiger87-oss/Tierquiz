<script lang="ts">
	import { quizState, resetQuiz } from '$lib/state.svelte.ts';

	// Lokaler State für die Schalter (Toggles)
	let soundEnabled = $state(true);
	let notificationsEnabled = $state(false);
	let hapticFeedback = $state(true);

	// Funktion zum Zurücksetzen des Fortschritts
	function handleResetProgress() {
		if (confirm("Bist du sicher? Dein gesamter Biom-Fortschritt und alle gesammelten XP werden gelöscht!")) {
			resetQuiz(0);
			alert("Dein Fortschritt wurde erfolgreich zurückgesetzt.");
		}
	}
</script>

<main class="min-h-screen bg-background text-on-background pb-32 px-6 md:px-12 max-w-3xl mx-auto pt-12">
	
	<div class="mb-10">
		<button onclick={() => history.back()} class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6">
			<span class="material-symbols-outlined">arrow_back</span>
			<span class="font-bold text-sm">Zurück</span>
		</button>
		<h1 class="text-4xl font-extrabold tracking-tight text-on-surface">Einstellungen</h1>
	</div>

	<div class="flex flex-col gap-8">
		
		<section>
			<h3 class="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">App Erlebnis</h3>
			<div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden">
				
				<div class="flex items-center justify-between p-4 border-b border-outline-variant/10">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">volume_up</span>
						<span class="font-medium text-on-surface">Umgebungs-Sounds</span>
					</div>
					<button 
						onclick={() => soundEnabled = !soundEnabled}
						class="w-12 h-6 rounded-full relative transition-colors duration-300 {soundEnabled ? 'bg-primary' : 'bg-surface-container-highest'}"
					>
						<div class="w-5 h-5 bg-background rounded-full absolute top-0.5 transition-all duration-300 shadow-sm {soundEnabled ? 'left-6' : 'left-0.5'}"></div>
					</button>
				</div>

				<div class="flex items-center justify-between p-4 border-b border-outline-variant/10">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">vibration</span>
						<span class="font-medium text-on-surface">Vibration (Haptik)</span>
					</div>
					<button 
						onclick={() => hapticFeedback = !hapticFeedback}
						class="w-12 h-6 rounded-full relative transition-colors duration-300 {hapticFeedback ? 'bg-primary' : 'bg-surface-container-highest'}"
					>
						<div class="w-5 h-5 bg-background rounded-full absolute top-0.5 transition-all duration-300 shadow-sm {hapticFeedback ? 'left-6' : 'left-0.5'}"></div>
					</button>
				</div>

				<div class="flex items-center justify-between p-4">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">notifications</span>
						<span class="font-medium text-on-surface">Push-Benachrichtigungen</span>
					</div>
					<button 
						onclick={() => notificationsEnabled = !notificationsEnabled}
						class="w-12 h-6 rounded-full relative transition-colors duration-300 {notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'}"
					>
						<div class="w-5 h-5 bg-background rounded-full absolute top-0.5 transition-all duration-300 shadow-sm {notificationsEnabled ? 'left-6' : 'left-0.5'}"></div>
					</button>
				</div>
			</div>
		</section>

		<section>
			<h3 class="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">Profil & Daten</h3>
			<div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden">
				
				<button class="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors border-b border-outline-variant/10">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">person</span>
						<span class="font-medium text-on-surface">Profil bearbeiten</span>
					</div>
					<span class="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
				</button>
				
				<div class="p-4 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">monitoring</span>
						<span class="font-medium text-on-surface">Gesammelte XP</span>
					</div>
					<span class="font-bold text-tertiary">{$quizState.earnedXp} XP</span>
				</div>
			</div>
		</section>

		<section>
			<h3 class="text-error font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">Gefahrenzone</h3>
			<div class="bg-surface-container-low rounded-2xl border border-error/20 overflow-hidden p-4">
				<p class="text-sm text-on-surface-variant mb-4">Möchtest du die App neu starten? Alle Lexikon-Einträge und Abzeichen werden gesperrt.</p>
				<button 
					onclick={handleResetProgress}
					class="w-full bg-error-container text-on-error-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-error hover:text-on-error transition-colors"
				>
					<span class="material-symbols-outlined text-[20px]">delete_forever</span>
					Fortschritt zurücksetzen
				</button>
			</div>
		</section>

		<div class="text-center mt-8">
			<span class="text-on-surface-variant text-xs font-label">Digital Biome v1.0.0</span>
		</div>
	</div>
</main>