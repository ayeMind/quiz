import { useState } from "react";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

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
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const quizQuestion = questions.map((question, questionIndex) => {

        const answers = question.answers.map((answer, answerIndex) => {

            const handleClick = () => {
                if (currentQuestionIndex >= questions.length - 1) {
                    console.log('Вопросы кончились!');
                }
                setCurrentQuestionIndex(prev => prev + 1)
            }

            return (
                <button className="hover:scale-[1.1] px-[124px] bg-white dark:bg-slate-800 rounded-3xl"
                        onClick={() => handleClick()}
                        key={answerIndex}>
                    {answer}
                </button>
            )
        })
    
        return (  
            <div className="flex flex-col items-center justify-center gap-[32px] w-screen h-screen"
                 key={questionIndex}>
                <h1 className="sm:static lg:absolute top-[54px] left-1/2 lg:-translate-x-1/2 font-bold text-center">Вопрос {currentQuestionIndex + 1}</h1>
                <h2 className="sm:static lg:absolute top-[128px] left-1/2 lg:-translate-x-1/2 font-bold text-center">{question.question}</h2>
                {answers}
            </div>
        )
    })

  return (
    <PageLayout showHeader={false}>
        {quizQuestion[currentQuestionIndex]}
    </PageLayout>
  );
});

export default Quiz;
