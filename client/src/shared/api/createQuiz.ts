import { Quiz } from "../../app/interfaces"

export default function createQuiz(quiz: Quiz) {
  return fetch('/quiz/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  }).then((res) => res.json())
}