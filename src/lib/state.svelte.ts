import { browser } from '$app/environment';
import quizData from '$lib/data/quiz_database.json';

// Wir berechnen automatisch die Gesamtzahl der Tiere aus deiner JSON-Datei
const totalAnimals = quizData.biomes.reduce((sum, biome) => sum + biome.animals.length, 0);

// --- INITIALISIERUNG FÜR LOKALEN SPEICHER (Langzeitgedächtnis) ---

// Standard-Werte für das Spielerprofil
let initialPlayerState = {
	totalXp: 0,
	level: "Novize",
	collectedSpecies: [] as string[],
	totalSpecies: totalAnimals
};

// Standard-Werte für die Einstellungen
let initialSettingsState = {
	playerName: "Explorer",
	theme: "default", // Unser neues Feld für die Farb-Themes
	difficulty: "Entdecker",
	soundEnabled: true
};

// Wenn die App im Browser läuft, laden wir die gespeicherten Daten
if (browser) {
	const storedPlayer = localStorage.getItem('playerState');
	if (storedPlayer) {
		initialPlayerState = { ...initialPlayerState, ...JSON.parse(storedPlayer) };
		// Wichtig: Falls du neue Tiere in die JSON einfügst, aktualisieren wir hier die Maximalzahl!
		initialPlayerState.totalSpecies = totalAnimals;
	}
	
	const storedSettings = localStorage.getItem('settingsState');
	if (storedSettings) {
		initialSettingsState = { ...initialSettingsState, ...JSON.parse(storedSettings) };
	}
}

// --- SVELTE 5 STATES ---

// GLOBALER STATE: Für das Spielerprofil & das Lexikon
export const playerState = $state(initialPlayerState);

// EINSTELLUNGEN-STATE: Personalisierung der App
export const settingsState = $state(initialSettingsState);

// SESSION-STATE: Für den aktuellen Quiz-Durchlauf (wird NICHT für immer gespeichert)
export const quizState = $state({
	correctAnswers: 0,
	totalQuestions: 0,
	earnedSessionXp: 0
});

export const nextLevelXp = 1000; 

// --- FUNKTIONEN ---

// Setzt das aktuelle Quiz zurück
export function resetQuiz(total: number) {
	quizState.correctAnswers = 0;
	quizState.totalQuestions = total;
	quizState.earnedSessionXp = 0;
}

// Zählt Punkte für die Session UND global!
export function addXp(xp: number = 150) {
	// Session aktualisieren
	quizState.correctAnswers += 1;
	quizState.earnedSessionXp += xp;

	// Globales Profil aktualisieren
	playerState.totalXp += xp;
	
	// Simples Level-System prüfen
	if (playerState.totalXp >= 1500) playerState.level = "Spitzenprädator";
	else if (playerState.totalXp >= 500) playerState.level = "Fährtensucher";
}

// Schaltet ein Tier im Lexikon dauerhaft frei
export function unlockAnimal(animalId: string) {
	if (!playerState.collectedSpecies.includes(animalId)) {
		playerState.collectedSpecies.push(animalId);
	}
}

// Setzt alle Einstellungen auf die Standardwerte zurück
export function resetSettings() {
	settingsState.playerName = "Explorer";
	settingsState.theme = "default";
	settingsState.difficulty = "Entdecker";
	settingsState.soundEnabled = true;
}