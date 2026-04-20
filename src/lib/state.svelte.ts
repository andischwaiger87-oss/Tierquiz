import quizData from '$lib/data/quiz_database.json';

// Wir berechnen automatisch die Gesamtzahl der Tiere aus deiner JSON-Datei
const totalAnimals = quizData.biomes.reduce((sum, biome) => sum + biome.animals.length, 0);

// SESSION-STATE: Für den aktuellen Quiz-Durchlauf
export const quizState = $state({
	correctAnswers: 0,
	totalQuestions: 0,
	earnedSessionXp: 0
});

// GLOBALER STATE: Für das Spielerprofil & das Lexikon
export const playerState = $state({
	totalXp: 0,
	level: "Novize",
	collectedSpecies: [] as string[],
	totalSpecies: totalAnimals
});

export const nextLevelXp = 1000; 

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