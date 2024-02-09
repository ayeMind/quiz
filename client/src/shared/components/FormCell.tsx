import { XCircle } from "lucide-react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import newQuizStore from "../../pages/MyQuizzes/Create/newQuizStore";

export const FormCell = observer(({
  index,
  questionId,
  onDelete,
}: {
  index: number;
  questionId: string;
  onDelete: (questionId: string) => void;
}) => {


  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const handleAddOption = () => {
    if (newQuizStore.questions[index].options.length < 6) {
      newQuizStore.addOption(index);
      console.log(newQuizStore.questions[index].options);
      
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


  return (
    <div
      className={`relative bg-white dark:bg-[#2d3449] h-[10vh] w-[50vw] rounded-2xl text-[22px] p-2 flex transition-all flex-col
      ${isHovered && "min-h-[30vh] h-auto items-start pt-5"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
    >
      <input
        id="question"
        type="text"
        className="w-full h-full px-2 bg-transparent outline-none dark:text-white"
        placeholder="Введите вопрос"
        value={newQuizStore.questions[index].question}
        onChange={e => newQuizStore.changeQuestionText(index, e.target.value)}
      />
      
      {!isHovered ? (
        <div>
          <label
            htmlFor="question"
            className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
          >
            {index + 1}
          </label>
        </div>
      ) : (
        <div className="w-[80%]">
          <XCircle
            className="absolute text-red-700 cursor-pointer top-3 right-3 delete-btn"
            onClick={() => onDelete(questionId)}
          />
          <label
            htmlFor="question"
            className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
          >
            {index + 1}
          </label>
          <hr className="mb-6 dark:border-gray-500" />

          <p className="my-2 ml-6 opacity-75">
            Напишите от 3 до 6 вариантов ответа и выберите верный
          </p>
          {newQuizStore.questions[index].options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center">
              <input
                type="checkbox"
                checked={optionIndex === newQuizStore.questions[index].answer}
                onChange={() => handleCheckboxChange(optionIndex)}
                className="ml-2"
              />
              <input
                type="text"
                className="w-full h-full px-2 mb-2 ml-2 bg-transparent outline-none dark:text-white"
                placeholder={`Вариант ответа ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(optionIndex, e.target.value)
                }
              />
              {isHovered && (
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleDeleteOption(optionIndex)}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}

          {newQuizStore.questions[index].options.length < 6 && (
            <button
              className="p-2 ml-4 rounded-md bg-slate-200"
              onClick={handleAddOption}
            >
              Добавить
            </button>
          )}
        </div>
      )}
    </div>
  );
}
)