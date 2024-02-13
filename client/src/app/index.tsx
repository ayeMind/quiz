import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import globalStore from "./globalStore";
import getUserInfo from "../shared/api/getUserInfo";
import { setUserInfo } from "../actions/setUserInfo";

// pages
import Menu from "../pages/Menu";
import PageNotFound from "../pages/PageNotFound";
import {CreateQuiz} from "../pages/MyQuizzes/Create/CreateQuiz";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Quiz from "../pages/Quiz";
import {MyQuizzes} from "../pages/MyQuizzes/MyQuizzes";
import {Catalog} from "../pages/Catalog";
import Online from "../pages/Online/Online";
import Profile from "../pages/Profile";

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

    if (cookies.get("auth_token") && !globalStore.isAutorized) {
      try {
        getUserInfo(cookies.get("auth_token"));
        
        const token = cookies.get("auth_token");
        globalStore.autorize();
        globalStore.setToken(token);
        setUserInfo(token);
        
      } catch (error) {
        console.log("Ошибка авторизации по кешу:", error);
        globalStore.exit()
        cookies.remove("auth_token");

      }
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
          <Route path="/quiz">
            <Route path=":quizId" element={<Quiz />} />
          </Route>
          <Route path="/catalog" element={<Catalog withParams={false} />}>
            <Route path=":page" element={<Catalog withParams={true} />} />
          </Route>
          <Route path="/online" element={<Online />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
