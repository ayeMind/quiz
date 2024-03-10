import { Link } from "react-router-dom";

const CreateBtn = () => {
  return (
    <>
       <Link
            to="/my-quizzes/create"
            className="text-[32px] mb-8 mt-4 p-2 rounded-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Создать викторину
        </Link>
    </>
  );
};

export default CreateBtn;