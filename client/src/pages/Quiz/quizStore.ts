import { makeAutoObservable } from "mobx";


function createQuizStore() {
  return makeAutoObservable({

    maxScore: 0,
    setMaxScore(value: number) {
        this.maxScore = value;
    },

    score: 0,
    incrementScore() {
        this.score++;
    },

    addScore(value: number) {
        this.score += value;
    },

    resetScore() {
        this.score = 0;
    },

  });
}

const quizStore = createQuizStore();
export default quizStore;