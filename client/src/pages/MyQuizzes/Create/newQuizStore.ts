import { makeAutoObservable } from "mobx";
import { Question, CreateQuiz } from "../../../app/interfaces";
import globalStore from "../../../app/globalStore";

function createNewQuizStore() {
  return makeAutoObservable({

    settings: {
      ready: false,
      type: "",
      withMultiplyAnswers: false,
    },

    setType(type: string) {
      this.settings.type = type
    },

    setMultiplyMode(mode: boolean) {
      this.settings.withMultiplyAnswers = mode
    },
  
    checkSettings() {
      if (this.settings.type) {
        this.settings.ready = true
      }
    },
  
    mainInfo: {
      title: "",
      description: "",
      tags: [""],
    },

    preview: {} as File,
    previewIsLoaded: false,

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

    quiz: {} as CreateQuiz,

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
      this.preview = preview;
    },

    changePreviewIsLoaded() {
      this.previewIsLoaded = this.previewIsLoaded ? false : true
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
        ...this.mainInfo,
        questions: this.questions,
        author_id: globalStore.user_id
      };

      this.quiz = quiz;
    },

    clear() {
      this.mainInfo = {
        title: "",
        description: "",
        tags: [""],
      },
  
      this.preview = {} as File,
      this.previewIsLoaded = false,

      this.questions = [
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
  
            this.quiz = {} as CreateQuiz;
            
          },

      });



}


const newQuizStore = createNewQuizStore();
export default newQuizStore;