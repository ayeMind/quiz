import { XCircle } from "lucide-react";
import { useState, FocusEvent } from "react";
import { observer } from "mobx-react-lite";
import newQuizStore from "../../../pages/MyQuizzes/Create/newQuizStore";

interface IFormCell {
  index: number;
  questionId: string;
  onDelete: (questionId: string) => void;
}

export const FormCell = observer(
  ({ index, questionId, onDelete }: IFormCell) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleAddOption = () => {
      if (newQuizStore.questions[index].options.length < 6) {
        newQuizStore.addOption(index);
      }
    };

    const handleDeleteOption = (optionIndex: number) => {
      if (newQuizStore.questions[index].options.length === 3) {
        alert("Вопрос должен содержать минимум 3 варианта ответа");
        return;
      }
      newQuizStore.deleteOption(index, optionIndex);
    };

    const handleOptionChange = (optionIndex: number, value: string) => {
      newQuizStore.changeOption(index, optionIndex, value);
    };

    const handleCheckboxChange = (optionIndex: number) => {
      newQuizStore.changeAnswer(index, optionIndex);
    };

    const handleModeChange = () => {
      newQuizStore.changeAnswer(index, -1);
      newQuizStore.changeQuestionType(index);
    };

    return (
      <div
        className={`relative bg-white dark:bg-[#2d3449] h-auto justify-center transition-all min-h-[10vh] w-[50vw] rounded-2xl text-[22px] p-2 flex flex-col
      ${isHovered ? "items-start pt-5" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
      >
        <input
          id="question"
          type="text"
          className="w-full h-full px-2 bg-transparent outline-none dark:text-white"
          placeholder="Введите вопрос"
          value={newQuizStore.questions[index].question}
          onChange={(e) =>
            newQuizStore.changeQuestionText(index, e.target.value)
          }
        />

        {!isHovered && (
          <div>
            <label
              htmlFor="question"
              className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
            >
              {index + 1}
            </label>
          </div>
        )}

        {isHovered && (
          <div className="w-[80%]">
            <XCircle
              className="absolute text-red-700 cursor-pointer hover:text-red-800 top-3 right-3 delete-btn dark:text-red-500 dark:hover:text-red-700"
              onClick={() => onDelete(questionId)}
            />
            <label
              htmlFor="question"
              className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
            >
              {index + 1}
            </label>
            <hr className="mb-6 dark:border-gray-600" />

            <p className="my-2 ml-6 opacity-75">
              {newQuizStore.settings.mode === "standard"
                ? "Напишите от 3 до 6 вариантов ответа, выберите среди них правильные"
                : "Напишите от 3 до 6 вариантов ответа, задайте каждому из них количество баллов"}
            </p>
            {newQuizStore.questions[index].options.map(
              (option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  {newQuizStore.settings.mode === "standard" ? (
                    <input
                      type={
                        newQuizStore.questions[index].type === "standard"
                          ? "radio"
                          : "checkbox"
                      }
                      checked={
                        newQuizStore.questions[index].type === "standard"
                          ? optionIndex === newQuizStore.questions[index].answer
                          : Array.isArray(
                              newQuizStore.questions[index].answer
                            ) &&
                            (
                              newQuizStore.questions[index].answer as number[]
                            ).includes(optionIndex)
                      }
                      onChange={() => handleCheckboxChange(optionIndex)}
                      className="ml-2"
                    />
                  ) : (
                    <input
                    type="text"
                    className="w-[84px] px-2 mb-2 ml-2 bg-transparent outline-none dark:text-white"
                    defaultValue={100}
                    value={newQuizStore.questions[index].options[optionIndex].score}
                    onChange={e => newQuizStore.changeScore(index, optionIndex, e.target.value)}
            
                    maxLength={5} 
                    onKeyDown={(event) => {
                        // Разрешаем вводить цифры и минус (только если это первый символ)
                        if (
                            isNaN(Number(event.key)) &&
                            (event.key !== "Backspace" && event.key !== "ArrowLeft"  && event.key !== "ArrowRight") &&
                            (event.key !== "-" || event.currentTarget.selectionStart !== 0 || event.currentTarget.value.includes("-"))
                        ) {
                            event.preventDefault();
                        }
                      }}

                    onBlur={(e: FocusEvent<HTMLInputElement>) => {
                        if (e.target.value === "") {
                            e.target.value = "100"
                    }}}
                    
                />
                  )}

                  <input
                    type="text"
                    className="w-full h-full px-2 mb-2 ml-2 bg-transparent outline-none dark:text-white"
                    placeholder={`Вариант ответа ${optionIndex + 1}`}
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(optionIndex, e.target.value)
                    }
                  />
                  {isHovered && (
                    <button
                      className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
                      onClick={() => handleDeleteOption(optionIndex)}
                    >
                      Удалить
                    </button>
                  )}
                </div>
              )
            )}

            {newQuizStore.questions[index].options.length < 6 && (
              <button
                className="p-2 ml-4 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
                onClick={handleAddOption}
              >
                Добавить
              </button>
            )}

            {newQuizStore.settings.mode === "standard" && (
              <div className="flex items-center mt-4 ml-2">
                <input
                  type="checkbox"
                  checked={!(newQuizStore.questions[index].type === "standard")}
                  onChange={handleModeChange}
                />
                <span className="ml-2">Множественный выбор</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
