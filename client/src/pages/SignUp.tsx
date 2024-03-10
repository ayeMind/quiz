import { useState } from "react";
import { useId } from "react";
import { PageLayout } from "../shared/ui/layouts/page-layout";

import { User } from "../app/interfaces";

import Cookies from "universal-cookie";

import { setUserInfo } from "../actions/setUserInfo";
import getAllUsers from "../shared/api/getAllUsers";
import createUser from "../shared/api/createUser";
import globalStore from "../app/globalStore";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const hintUserNameId = useId();
  const hintLoginId = useId();
  const hintPasswordId = useId();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: '/', secure: true, sameSite: "none" });

  let userNames: string[];
  let emails: string[];

  function validateUserName(userName: string) {
    const userNameRegex = /^[a-zA-Z0-9]{3,}$/;
    return userNameRegex.test(userName);
  }

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    return passwordRegex.test(password);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { success_users, users_data } = await getAllUsers();
    
    if (success_users) {
      // console.log("Успешное получение данных:", users_data);
      userNames = users_data.map((user: User) => user.user_name);
      emails = users_data.map((user: User) => user.email);
    } else {
      alert("Что-то пошло не так при получении данных с сервера!");
    }

    // Валидация username
    if (!validateUserName(userName)) {
      setUserNameError("Username должен быть длиной не менее 3 символов и содержать только латинские буквы или цифры");
      return;
    } else if (userNames && userNames.includes(userName)) {
      setUserNameError("Такое имя уже занято");
      return;
    } else {
      setUserNameError("");
    }

    // Валидация email
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
      return;
    } else if (emails && emails.includes(email)) {
      setEmailError("Такой email уже занят");
      return;
    } else {
      setEmailError("");
    }

    // Валидация пароля
    if (!validatePassword(password)) {
      setPasswordError(
        "Пароль должен быть длиной не менее 7 символов, содержать как латинские буквы, так и цифры"
      );
      return;
    } else {
      setPasswordError("");
    }

    // Отправка данных на сервер  
    const { success_create, token } = await createUser({
      user_name: userName,
      email: email,
      password: password,
    });

    if (success_create) {
      const access_token = token.access_token;
      
      try {
        setUserInfo(access_token);
        globalStore.autorize();
        globalStore.setToken(access_token);
        cookies.set("auth_token", access_token, { path: "/", secure: true, sameSite: "none" });
        navigate("/");
      } catch (error) {
        console.log("Ошибка авторизации:", error);
      }
    } else {
      alert("Что-то пошло не так при регистрации!");
    }
    

  }

  function handleUserNameKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Нажата клавиша ENTER, устанавливаем фокус на поле ввода почты
      if (validateUserName(userName)) {
        document.getElementById("emailInput")?.focus();
      } else {
        setUserNameError("Username должен быть длиной не менее 3 символов и содержать только латинские буквы или цифры");
      }
    }
  }

  
  function handleEmailKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Нажата клавиша ENTER, устанавливаем фокус на поле ввода пароля
      if (validateEmail(email)) {
        document.getElementById("passwordInput")?.focus();
      } else {
        setEmailError("Введите корректный email");
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();  // Чтобы не происходил submit формы при нажатии Enter
    }
  }


  return (
    <PageLayout>
      <div className="absolute flex flex-col items-center p-5 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2d3449] opacity-[0.8] left-1/2 top-1/2 rounded-3xl">
        <p>Регистрация</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <input
            type="text"
            className="h-8 w-72 text-[18px] pl-3 bg-slate-100 dark:bg-[#111931]"
            placeholder="Username"
            aria-describedby={hintUserNameId}
            value={userName}
            onKeyUp={handleUserNameKeyUp}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setUserName(e.target.value);
              setUserNameError(""); 
            }}
          />
          <p id={hintUserNameId} className="text-[12px] text-red-800 mb-4 w-80 text-center">{userNameError}</p>

          <input
            id="emailInput"
            type="email"
            className="h-8 w-72 text-[18px] pl-3 bg-slate-100 dark:bg-[#111931]"
            placeholder="Введите свою почту"
            aria-describedby={hintLoginId}
            value={email}
            onKeyUp={handleEmailKeyUp}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(""); 
            }}
          />
          <p id={hintLoginId} className="text-[12px] text-red-800 mb-4 w-80 text-center">{emailError}</p>

          <input
            id='passwordInput'
            type="password"
            className="h-8 w-72 text-[18px] pl-3 bg-slate-100 dark:bg-[#111931]"
            placeholder="Введите пароль"
            aria-describedby={hintPasswordId}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(""); 
            }}
          />
          <p id={hintPasswordId} className="text-[12px] text-red-800 mb-4 w-80 text-center">{passwordError}</p>

          <button type="submit" className="text-[18px] bg-slate-200 dark:bg-[#111931] hover:opacity-80 py-2 px-4 mt-4 rounded-2xl">Создать учётную запись</button>
        </form>

        {/* <p className="text-[18px] mt-8">Авторизация с помощью других сервисов:</p> */}
      </div>
    </PageLayout>
  );
}
