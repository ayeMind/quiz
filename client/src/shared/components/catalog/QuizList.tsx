import { useNavigate } from "react-router";
import { Quiz } from "../../../app/interfaces";
import { deleteQuiz } from "../../api/deleteQuiz";
import { XCircle } from "lucide-react";
import globalStore from "../../../app/globalStore";
import { userRemoveCount } from "../../api/updateUser";

interface Props {
  quizzes: Quiz[];
  isOwner: boolean;
}

const QuizList = ({ quizzes, isOwner }: Props) => {
  const navigate = useNavigate();

  const quizElements = quizzes.map((quiz) => {
    const handleDeleteQuiz = (quizId: string) => {
      deleteQuiz(quizId);
      userRemoveCount(globalStore.user_id.toString())
        .then((res) => {
          if (res.success_user) {
              location.reload();
          } else {
            console.log("Ошибка при удалении");
          }
        })
      
    };

    const startQuiz = (e: React.MouseEvent) => {
      const quizId = e.currentTarget.id;
      navigate(`/quiz/${quizId}`);
    };

    return (
      <div key={quiz.id} className="flex flex-col items-center text-center">
        <h2>{quiz.title}</h2>
        <button
          id={quiz.id.toString()}
          className="relative h-[243px] w-[432px] rounded-md hover:opacity-80 cursor-pointer"
          onClick={startQuiz}
          style={{
            backgroundImage: `url("http://localhost:8000/quiz/preview/${quiz.id}")`,
            backgroundSize: "100% 100%",
          }}
        >
          {isOwner && (
            <XCircle
              className="absolute text-red-600 cursor-pointer hover:text-red-900 top-2 right-2 hover:scale-105"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteQuiz(quiz.id.toString());
              }}
            />
          )}
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-y-[64px] gap-x-[128px] mt-20 mb-8">
        {quizElements}
      </div>
    </>
  );
};

export default QuizList;
