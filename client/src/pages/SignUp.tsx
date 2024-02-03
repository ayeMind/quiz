import React, { useState } from "react";
import { useId } from "react";
import { PageLayout } from "../shared/ui/layouts/page-layout";

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Валидация username
    if (!validateUserName(userName)) {
      setUserNameError("Username должен быть длиной не менее 3 символов и содержать только латинские буквы или цифры");
      return;
    }

    // Валидация email
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
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
    console.log("Email:", email);
    console.log("Password:", password);

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
      <div className="absolute flex flex-col items-center w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2d3449] opacity-[0.8] left-1/2 top-1/2 h-1/2 rounded-3xl">
        <p className="mt-8">Регистрация</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-12">
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

          <button type="submit" className="text-[18px] bg-slate-200 py-2 px-4 rounded-2xl">Создать учётную запись</button>
        </form>

        <p className="text-[18px] mt-8">Авторизация с помощью других сервисов:</p>
      </div>
    </PageLayout>
  );
}
