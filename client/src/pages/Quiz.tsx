import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const questions = [
    {
        question: 'Какой химический элемент обозначается символом "O" в периодической таблице Менделеева?',
        answers: ['Кислород', 'Азот', 'Углерод', 'Гелий'],
        correctAnswer: 0 // Кислород
    },
    {
        question: 'Кто написал "Войну и мир"?',
        answers: ['Лев Толстой', 'Федор Достоевский', 'Иван Тургенев', 'Антон Чехов'],
        correctAnswer: 0 // Лев Толстой
    },
    {
        question: 'Какое крупнейшее озеро на планете Земля?',
        answers: ['Каспийское море', 'Озеро Байкал', 'Озеро Виктория', 'Мичиган'],
        correctAnswer: 1 // Озеро Байкал
    },
    {
        question: 'Какой год считается началом эры компьютеров?',
        answers: [1950, 1960, 1970, 1980],
        correctAnswer: 2 // 1970
    },
    {
        question: 'Какое количество планет в Солнечной системе?',
        answers: [7, 8, 9, 10],
        correctAnswer: 1 // 8
    },
    {
        question: 'Кто является автором "Гамлета"?',
        answers: ['Уильям Шекспир', 'Чарльз Диккенс', 'Жюль Верн', 'Федор Достоевский'],
        correctAnswer: 0 // Уильям Шекспир
    },
    {
        question: 'Какой язык программирования был разработан в 1995 году компанией Sun Microsystems?',
        answers: ['Java', 'C++', 'Python', 'Ruby'],
        correctAnswer: 0 // Java
    },
    {
        question: 'Какое событие считается началом Первой мировой войны?',
        answers: ['Убийство Архидука Франца Фердинанда', 'Подписание Третьего Рейха', 'Большевистская революция', 'Война во Вьетнаме'],
        correctAnswer: 0 // Убийство Архидука Франца Фердинанда
    },
    {
        question: 'Как называется самая длинная река в мире?',
        answers: ['Амазонка', 'Нил', 'Янцзы', 'Миссисипи'],
        correctAnswer: 1 // Нил
    },
    {
        question: 'Кто был первым человеком, отправившимся в космос?',
        answers: ['Юрий Гагарин', 'Нил Армстронг', 'Лаика', 'Юрий Долгорукий'],
        correctAnswer: 0 // Юрий Гагарин
    },
];



const Quiz = observer(() => {
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [btnIsClicked, setBtnIsClicked] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const quizQuestion = questions.map((question, questionIndex) => {

        const answers = question.answers.map((answer, answerIndex) => {

            const handleClick = () => {

                setBtnIsClicked(true);

                const buttons = document.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    btn.classList.add('pointer-events-none');
                });
                
                const btn = document.getElementById(answerIndex.toString());
                
                if (answerIndex === question.correctAnswer) {
                    btn?.classList.add('bg-green-400', 'dark:bg-green-400');
                } else {
                    btn?.classList.add('bg-red-400', 'dark:bg-red-400');

                    const correctBtn = document.getElementById(question.correctAnswer.toString());
                    correctBtn?.classList.add('bg-green-400', 'dark:bg-green-400');
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
                        key={answerIndex}
                        id={answerIndex.toString()}>
                    {answer}
                </button>
            )
        })
    
        return (  
            <div className="flex flex-col items-center justify-center gap-[16px] h-screen w-1/2"
                 key={questionIndex}>
                <h1 className="font-bold text-center break-words select-none">Вопрос {currentQuestionIndex + 1}</h1>
                <h2 className="font-bold text-center select-none mb-[64px]">{question.question}</h2>
                <div className="flex flex-col items-center justify-center gap-[32px]">
                    {answers}
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
