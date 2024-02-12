import { XCircle } from "lucide-react";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import newQuizStore from "../../pages/MyQuizzes/Create/newQuizStore";

export const FormMain = observer(() => {

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1); // Состояние для отслеживания индекса тега, над которым находится курсор

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleCreateTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const value = target.value.toUpperCase().trim();
      if (value.length < 3) return;
      if (newQuizStore.mainInfo.tags.includes(value)) return;

      newQuizStore.addTag(value);
      target.value = "";
    }
  };

  const handleDeleteTag = (index: number) => {
    newQuizStore.deleteTag(index);
  };

  const showTags = () => {
    return (newQuizStore.mainInfo.tags.map((tag, index) => {
      return (
        <span
          key={index}
          className="relative"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-[#f1f1f1] dark:bg-[#3c3f4d] text-black dark:text-white rounded-2xl px-2 py-1 text-[18px] hover:opacity-85">
            {tag}
          </div>
          {hoveredIndex === index && (
            <XCircle
              className="absolute top-[-5px] right-[-5px] w-[20px] h-[20px] text-red-500 cursor-pointer hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
              onClick={() => handleDeleteTag(index)}
            />
          )}
        </span>
      );
    }));
  };

  const handleTitleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextField = document.getElementById("description");
      nextField?.focus();
    }
  };

  const imagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById("preview") as HTMLImageElement;
        preview.src = e.target?.result as string;
        preview.classList.remove("invisible");
      };
      newQuizStore.changePreviewIsLoaded(); 
      newQuizStore.changePreview(file);

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-[#2d3449] h-auto min-h-[50vh] w-[50vw] rounded-2xl text-[22px] p-2 flex flex-col gap-6">
      <span className="relative">
        <input
          id="title"
          type="text"
          className="w-full h-12 px-2 bg-transparent outline-none dark:text-white"
          placeholder="Введите название викторины"
          value={newQuizStore.mainInfo.title}
          onChange={(e) => newQuizStore.changeTitle(e.target.value)}
          onKeyDown={handleTitleInput}
        />
        <hr className="dark:border-gray-500" />
      </span>
      <span className="relative">
        <label
          htmlFor="description"
          className={`absolute -translate-y-1/2 top-[75%] text-[4vh] right-5 opacity-25 select-none`}
        >
          Описание
        </label>
        <textarea
          id="description"
          className="w-full px-2 overflow-y-auto bg-transparent outline-none resize-none h-[10vh] dark:text-white"
          placeholder="Введите описание викторины"
          value={newQuizStore.mainInfo.description}
          onChange={(e) => newQuizStore.changeDescription(e.target.value)}
        />
        <hr className="dark:border-gray-500" />
      </span>
      <span className="relative flex flex-col">
        <label
          htmlFor="fileInput"
          className={`absolute -translate-y-1/2 top-1/2 text-[4vh] right-5 opacity-25 select-none`}
        >
          Превью (16:9)
        </label>
        <input
          id="fileInput"
          type="file"
          className="px-2 bg-transparent outline-none dark:text-white aspect-video h-[7vh] w-[30vw]"
          onChange={imagePreview}
          accept="image/*"
        />
        <img id="preview" className="w-[512px] h-[288px] mb-4 invisible ml-2" />
        <hr className="dark:border-gray-500" />
      </span>
      <span className="relative">
        <label
          htmlFor="tags"
          className={`absolute -translate-y-1/2 top-1/2 text-[4vh] right-5 opacity-25 select-none`}
        >
          Теги
        </label>
        <input
          id="tags"
          type="text"
          className="w-full h-12 px-2 bg-transparent outline-none dark:text-white"
          placeholder="Введите теги (через Enter)"
          onKeyDown={handleCreateTag}
        />
      </span>
      <div className="flex flex-wrap gap-2 mb-2">{showTags()}</div>
    </div>
  );
});