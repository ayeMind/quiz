import { ArrowLeft } from "lucide-react";
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
  const [userId, setUserId] = useState(globalStore.user_id);
  
  console.log("userId", userId);
  
  useEffect(() => {
    setUserId(globalStore.user_id);

  }, [globalStore.user_id]);
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

    setTimeout(() => {
      if (globalStore.user_id === -1) {
        navigate('/login')
      }
    }, 500)

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
      type: "standard",
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
    const errors = [];

    if (!isCorrectFilled()) {
      if (quiz.title === "") errors.push("Заголовок");
      if (quiz.description === "") errors.push("Описание");
      if (!newQuizStore.previewIsLoaded) errors.push("Превью");
      for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i].question.length < 5) errors.push(`Вопрос ${i + 1}`);
        if (quiz.questions[i].options.includes("")) errors.push(`Ответы на вопрос ${i + 1}`);
        if (quiz.questions[i].answer === -1) errors.push(`Правильный ответ на вопрос ${i + 1}`);
      }

      alert(`Вы не заполнили следующие поля:\n${errors.join('\n')}`);
      return;
    }

    if (globalStore.user_id === -1) {
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
    <PageLayout showHeader={false} className="h-auto min-h-screen">

      <button className="absolute top-4 left-4 text-[24px] flex justify-center items-center hover:scale-105 hover:underline gap-1"
              onClick={() => newQuizStore.clear()}>
        <ArrowLeft />   
        <p>Вернуться к выбору типа</p>
      </button>

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
