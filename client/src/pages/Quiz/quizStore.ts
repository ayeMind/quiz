import { makeAutoObservable } from "mobx";


function createQuizStore() {
  return makeAutoObservable({

    maxScore: 0,
    setMaxScore(value: number) {
        this.maxScore = value;
    },

    score: 0,
  
    addScore(value: string) {
        const score = parseInt(value);
        this.score += score;
    },

    resetScore() {
        this.score = 0;
    },

  });
}

const quizStore = createQuizStore();
export default quizStore;