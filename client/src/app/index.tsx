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
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Quiz from "../pages/Quiz";
import {MyQuizzes} from "../pages/MyQuizzes/MyQuizzes";
import {Catalog} from "../pages/Catalog";
import Profile from "../pages/Profile";
import { Create } from "../pages/MyQuizzes/Create/Create";

const App = observer(() => {

  useEffect(() => {
    const cookies = new Cookies(null, { path: '/', secure: true, sameSite: "none"}) ;
  
    const initializeApp = async () => {
      if (cookies.get("theme") === "dark") {
        const root = document.getElementById("root");
        root?.classList.add("dark");
      }
  
      if (cookies.get("auth_token")) {
        try {
          await getUserInfo(cookies.get("auth_token"));
  
          const token = cookies.get("auth_token");
          globalStore.autorize();
          globalStore.setToken(token);
          setUserInfo(token);
        } catch (error) {
          console.log("Ошибка авторизации по кешу:", error);
          globalStore.exit();
          cookies.remove("auth_token");
        }
      }
    };
  
    initializeApp();
  }, []);
  

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-quizzes/create" element={<Create />} />
          <Route path="/my-quizzes" element={<MyQuizzes />}>
            <Route path=":page" element={<MyQuizzes />} />
          </Route>
          <Route path="/quiz">
            <Route path=":quizId" element={<Quiz />} />
          </Route>
          <Route path="/catalog" element={<Catalog />}>
            <Route path=":page" element={<Catalog />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
