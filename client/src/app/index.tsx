import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'universal-cookie'
import Menu from "../pages/Menu";
import PageNotFound from "../pages/PageNotFound";
import globalStore from "./globalStore";

function App() {

  const cookies = new Cookies(null, { path: '/' });  

  if (cookies.get("theme") === 'light' && globalStore.theme !== 'light') {
    const root = document.getElementById("root");
    root?.classList.remove("dark")
    globalStore.changeTheme();
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
