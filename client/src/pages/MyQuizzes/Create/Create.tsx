import { observer } from "mobx-react-lite";
import newQuizStore from "./newQuizStore";
import CreateQuiz from "./CreateQuiz";
import { Settings } from "./Settings";

export const Create = observer(() => {

    if (newQuizStore.settings.ready) {
        return (
            <CreateQuiz />
        )
    } else return (
        <Settings />
    )
})