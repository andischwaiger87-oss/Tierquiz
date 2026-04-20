// Das ist unser globaler Zustand (State)
export const quizState = $state({
	correctAnswers: 0,
	totalQuestions: 0,
	earnedXp: 0
});

// Eine Funktion, um das Quiz vor dem Start zurückzusetzen
export function resetQuiz(total: number) {
	quizState.correctAnswers = 0;
	quizState.totalQuestions = total;
	quizState.earnedXp = 0;
}

// Eine Funktion, um eine richtige Antwort zu werten
export function addCorrectAnswer(xp: number = 50) {
	quizState.correctAnswers += 1;
	quizState.earnedXp += xp;
}