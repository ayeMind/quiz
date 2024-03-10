export interface User {
    id: number;
    user_name: string;
    email: string;
    avatar: string;

    number_of_quizzes: number;
    completed_quizzes: number;

}

export interface createUserData {
    user_name: string;
    email: string;
    password: string;
}

export interface MainInfo {
    title: string;
    description: string;
    preview: string;
    tags: string[];
}


export  interface Option {
    score: string;
    text: string;
}
export interface Question {
    index: number;
    question: string;
    options: Option[];
    answer: number | number[];
    type: string;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    tags: string[];
    questions: Question[];
    mode: string;
}

export interface CreateQuiz {
    title: string;
    description: string;
    tags: string[];
    questions: Question[];
    mode: string;
}