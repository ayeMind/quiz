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
