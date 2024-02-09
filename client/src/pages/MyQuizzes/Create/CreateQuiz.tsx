import { useState, useRef, useEffect } from "react";
import FormCell from "../../../shared/components/FormCell";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import FormMain from "../../../shared/components/FormMain";
import createQuiz from "../../../shared/api/createQuiz";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([Math.random().toString(), Math.random().toString(), Math.random().toString()]);

  const handleDeleteQuestion = (questionId: string) => {
    if (questions.length === 3) {
      alert("Викторина должна содержать минимум 3 вопроса");
      return;
    }
    const newQuestions = questions.filter((question) => question !== questionId);
    setQuestions(newQuestions);
  }

  const questionForms = questions.map((question, index) => {
    return <FormCell key={question} index={index} questionId={question} onDelete={handleDeleteQuestion} />
  });

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
            Викторина не может содержать меньше 3 и больше 50 вопровов
          </label>
          <div ref={endOfPageRef} />
        </div>
      </div>
    </PageLayout>
  );
}
