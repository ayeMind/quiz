export interface User {
    id: number;
    user_name: string;
    email: string;
    avatar: string;
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

export interface Question {
    index: number;
    question: string;
    options: string[];
    answer: number | number[];
    type: string;
}
export interface Quiz {
    id: number;
    title: string;
    description: string;
    tags: string[];
    questions: Question[];
}

export interface CreateQuiz {
    title: string;
    description: string;
    tags: string[];
    questions: Question[];
}