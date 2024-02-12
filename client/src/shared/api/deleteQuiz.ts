export async function deleteQuiz(quizId: string) {
    try {
        const response = await fetch(`http://localhost:8000/quiz/${quizId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete quiz');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
