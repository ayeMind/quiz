import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { getQuizzes } from "../shared/api/getQuizzes";
import { getAllPreviews, getPreviewByQuizId } from "../shared/api/getPreview";
import { useEffect, useState } from "react";
import { Quiz } from "../app/interfaces";

import globalStore from "../app/globalStore";

export const Catalog = observer(() => {

  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [preview, setPreview] = useState([] as JSON[]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!globalStore.isAutorized) {
      navigate("/login");
      return;
    }

    getQuizzes(0, 10).then((quizzes) => {
      setQuizzes(quizzes.data);
    }).catch((error) => {
      console.log(error);
    });

    getAllPreviews().then((previews) => {
      setPreview(previews.data);

    }).catch((error) => {
      console.log(error);
    });


  }, []);


  const quizElements = quizzes.map((quiz) => {

    if (preview.length === 0) {
      return (
        <div key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
      );
    }

    const previewImage = preview.find((file) => file.id === quiz.id);

    if (previewImage) {
      const img = document.getElementById(quiz.id.toString());
      if (img) {
        img.setAttribute('src', `data:image/png;base64,${previewImage.preview}`);
        img.classList.remove("invisible");
      }
    }

    return (
      <div key={quiz.id}>
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
        <img id={quiz.id.toString()} className="invisible"/>
      </div>
    );
  });

  return (
    <PageLayout>
      <h1>Каталог викторин</h1>
      {quizElements}
    </PageLayout>
  );
});
 