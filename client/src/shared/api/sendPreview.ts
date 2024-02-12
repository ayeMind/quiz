import newQuizStore from "../../pages/MyQuizzes/Create/newQuizStore";

export async function sendPreview() {
    const previewFile = newQuizStore.preview;

    if (!previewFile) {
        console.error("Файл для превью не выбран");
        return;
    }

    const formData = new FormData();
    formData.append('file', previewFile);

    try {
        const response = await fetch('http://localhost:8000/quiz/preview/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload preview file: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData);

    } catch (error) {
        console.error("Не получилось загрузить превью", error);
    }
}
