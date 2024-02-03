export default function getUserInfo(token: string) {
    const url = 'http://localhost:8000/auth/user/';
    const headers = {
        'accept': 'application/json', 
        'Authorization': `Bearer ${token}`
    };

    return fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                return { success_user: true, user_data: data };
            } else {
                return { success_user: false, user_data: data};
            }
        })
        .catch(user_data => {
            console.error('Ошибка при отправке запроса:', user_data);
            return { success_user: false, user_data };
        });
}