import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Cookies from "universal-cookie";

// pages
import Menu from "../pages/Menu";
import PageNotFound from "../pages/PageNotFound";
import {CreateQuiz} from "../pages/MyQuizzes/Create/CreateQuiz";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Quiz from "../pages/Quiz";
import MyQuizzes from "../pages/MyQuizzes/MyQuizzes";
import Catalog from "../pages/Catalog";
import Online from "../pages/Online/Online";
import Profile from "../pages/Profile";
import { useEffect } from "react";

const App = observer(() => {

  useEffect(() => {
    const cookies = new Cookies(null, {
      path: "/",
      secure: true,
      sameSite: "none",
    });

    if (cookies.get("theme") === "dark") {
      const root = document.getElementById("root");
      root?.classList.add("dark");
    }

  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/my-quizzes/create" element={<CreateQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/online" element={<Online />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
