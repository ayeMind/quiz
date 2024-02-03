export default function getAllUsers() {
    const url = 'http://localhost:8000/users/';
    const headers = {
        'accept': 'application/json'
    };

    return fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                return { success_users: true, users_data: data };
            } else {
                return { success_users: false, users_data: data};
            }
        })
        .catch(users_data => {
            console.error('Ошибка при отправке запроса:', users_data);
            return { success_users: false, users_data };
        });
}
