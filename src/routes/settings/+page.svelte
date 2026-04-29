<script lang="ts">
	// Importiere die globalen States
	import { quizState, playerState, settingsState, resetQuiz, resetSettings } from '$lib/state.svelte.ts';

	// Lokaler State für Schalter, die nur auf dem Gerät/temporär relevant sind
	let notificationsEnabled = $state(false);
	let hapticFeedback = $state(true);

	// Funktion zum Zurücksetzen des Fortschritts UND der Einstellungen
	function handleResetProgress() {
		if (confirm("Bist du sicher? Dein gesamter Biom-Fortschritt, alle gesammelten XP und deine Einstellungen werden gelöscht!")) {
			resetQuiz(0);
			resetSettings();
			alert("Dein Fortschritt und deine Einstellungen wurden erfolgreich zurückgesetzt.");
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
		<p class="text-on-surface-variant mt-2">Personalisiere dein Forschungs-Abenteuer.</p>
	</div>

	<div class="flex flex-col gap-8">
		
		<section>
			<h3 class="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">Personalisierung</h3>
			<div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden p-6 flex flex-col gap-6">
				
				<div class="flex flex-col gap-3">
					<label for="playerName" class="text-sm font-bold text-on-surface flex items-center gap-2">
						<span class="material-symbols-outlined text-primary">badge</span>
						Dein Forscher-Name
					</label>
					<input 
						id="playerName"
						type="text" 
						bind:value={settingsState.playerName}
						class="bg-surface-container border border-outline-variant/20 rounded-xl py-3 px-4 text-on-surface focus:outline-none focus:border-primary transition-colors w-full"
						placeholder="Gib deinen Namen ein..."
					/>
				</div>

				<div class="flex flex-col gap-3">
					<label class="text-sm font-bold text-on-surface flex items-center gap-2">
						<span class="material-symbols-outlined text-tertiary">palette</span>
						App Farbdesign
					</label>
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
						<button 
							onclick={() => settingsState.theme = 'default'} 
							class="py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 {settingsState.theme === 'default' ? 'border-[#95d4b3] bg-[#95d4b3]/10 text-[#95d4b3]' : 'border-outline-variant/20 text-on-surface-variant'}"
						>
							<div class="w-3 h-3 rounded-full bg-[#95d4b3]"></div> Wald (Standard)
						</button>
						<button 
							onclick={() => settingsState.theme = 'ocean'} 
							class="py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 {settingsState.theme === 'ocean' ? 'border-[#82c4e6] bg-[#82c4e6]/10 text-[#82c4e6]' : 'border-outline-variant/20 text-on-surface-variant'}"
						>
							<div class="w-3 h-3 rounded-full bg-[#82c4e6]"></div> Ozean
						</button>
						<button 
							onclick={() => settingsState.theme = 'savanna'} 
							class="py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 {settingsState.theme === 'savanna' ? 'border-[#e6b882] bg-[#e6b882]/10 text-[#e6b882]' : 'border-outline-variant/20 text-on-surface-variant'}"
						>
							<div class="w-3 h-3 rounded-full bg-[#e6b882]"></div> Savanne
						</button>
					</div>
				</div>

			</div>
		</section>

		<section>
			<h3 class="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">App Erlebnis</h3>
			<div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden">
				
				<div class="flex items-center justify-between p-4 border-b border-outline-variant/10">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">volume_up</span>
						<span class="font-medium text-on-surface">Umgebungs-Sounds</span>
					</div>
					<button 
						onclick={() => settingsState.soundEnabled = !settingsState.soundEnabled}
						class="w-12 h-6 rounded-full relative transition-colors duration-300 {settingsState.soundEnabled ? 'bg-primary' : 'bg-surface-container-highest'}"
					>
						<div class="w-5 h-5 bg-background rounded-full absolute top-0.5 transition-all duration-300 shadow-sm {settingsState.soundEnabled ? 'left-6' : 'left-0.5'}"></div>
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
				
				<div class="p-4 flex items-center justify-between border-b border-outline-variant/10">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">monitoring</span>
						<span class="font-medium text-on-surface">Gesammelte Gesamt-XP</span>
					</div>
					<span class="font-bold text-tertiary">{playerState.totalXp} XP</span>
				</div>

				<div class="p-4 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-on-surface-variant">workspace_premium</span>
						<span class="font-medium text-on-surface">Aktueller Rang</span>
					</div>
					<span class="font-bold text-primary">{playerState.level}</span>
				</div>
			</div>
		</section>

		<section>
			<h3 class="text-error font-label text-xs font-bold tracking-widest uppercase mb-4 pl-2">Gefahrenzone</h3>
			<div class="bg-surface-container-low rounded-2xl border border-error/20 overflow-hidden p-4">
				<p class="text-sm text-on-surface-variant mb-4">Möchtest du die App neu starten? Alle Lexikon-Einträge, gesammelten XP und deine Einstellungen werden gelöscht.</p>
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
			<span class="text-on-surface-variant text-xs font-label uppercase tracking-widest">Digital Biome v1.0.0</span>
		</div>
	</div>
</main>