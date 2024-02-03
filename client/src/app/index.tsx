import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setUserInfo } from "../actions/setUserInfo";
import Cookies from 'universal-cookie'
import globalStore from "./globalStore";

// pages
import Menu from "../pages/Menu";
import PageNotFound from "../pages/PageNotFound";
import CreateQuiz from "../pages/MyQuizzes/Create/CreateQuiz";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Quiz from "../pages/Quiz";
import MyQuizzes from "../pages/MyQuizzes/MyQuizzes";
import Catalog from "../pages/Catalog";
import Online from "../pages/Online/Online";
import Profile from "../pages/Profile";

function App() {

  const cookies = new Cookies(null, { path: '/', secure: true, sameSite: "none" });

  
  if (cookies.get("theme") === 'light' && globalStore.theme !== 'light') {
    const root = document.getElementById("root");
    root?.classList.remove("dark")
    globalStore.changeTheme();
  }

  if (cookies.get("auth_token") && !globalStore.isAutorized) {
    const token = cookies.get("auth_token");
    globalStore.autorize();
    globalStore.setToken(token);
    setUserInfo(token);
  }

  return ( 
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/my-quizzes' element={<MyQuizzes />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/online' element={<Online />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
