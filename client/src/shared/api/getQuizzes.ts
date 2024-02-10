const url = 'http://localhost:8000/quiz/';
const headers = {
    'accept': 'application/json'
};
 
export function getQuizzes(skip: number, limit: number) {
    return fetch(url + `?skip=${skip}&limit=${limit}`, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                return { success: true, data: data };
            } else {
                return { success: false, data: data};
            }
        })
        .catch(quizzes_data => {
            console.error('Ошибка при отправке запроса:', quizzes_data);
            return { success: false, data: quizzes_data };
        });
}

export function getQuizById(id: string) {
    return fetch(url + id, { headers })
        .then(response => response.json())
        .then(data => {
            if (data) {
                return { success: true, data: data };
            } else {
                return { success: false, data: data};
            }
        })
        .catch(quiz_data => {
            console.error('Ошибка при отправке запроса:', quiz_data);
            return { success: false, data: quiz_data};
        });
}

export function getQuizzesByUserId(id: string) {
    return fetch(url + `user/${id}`, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                return { success: true, data: data };
            } else {
                return { success: false, data: data};
            }
        })
        .catch(quizzes_data => {
            console.error('Ошибка при отправке запроса:', quizzes_data);
            return { success: false, data: quizzes_data};
        });
}