import { useState } from "react";
import { Quiz } from "../../../app/interfaces";

interface SearchProps {
    quizzes: Quiz[];
    setFilteredQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>; 
}

const Search = ({quizzes, setFilteredQuizzes}: SearchProps) => {

    const [search, setSearch] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setFilteredQuizzes(
          quizzes.filter((quiz) =>
            quiz.title
              .toLowerCase()
              .trim()
              .includes(e.target.value.toLowerCase().trim())
          )
        );
      };
      
  return (
    <>
        <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={handleSearch}
              className="w-[512px] h-[64px] rounded-md text-[24px] px-4 bg-slate-50 dark:bg-slate-700"
            />
            <a href="#" className="text-[24px]">
              Теги
            </a>
          </div>
    </>
  );
};

export default Search;