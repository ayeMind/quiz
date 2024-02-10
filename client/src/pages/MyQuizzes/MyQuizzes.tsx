import { PageLayout } from "../../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { getQuizzesByUserId } from "../../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../../app/interfaces";

import globalStore from "../../app/globalStore";

export const MyQuizzes = observer(() => {

  const [quizzes, setQuizzes] = useState([] as Quiz[]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!globalStore.isAutorized) {
      navigate("/login");
      return;
    }

    getQuizzesByUserId(globalStore.user_id.toString()).then((quizzes) => {
      setQuizzes(quizzes.data);
      console.log(quizzes.data);
      
    });

  }, []);

  const quizElements = quizzes.map((quiz) => {
    return (
      <div key={quiz.id}>
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
      </div>
    );
  });

  return (
    <PageLayout>
      <h1>Каталог викторин</h1>
      {quizElements}
    </PageLayout>
  );
});

