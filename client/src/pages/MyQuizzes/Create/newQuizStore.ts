import { makeAutoObservable } from "mobx";
import { Question, Quiz } from "../../../app/interfaces";

function createNewQuizStore() {
  return makeAutoObservable({
    mainInfo: {
      title: "",
      description: "",
      preview: "",
      tags: [""],
    },

    questions: [
      {
        index: 0,
        question: "",
        options: ["", "", ""],
        answer: -1,
      },

      {
        index: 1,
        question: "",
        options: ["", "", ""],
        answer: -1,
      },

      {
        index: 2,
        question: "",
        options: ["", "", ""],
        answer: -1,
      },
    ] as Question[],

    quiz: {} as Quiz,

    // ----------------- MainInfo -----------------


    deleteTag(index: number) {
      this.mainInfo.tags.splice(index, 1);
    },

    addTag(tag: string) {
      this.mainInfo.tags.push(tag);
    },

    changeTitle(title: string) {
      this.mainInfo.title = title;
    },

    changeDescription(description: string) {
      this.mainInfo.description = description;
    },

    changePreview(preview: File) {
      this.mainInfo.preview = preview.toString();
    },



    // ----------------- Question -----------------

    addQuestion(question: Question) {
      this.questions.push(question);
    },

    deleteQuestion(index: number) {
      this.questions.splice(index, 1);
    },

    changeQuestionText(index: number, question: string) {
      this.questions[index].question = question;
    },

    changeOption(index: number, optionIndex: number, value: string) {
      this.questions[index].options[optionIndex] = value;
    },

    addOption(index: number) {
      if (this.questions[index].options.length < 6) {
        this.questions[index].options.push("");
      }
    },
  
    deleteOption(index: number, optionIndex: number) {
      if (this.questions[index].options.length === 3) return;
      this.questions[index].options.splice(optionIndex, 1);

      if (this.questions[index].answer === optionIndex) {
        this.questions[index].answer = -1;
      }
    }, 

    changeAnswer(index: number, answer: number) {
      this.questions[index].answer = answer;
    },

    changeQuestion(index: number, question: Question) {
      this.questions[index] = question;
    },

    
    createQuiz() {
      const quiz = {
        title: this.mainInfo.title,
        description: this.mainInfo.description,
        preview: this.mainInfo.preview,
        tags: this.mainInfo.tags,
        questions: this.questions,
      };

      this.quiz = quiz;
    }
  });

}


const newQuizStore = createNewQuizStore();
export default newQuizStore;