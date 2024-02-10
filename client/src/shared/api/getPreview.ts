const headers = {
    'accept': 'application/json'
};

export function getPreviewByQuizId(id: number) {
    return fetch(`http://localhost:8000/quiz/preview/${id}`, { headers })
        .then(data => {
            if (data) {
                return { success: true, file: data };
            } else {
                return { success: false, file: data};
            }
        })
        .catch(preview_data => {
            console.error('Ошибка при отправке запроса:', preview_data);
            return { success: false, file: preview_data};
        });
}

export function getAllPreviews() {
    return fetch('http://localhost:8000/quiz/preview/', { headers })
        .then(data => {
            return { success: true, data: data };
        })
        .catch(previews_data => {
            console.error('Ошибка при отправке запроса:', previews_data);
            return { success: false, data: previews_data};
        });
}