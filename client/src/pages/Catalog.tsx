import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getQuizzes } from "../shared/api/getQuizzes";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";
import { getQuizzesAmount } from "../shared/api/getQuizzesAmount";
import globalStore from "../app/globalStore";
import CatalogNavigate from "../shared/components/CatalogNavigate";

export const Catalog = observer(() => {
  const param = useParams().page;
  const [page, setPage] = useState(1);

  const [quizzesAmount, setQuizzesAmount] = useState(0);
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [search, setSearch] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([] as Quiz[]);
  const [loading, setLoading] = useState(true)

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

    getQuizzesAmount()
      .then((amount) => {
        setQuizzesAmount(amount);
      })
      .catch((error) => {
        console.log(error);
      });

    if (param) {
      setPage(Number(param));
    }

    setLoading(true);

    if (page * 10 > quizzesAmount) {
      getQuizzes((page - 1) * 10, quizzesAmount)
        .then((quizzes) => {
          setQuizzes(quizzes.data);
          setFilteredQuizzes(quizzes.data);
          setLoading(false); 
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getQuizzes((page - 1) * 10, page * 10)
        .then((quizzes) => {
          setQuizzes(quizzes.data);
          setFilteredQuizzes(quizzes.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [param, page, quizzesAmount]);

  const startQuiz = (e: React.MouseEvent<HTMLImageElement>) => {
    const quizId = e.currentTarget.id;
    navigate(`/quiz/${quizId}`);
  };

  const quizElements = filteredQuizzes.map((quiz) => {
    return (
      <div key={quiz.id} className="flex flex-col items-center text-center">
        <h2>{quiz.title}</h2>
        <div id={quiz.id.toString()} 
             className="overflow-hidden h-[243px] w-[432px] rounded-md cursor-pointer hover:opacity-95" onClick={startQuiz}
             style={{"backgroundImage": `url(http://localhost:8000/quiz/preview/${quiz.id})`, "backgroundSize": "100% 100%"}}
             >
          {/* <img
            id={quiz.id.toString()}
            src={`http://localhost:8000/quiz/preview/${quiz.id}`}
            className="object-cover h-[243px] w-[432px] rounded-md cursor-pointer hover:opacity-95"
            onClick={startQuiz}
          /> */}
        </div>
      </div>
    );
  });

  return (
    <PageLayout className="relative flex flex-col items-center h-auto min-h-screen">
      {loading ? ( // Если данные загружаются
        <div className="flex items-center justify-center h-screen">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </PageLayout>
  );
});
