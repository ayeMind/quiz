import { PageLayout } from "../../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import { getAllQuizzesByUserId } from "../../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../../app/interfaces";
import globalStore from "../../app/globalStore";

import CatalogNavigate from "../../shared/components/catalog/CatalogNavigate";
import QuizList from "../../shared/components/catalog/QuizList";
import Search from "../../shared/components/catalog/Search";
import CreateBtn from "../../shared/components/catalog/CreateBtn";

export const MyQuizzes = observer(() => {
  const param = useParams().page;
  const [page, setPage] = useState(1);
  const [quizzesAmount, setQuizzesAmount] = useState(0);

  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([] as Quiz[]);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([] as Quiz[]);
  const [hasQuizzes, setHasQuizzes] = useState(false);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {
      if (!globalStore.isAutorized) {
        navigate("/");
      }
    }, 200);

    if (globalStore.user_id !== -1) {
      getAllQuizzesByUserId(globalStore.user_id.toString())
        .then((data) => {
          if (data.success) {
            const quizzes = data.data;
            setQuizzes(quizzes);
            setFilteredQuizzes(quizzes);
            setQuizzesAmount(quizzes.length);

            if (quizzes.length > 0) {
              setHasQuizzes(true);
            }

            setLoading(false);

          } else {
            console.log("Ошибка при получении всех викторин");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      if (param) {
        setPage(parseInt(param));
      }
    }
  }, [page, param]);

  useEffect(() => {
    setQuizzesAmount(filteredQuizzes.length);
    setDisplayedQuizzes(filteredQuizzes.slice((page - 1) * 10, page * 10));
  }, [filteredQuizzes, page]);

  return (
    <PageLayout className="h-auto min-h-screen">
      {loading ? ( // Если данные загружаются, отобразить крутящееся колесо
        <div className="flex items-center justify-center h-screen">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : hasQuizzes ? (
        <div className="flex flex-col items-center h-auto">
          <Search setFilteredQuizzes={setFilteredQuizzes} quizzes={quizzes} />

          <QuizList quizzes={displayedQuizzes} isOwner={true} />
          <CreateBtn />

          <CatalogNavigate
            currentPage={page}
            totalPages={Math.ceil(quizzesAmount / 10)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-[42px]">У вас пока нет своих викторин</h2>
          <CreateBtn />
        </div>
      )}
    </PageLayout>
  );
});
