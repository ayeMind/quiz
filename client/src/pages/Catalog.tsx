import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getAllQuizzes } from "../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";
import globalStore from "../app/globalStore";
import CatalogNavigate from "../shared/components/catalog/CatalogNavigate";
import Search from "../shared/components/catalog/Search";
import QuizList from "../shared/components/catalog/QuizList";

export const Catalog = observer(() => {
  const param = useParams().page;
  const [page, setPage] = useState(1);

  const [quizzesAmount, setQuizzesAmount] = useState(0);
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([] as Quiz[]);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([] as Quiz[]);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {

    setLoading(true);
    
    setTimeout(() => {
      if (!globalStore.isAutorized) {
        navigate("/login");
      }
    }, 100);

    if (param) {
      setPage(Number(param));
    }
    
    getAllQuizzes()
      .then((data) => {
        if (data.success) {
          const quizzes = data.data;
          
          setQuizzes(quizzes);
          setFilteredQuizzes(quizzes);
          setQuizzesAmount(quizzes.length);
          setLoading(false);
        } else {
          console.log("Ошибка при получении всех викторин");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, [param, page]);

  useEffect(() => {
    setQuizzesAmount(filteredQuizzes.length);
    setDisplayedQuizzes(filteredQuizzes.slice((page - 1) * 10, page * 10));
  }, [filteredQuizzes, page])

 
  return (
    <PageLayout className="relative flex flex-col items-center h-auto min-h-screen">
      {loading ? ( // Если данные загружаются
        <div className="flex items-center justify-center h-screen">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Search setFilteredQuizzes={setFilteredQuizzes} quizzes={quizzes} />
            <QuizList quizzes={displayedQuizzes} isOwner={false}/>
            <CatalogNavigate
              currentPage={page}
              totalPages={Math.ceil(quizzesAmount / 10)}
            />
        </>
      )}
    </PageLayout>
  );
});
