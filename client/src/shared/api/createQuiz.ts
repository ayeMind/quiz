import { Quiz } from "../../app/interfaces"

export default function createQuiz(quiz: Quiz) {
  return fetch('http://localhost:8000/quiz/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  }).then((res) => res.json())
} 