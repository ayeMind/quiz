import { useState } from "react";

export default function FormCell({ index }: { index: number }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [answerOptions, setAnswerOptions] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);

  const handleAddOption = () => {
    if (answerOptions.length < 6) {
      setAnswerOptions([...answerOptions, { text: "", isCorrect: false }]);
    }
  };

  const handleDeleteOption = (index: number) => {
    if (answerOptions.length === 3) return;
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].text = value;
    setAnswerOptions(updatedOptions);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.forEach((option, i) => {
      if (i === index) {
        option.isCorrect = true;
      } else {
        option.isCorrect = false;
      }
    });
    setAnswerOptions(updatedOptions);
  };

  return (
    <div
      className={`relative bg-white dark:bg-[#2d3449] h-[10vh]  w-[50vw] rounded-2xl text-[22px] p-2 flex items-center transition-all
      ${isHovered && 'min-h-[30vh] h-auto items-start pt-5'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
    >
      {!isHovered ? (
        <div>
          <input
            id="question"
            type="text"
            className="w-full h-full px-2 bg-transparent outline-none dark:text-white"
            placeholder="Введите вопрос"
          />
          <label
            htmlFor="question"
            className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
          >
            {index + 1}
          </label>
        </div>
      ) : (
        <div className="w-[80%]">
          <input
            id="question"
            type="text"
            className="w-full h-full px-2 bg-transparent outline-none dark:text-white"
            placeholder="Введите вопрос"
          />
          <label
            htmlFor="question"
            className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}
          >
            {index + 1}
          </label>
          <hr className="mb-6 dark:border-gray-500" />

          <p className="my-2 ml-6 opacity-75">Напишите от 3 до 6 вариантов ответа и выберите верный</p>
          {answerOptions.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center">
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={() => handleCheckboxChange(optionIndex)}
                className="ml-2"
              />
              <input
                type="text"
                className="w-full h-full px-2 mb-2 ml-2 bg-transparent outline-none dark:text-white"
                placeholder={`Вариант ответа ${optionIndex + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
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

          {answerOptions.length < 6 && (
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
