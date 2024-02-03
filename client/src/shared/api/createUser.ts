import { createUserData } from "../../app/interfaces";

export default function createUser(data: createUserData) {
    const url = 'http://localhost:8000/auth/sign-up/';
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(tokenData => {
            if (tokenData.access_token) {
                return { success_create: true, token: tokenData};
            } else {
                return { success_create: false, token: tokenData};
            }
        })
        .catch(tokenData => {
            console.error('Ошибка при отправке запроса:', tokenData);
            return { success_create: false, token: tokenData };
        });
}