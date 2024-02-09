import { useState, useRef, useEffect } from "react";
import { FormCell } from "../../../shared/components/FormCell";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

import newQuizStore from "./newQuizStore";
import FormMain from "../../../shared/components/FormMain";

export const CreateQuiz = observer(() => {

  const [questions, setQuestions] = useState(newQuizStore.questions.map(() => Math.random().toString()));
  
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
    if (endOfPageRef.current) {
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
      answer: 0,
    });

    setQuestions([...questions, Math.random().toString()]);
  };


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
      </div>
    </PageLayout>
  );
});

export default CreateQuiz;
