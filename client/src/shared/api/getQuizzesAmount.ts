const headers = {
  accept: "application/json",
};

export function getQuizzesAmount() {
  return fetch("http://localhost:8000/quiz/amount/", {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

export function getUserQuizzesAmount(user_id: number) {
  return fetch(`http://localhost:8000/quiz/amount/${user_id}`, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}
