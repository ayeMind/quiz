export function getUserById(id: string) {
    const url = `http://localhost:8000/users/${id}/`;
    const headers = {
        'accept': 'application/json'
    };

    return fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.user_name) {
                return { success: true, data };
            } else {
                return { success: false, data};
            }
        })
        .catch(data => {
            console.error('Ошибка при отправке запроса:', data);
            return { success: false, data };
        });
}