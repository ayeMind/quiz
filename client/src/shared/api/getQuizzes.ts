export function getQuizById(id: string) {
  return fetch(`/api/quizzes/${id}`).then((res) => res.json());
}

export function getQuizzes(skip: number, limit: number) {
    return fetch(`/api/quizzes?skip=${skip}&limit=${limit}`).then((res) => res.json());
}

export function getQuizzesByAuthorId(author_id: string) {
    return fetch(`/api/quizzes/author/${author_id}`).then((res) => res.json());
}