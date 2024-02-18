import { observer } from "mobx-react-lite";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import quizStore from "../quizStore";

const Results = observer(() => {
  return (
    <PageLayout>
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold">Результаты</h1>
            <p>Ты набрал {quizStore.score} очков из {quizStore.maxScore}! </p>
        </div>
    </PageLayout>
  );
});

export default Results;