import { useState, useRef, useEffect } from "react";
import FormCell from "../../../shared/ui/components/FormCell";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import FormMain from "../../../shared/ui/components/FormMain";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([0]);

  const questionForms = questions.map((question, index) => {
    return (
      <FormCell index={index} />
    )
  })


  const endOfPageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (endOfPageRef.current) {
      endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  const handleCreateQuestion = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setQuestions([...questions, questions.length]);
  }

  return (
    <PageLayout className="h-auto min-h-screen">
      <div className="flex flex-col items-center w-screen">
        <p>Создай свою собственную викторину!</p>
        <form className="flex flex-col gap-3 py-3">
          <FormMain />
          {questionForms}
          <button onClick={handleCreateQuestion}>
            Добавить вопрос
          </button>
          <div ref={endOfPageRef} />
        </form>
      </div>
    </PageLayout> 
  )
}
