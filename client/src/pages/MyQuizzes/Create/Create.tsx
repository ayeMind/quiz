import { observer } from "mobx-react-lite";
import newQuizStore from "./newQuizStore";
import CreateQuiz from "./CreateQuiz";
import { Settings } from "./Settings";

export const Create = observer(() => {

    if (newQuizStore.settings.type) {
        return (
            <CreateQuiz />
        )
    } else return (
        <Settings />
    )
})