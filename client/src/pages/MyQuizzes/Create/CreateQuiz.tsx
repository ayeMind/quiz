import { useState, useRef, useEffect } from "react";
import { FormCell } from "../../../shared/components/FormCell";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import {FormMain} from "../../../shared/components/FormMain";
import { useNavigate } from "react-router";

import { sendPreview } from "../../../shared/api/sendPreview";
import createQuiz from "../../../shared/api/createQuiz";
import newQuizStore from "./newQuizStore";
import globalStore from "../../../app/globalStore";


export const CreateQuiz = observer(() => {

  const [questions, setQuestions] = useState(newQuizStore.questions.map(() => Math.random().toString()));

  const navigate = useNavigate()
  
  const handleDeleteQuestion = (index: number) => {
    if (questions.length === 3) {
      alert("Викторина должна содержать минимум 3 вопроса");
      return;
    }
    newQuizStore.deleteQuestion(index);
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const questionForms = questions.map((question, index) => (
    <FormCell key={question} index={index} questionId={question} onDelete={() => handleDeleteQuestion(index)} />
  ));

  const endOfPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (endOfPageRef.current && questions.length !== 3) {
      endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  const handleCreateQuestion = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (questions.length >= 50) return;

    const newQuestionIndex = questions.length;
    newQuizStore.addQuestion({
      index: newQuestionIndex,
      question: "",
      options: ["", "", ""],
      answer: -1,
    });

    setQuestions([...questions, Math.random().toString()]);
  };

  function isCorrectFilled() {
    const quiz = newQuizStore.quiz;

    if (quiz.title === "" || quiz.description === ""  || !newQuizStore.previewIsLoaded) {
      return false;
    }

    for (let i = 0; i < quiz.questions.length; i++) {
      if (quiz.questions[i].question.length < 5 || quiz.questions[i].options.includes("") || quiz.questions[i].answer === -1) {
        return false;
      }
    }

    return true;
  }
    

  function handleCreateQuiz() {
    
    newQuizStore.createQuiz();

    const quiz = newQuizStore.quiz;


    if (!isCorrectFilled()) {
      alert("Вы что-то недозаполнили!\nВсе поля должны быть заполнены, в том числе теги и превью!\nКаждый вопрос должен состоять не менее, чем из 5 символов!")
      return;
    }

    if (!globalStore.user_id) {
      alert("Ошибка авторизации.\nПопробуйте выйти из аккаунта и зайти снова!")
      return;
    }

    createQuiz(quiz)
      .then(() => {
          alert("Викторина успешно создана!")
          sendPreview()
            .then(response => {
              console.log(response),
              newQuizStore.clear()
              navigate("/my-quizzes")
            })
          
      })  
      .catch((error) => {
        alert("Ошибка при создании викторины");
        console.error(error);
      });
  }


  return (
    <PageLayout className="h-auto min-h-screen">
      <div className="flex flex-col items-center w-screen">
        <p>Создай свою собственную викторину!</p>
        <div className="flex flex-col gap-3 py-3">
          <FormMain />
          {questionForms}
          {questions.length < 50 && (
            <button onClick={handleCreateQuestion}>Добавить вопрос</button>
          )}

          <label className="opacity-45 text-[18px] text-center">
            Викторина не может содержать меньше 3 и больше 50 вопросов
          </label>
          <div ref={endOfPageRef} />
        </div>

        <button className="p-2 mb-4 text-white bg-blue-500 rounded-2xl hover:bg-blue-700" 
          onClick={handleCreateQuiz}>Создать викторину</button>
      </div>
    </PageLayout>
  );
});

export default CreateQuiz;
