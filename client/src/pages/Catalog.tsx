import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { getQuizzes } from "../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";

import globalStore from "../app/globalStore";

export const Catalog = observer(() => {

  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [search, setSearch] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([] as Quiz[]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredQuizzes(quizzes.filter((quiz) => quiz.title.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())));
  }

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!globalStore.isAutorized) {
        navigate("/login");
      }}, 0);

    getQuizzes(0, 10).then((quizzes) => {
      setQuizzes(quizzes.data);
      setFilteredQuizzes(quizzes.data);
    }).catch((error) => {
      console.log(error);
    });


  }, []);

  const startQuiz = (e: React.MouseEvent<HTMLImageElement>) => {
    const quizId = e.currentTarget.id;
    navigate(`/quiz/${quizId}`);
  }

  const quizElements = filteredQuizzes.map((quiz) => {

    return (
      <div key={quiz.id} className="flex flex-col items-center text-center">
        <h2>{quiz.title}</h2>
        <img id={quiz.id.toString()} src={`http://localhost:8000/quiz/preview/${quiz.id}`} className="h-[243px] w-[432px] rounded-md hover:opacity-95 cursor-pointer object-center"
             onClick={startQuiz} />
      </div>
    );
  });

  return (
    <PageLayout className="flex flex-col items-center h-auto min-h-screen">
      <div className="flex items-center gap-2">
        <input type="text" placeholder="Поиск"
               value={search} onChange={handleSearch} 
               className="w-[512px] h-[64px] rounded-md text-[24px] px-4 bg-slate-50 dark:bg-slate-700"/>
        <a href="#" className="text-[24px]">Теги</a>
      </div>
      
      <div className="grid grid-cols-2 gap-[48px] mt-[84px]">
        {quizElements}
      </div>

      <nav>
        
      </nav>
    </PageLayout>
  );
});
 