import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import globalStore from "../app/globalStore";
import { getQuizzes } from "../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";

export const Catalog = observer(() => {

  const [quizzes, setQuizzes] = useState([] as Quiz[]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!globalStore.isAutorized) {
      navigate("/login");
      return;
    }

    getQuizzes(0, 10).then((quizzes) => {
      setQuizzes(quizzes.data);
    });

  }, []);


  const quizElements = quizzes.map((quiz) => {
    return (
      <div key={quiz.id}>
        <h2>{quiz.title}</h2>
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
