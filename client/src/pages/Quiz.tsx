import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

import { getQuizById } from "../shared/api/getQuizzes";
import { Question } from "../app/interfaces";

const Quiz = observer(() => {
    
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<Question[]>([]); 
    const { quizId } = useParams();

    useEffect(() => {
        
    quizId && getQuizById(quizId).then((res) => {
        if (!res.success) {
            navigate('/PageNotFound');
        } else {
            setQuestions(res.data.questions);
        }
    });
    
    }, []);

    

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [btnIsClicked, setBtnIsClicked] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const quizQuestion = questions.map((question, questionIndex) => {

        const options = question.options.map((option, optionIndex) => {

            const handleClick = () => {

                setBtnIsClicked(true);

                const buttons = document.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    
                    btn.classList.add('pointer-events-none');
                });
                
                const btn = document.getElementById(optionIndex.toString());
                
                if (optionIndex === question.answer) {
                    btn?.classList.add('bg-green-400', 'dark:bg-green-400');
                    btn?.classList.remove('bg-white', 'dark:bg-[#060E24]');
                } else {
                    btn?.classList.add('bg-red-400', 'dark:bg-red-400');
                    btn?.classList.remove('bg-white', 'dark:bg-[#060E24]');

                    const correctBtn = document.getElementById(question.answer.toString());
                    correctBtn?.classList.add('bg-green-400', 'dark:bg-green-400');
                    correctBtn?.classList.remove('bg-white', 'dark:bg-[#060E24]');
                }
                                
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length - 1) {
                        setBtnIsClicked(false);
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                        setIsFinished(true);
                    }
                }, 1000);

               
                
            }

            return (
                <button className="btn hover:scale-105 px-[84px] bg-white dark:bg-[#060E24] rounded-3xl"
                        onClick={() => handleClick()}
                        key={optionIndex.toString()}
                        id={optionIndex.toString()}>
                    {option}
                </button>
            )
        })
    
        return (  
            <div className="flex flex-col items-center justify-center gap-[16px] h-screen w-1/2"
                 key={questionIndex}>
                <h1 className="font-bold text-center break-words select-none">Вопрос {currentQuestionIndex + 1}</h1>
                <h2 className="font-bold text-center select-none mb-[64px]">{question.question}</h2>
                <div className="flex flex-col items-center justify-center gap-[32px]">
                    {options}
                </div>

                {isFinished && 
                    <Link to="/quiz/results" className="absolute bottom-[48px] hover:scale-105 rounded-3xl">
                        Посмотреть результат
                    </Link>
                }
            </div>
        )
    })


    const calculateProgressBar = (currentIndex: number, questionsAmount: number) => {
        if (btnIsClicked) {
            return 100 / questionsAmount * (currentIndex + 1)
        }

        return 100 / questionsAmount * currentIndex;
    }

  return (
    <PageLayout showHeader={false}>
        <Link to='/' className="absolute top-4 left-4 text-[24px] flex justify-center items-center hover:scale-105 hover:underline gap-1">
            <ArrowLeft /> 
            <p>На главную</p>
        </Link>
        <div className='flex justify-center'>
            {quizQuestion[currentQuestionIndex]}
        </div>
        <div className="absolute bottom-0 w-screen h-2 bg-white dark:bg-slate-700">
            <div className="absolute bottom-0 h-2 bg-lime-400 dark:bg-white dark:opacity-70" style={{'width': `${calculateProgressBar(currentQuestionIndex, questions.length)}%`}} />   
        </div>
    </PageLayout>
  );
});

export default Quiz;
