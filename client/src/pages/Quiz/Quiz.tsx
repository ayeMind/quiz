import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "../../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

import { getQuizById } from "../../shared/api/getQuizzes";
import { Question } from "../../app/interfaces";
import quizStore from "./quizStore";
import { updateUserCompletions } from "../../shared/api/updateUser";
import globalStore from "../../app/globalStore";


const Quiz = observer(() => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const { quizId } = useParams();
  const [quizMode, setQuizMode] = useState("");

  useEffect(() => {
      
    quizStore.resetScore();


    quizId &&
      getQuizById(quizId).then((res) => {
        if (!res.success) {
          navigate("/PageNotFound");
        } else {
          setQuestions(res.data.questions);
          setQuizMode(res.data.mode);          
        }
      });
  
  }, []);


  useEffect(() => {
    if (quizMode === "standard") {
      quizStore.setMaxScore(questions.length);
    } else {
      quizStore.setMaxScore(0);
    }
  }, [quizMode, questions])


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [btnIsClicked, setBtnIsClicked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [multipleAnswers, setMultipleAnswers] = useState([] as number[]);

  useEffect(() => {
    if (isFinished) {
      updateUserCompletions(globalStore.user_id.toString());      
    }
  }, [isFinished]);

  const quizQuestion = questions.map((question, questionIndex) => {

    const options = question.options.map((option, optionIndex) => {

      // if only one option is correct  
      const handleClick =
        question.type === "standard"
          ? () => {
              setBtnIsClicked(true);

              const buttons = document.querySelectorAll(".btn");
              buttons.forEach((btn) => {
                btn.classList.add("pointer-events-none");
              });

              const btn = document.getElementById(optionIndex.toString());


              const finishQuestion = () => {
                if (currentQuestionIndex < questions.length - 1) {
                  setBtnIsClicked(false);
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  setIsFinished(true);
                }
              }
              
              if (quizMode === "standard") {
                
                if (optionIndex === question.answer) {
                  btn?.classList.add("bg-green-400", "dark:bg-green-400");
                  btn?.classList.remove("bg-white", "dark:bg-[#060E24]");
                  quizStore.addScore(option.score);
                } else {
                  btn?.classList.add("bg-red-400", "dark:bg-red-400");
                  btn?.classList.remove("bg-white", "dark:bg-[#060E24]");
  
                  const correctBtn = document.getElementById(
                    question.answer.toString()
                  );
                  correctBtn?.classList.add("bg-green-400", "dark:bg-green-400");
                  correctBtn?.classList.remove("bg-white", "dark:bg-[#060E24]");
                }
                
              } else {
                const questionOptionsScore = question.options.map((el) => parseInt(el.score));
                const maxQuestionScore = Math.max(...questionOptionsScore);

                quizStore.setMaxScore(quizStore.maxScore + maxQuestionScore);
                quizStore.addScore(option.score);
              }

              setTimeout(() => {
                finishQuestion()
              }, 1000);

            }
            // if multiple options maybe are correct
          : () => {
              const selectedBtn = document.getElementById(
                optionIndex.toString()
              );
              selectedBtn?.classList.toggle("border-lime-400");
              selectedBtn?.classList.toggle("bg-[#98FB98]");
              selectedBtn?.classList.toggle("opacity-70");

              if (multipleAnswers.includes(optionIndex)) {
                setMultipleAnswers(
                  multipleAnswers.filter((el) => el !== optionIndex)
                );
              } else {
                setMultipleAnswers([...multipleAnswers, optionIndex]);
              }
            };

      return (
        <button
          className="btn hover:scale-105 px-[84px] bg-white dark:bg-[#060E24] rounded-3xl border-4 dark:border-2"
          onClick={() => handleClick()}
          key={optionIndex.toString()}
          id={optionIndex.toString()}
        >
          {option.text}
        </button>
      );
    });

    return (
      <div
        className="flex flex-col items-center justify-center gap-[16px] h-screen w-1/2"
        key={questionIndex}
      >
        <h1 className="font-bold text-center break-words select-none">
          Вопрос {currentQuestionIndex + 1}
        </h1>
        <h2 className="font-bold text-center select-none mb-[64px]">
          {question.question}
        </h2>
        <div className="flex flex-col items-center justify-center gap-[32px]">
          {options}
        </div>

        {question.type === "multiple" && !isFinished && (
          <button
            className="mt-[64px] hover:scale-105 px-[84px] bg-white dark:bg-[#060E24] rounded-3xl border-4 dark:border-2"
            onClick={() => {


              const answers = question.answer as number[];

              const generalAnswers = multipleAnswers.filter((el) => {
                return answers.includes(el);
              });

              if (generalAnswers.length === answers.length) {
                quizStore.addScore("1");
              }
                             
              const buttons = document.querySelectorAll(".btn");
              buttons.forEach((btn) => {
                
                btn.classList.add("pointer-events-none");
                if (btn.classList.contains("border-lime-400")) {
                  btn.classList.remove("border-lime-400");
                  btn.classList.remove("bg-slate-300");
                }

                if (answers.includes(parseInt(btn.id))) {
                  btn.classList.add("bg-green-400", "dark:bg-green-400");
                  btn.classList.remove("bg-white", "dark:bg-[#060E24]");
                  btn.classList.remove("opacity-70")

                  if (!multipleAnswers.includes(parseInt(btn.id))) {
                    btn.classList.add("border-red-400", "dark:border-red-400");
                  }

                } else if (multipleAnswers.includes(parseInt(btn.id))) {
                  btn.classList.add("bg-red-400", "dark:bg-red-400");
                  btn.classList.remove("bg-white", "dark:bg-[#060E24]");
                }
              });

              setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setMultipleAnswers([]);
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  setIsFinished(true);
                }
              }, 2000);
            }}
          >
            Дальше
          </button>
        )}

        {isFinished && (
          <Link
            to="/quiz/results"
            className="absolute bottom-[48px] hover:scale-105 rounded-3xl"
          >
            Посмотреть результат
          </Link>
        )}
      </div>
    );
  });

  const calculateProgressBar = (
    currentIndex: number,
    questionsAmount: number
  ) => {
    if (btnIsClicked) {
      return (100 / questionsAmount) * (currentIndex + 1);
    }

    return (100 / questionsAmount) * currentIndex;
  };

  return (
    <PageLayout showHeader={false}>
      <Link
        to="/"
        className="absolute top-4 left-4 text-[24px] flex justify-center items-center hover:scale-105 hover:underline gap-1"
      >
        <ArrowLeft />
        <p>На главную</p>
      </Link>
      <div className="flex justify-center">
        {quizQuestion[currentQuestionIndex]}
      </div>
      <div className="absolute bottom-0 w-screen h-2 bg-white dark:bg-slate-700">
        <div
          className="absolute bottom-0 h-2 bg-lime-400 dark:bg-white dark:opacity-70"
          style={{
            width: `${calculateProgressBar(
              currentQuestionIndex,
              questions.length
            )}%`,
          }}
        />
      </div>
    </PageLayout>
  );
});

export default Quiz;
