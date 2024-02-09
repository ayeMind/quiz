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
    answer: number;
}
export interface Quiz {
    title: string;
    description: string;
    preview: string;
    tags: string[];
    questions: Question[];
}