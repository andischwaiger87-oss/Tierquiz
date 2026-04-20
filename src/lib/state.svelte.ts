import quizData from '$lib/data/quiz_database.json';

// Wir berechnen automatisch die Gesamtzahl der Tiere aus deiner JSON-Datei
const totalAnimals = quizData.biomes.reduce((sum, biome) => sum + biome.animals.length, 0);

// 1. SESSION-STATE: Für den aktuellen Quiz-Durchlauf (dein bestehender Code)
export const quizState = $state({
	correctAnswers: 0,
	totalQuestions: 0,
	earnedSessionXp: 0
});

// 2. GLOBALER STATE: Für das Spielerprofil & das Lexikon (Neu!)
export const playerState = $state({
	totalXp: 0,
	level: "Novize",
	collectedSpecies: [] as string[],
	totalSpecies: totalAnimals
});

// Die XP, die für den nächsten Level-Aufstieg benötigt werden (für die Startseite)
export const nextLevelXp = 1000; 

// Deine bestehende Reset-Funktion (ideal für den Start eines neuen Quizzes)
export function resetQuiz(total: number) {
	quizState.correctAnswers = 0;
	quizState.totalQuestions = total;
	quizState.earnedSessionXp = 0;
}

// Deine erweiterte Funktion: Zählt jetzt Punkte für die Session UND global!
// Exportiere die Funktion als 'addXp', damit die Quest-Seite sie findet
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

// Neu: Eine Funktion, um ein Tier im Lexikon dauerhaft freizuschalten
export function unlockAnimal(animalId: string) {
	// Prüfen, ob das Tier noch nicht in der Liste ist
	if (!playerState.collectedSpecies.includes(animalId)) {
		playerState.collectedSpecies.push(animalId);
	}
}