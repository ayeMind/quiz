import { PageLayout } from "../../shared/ui/layouts/page-layout";
import { XCircle } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getQuizzesByUserId } from "../../shared/api/getQuizzes";
import { deleteQuiz } from "../../shared/api/deleteQuiz";
import { getUserQuizzesAmount } from "../../shared/api/getQuizzesAmount";
import { useEffect, useState } from "react";
import { Quiz } from "../../app/interfaces";
import globalStore from "../../app/globalStore";

import CatalogNavigate from "../../shared/components/CatalogNavigate";

export const MyQuizzes = observer(() => {
  const param = useParams().page;
  const [page, setPage] = useState(1);
  const [quizzesAmount, setQuizzesAmount] = useState(0);

  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [search, setSearch] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([] as Quiz[]);
  const [hasQuizzes, setHasQuizzes] = useState(false);
  const [loading, setLoading] = useState(true); // Состояние загрузки данных

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredQuizzes(
      quizzes.filter((quiz) =>
        quiz.title
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      )
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!globalStore.isAutorized) {
        navigate("/login");
      }
    }, 1000);

    if (globalStore.user_id !== -1) {
      getQuizzesByUserId(globalStore.user_id.toString(), 0, 10)
        .then((quizzes) => {
          if (quizzes.data.length > 0) {
            setHasQuizzes(true);
          }
          setQuizzes(quizzes.data);
          setFilteredQuizzes(quizzes.data);
          setLoading(false); // Устанавливаем состояние загрузки как завершенное
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getUserQuizzesAmount(globalStore.user_id).then((amount) => {
      setQuizzesAmount(amount);
    });

    if (param) {
      setPage(parseInt(param));
    }

    if (page * 10 > quizzesAmount) {
      getQuizzesByUserId(
        globalStore.user_id.toString(),
        (page - 1) * 10,
        quizzesAmount
      ).then((quizzes) => {
        setQuizzes(quizzes.data);
        setFilteredQuizzes(quizzes.data);
        setLoading(false); // Устанавливаем состояние загрузки как завершенное
      });
    }
  }, [globalStore.user_id, page, quizzesAmount, param]);

  const startQuiz = (e: React.MouseEvent<HTMLImageElement>) => {
    const quizId = e.currentTarget.id;
    navigate(`/quiz/${quizId}`);
  };

  const quizElements = filteredQuizzes.map((quiz) => {
    const handleDeleteQuiz = (quizId: string) => {
      deleteQuiz(quizId);
      setTimeout(() => {
        location.reload();
      }, 50);
    };

    return (
      <div
        key={quiz.id}
        className="relative flex flex-col items-center text-center"
      >
        <h2>{quiz.title}</h2>
        <div className="relative">
          <img
            id={quiz.id.toString()}
            src={`http://localhost:8000/quiz/preview/${quiz.id}`}
            className="block h-[243px] w-[432px] rounded-md hover:opacity-95 cursor-pointer object-center"
            onClick={startQuiz}
          />
          <XCircle
            className="absolute text-red-600 cursor-pointer hover:text-red-900 top-2 right-2 hover:scale-105"
            onClick={() => {
              handleDeleteQuiz(quiz.id.toString());
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <PageLayout className={hasQuizzes ? "h-auto min-h-screen" : "h-screen"}>
      {loading ? ( // Если данные загружаются, отобразить крутящееся колесо
        <div className="flex items-center justify-center h-screen">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : hasQuizzes ? (
        <div className="flex flex-col items-center h-auto min-h-screen">
          <Link
            to="/my-quizzes/create"
            className="text-[32px] mb-4 p-2 rounded-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Создать викторину
          </Link>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={handleSearch}
              className="w-[512px] h-[64px] rounded-md text-[24px] px-4 bg-slate-50 dark:bg-slate-700"
            />
            <a href="#" className="text-[24px]">
              Теги
            </a>
          </div>

          <div className="grid grid-cols-2 gap-y-[64px] gap-x-[128px] mt-[84px] mb-[128px]">
            {quizElements}
          </div>

          <div className="absolute bottom-0 flex items-center justify-center">
            <CatalogNavigate
              currentPage={page}
              totalPages={(quizzesAmount + 9) / 10}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-[42px]">У вас пока нет своих викторин</h2>
          <Link
            to="/my-quizzes/create"
            className="text-[32px] mt-4 p-2 rounded-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Создать викторину
          </Link>
        </div>
      )}
    </PageLayout>
  )});