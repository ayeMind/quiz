import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { getQuizzes } from "../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";

import globalStore from "../app/globalStore";

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
    }).catch((error) => {
      console.log(error);
    });


  }, []);


  const quizElements = quizzes.map((quiz) => {

    const img = document.getElementById(quiz.id.toString());
    if (img) {
      img.setAttribute('src', 'http://localhost:8000/quiz/preview/' + quiz.id);
      img.classList.remove('invisible');
    }
    
    return (
      <div key={quiz.id} className="flex flex-col text-center">
        <h2>{quiz.title}</h2>
        <img id={quiz.id.toString()} className="invisible h-[256px] rounded-md"/>
      </div>
    );
  });

  return (
    <PageLayout className="flex flex-col items-center h-auto min-h-screen">
      <div className="flex items-center gap-2">
        <input type="text" placeholder="Поиск" className="w-[512px] h-[64px] rounded-md text-[24px] px-4 bg-slate-50 dark:bg-slate-700"/>
        <a href="#" className="text-[24px]">Теги</a>
      </div>
      
      <div className="grid grid-cols-2 gap-[48px] mt-[84px]">
        {quizElements}
      </div>
    </PageLayout>
  );
});
 