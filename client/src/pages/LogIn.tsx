import { useState } from "react";
import { useId } from "react";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { useNavigate } from "react-router";

import verifyUser from "../shared/api/verifyUser";
import globalStore from "../app/globalStore";
import { setUserInfo } from "../actions/setUserInfo";

export default function LogIn() {
  const hintLoginId = useId();
  const hintPasswordId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  
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

    const { success, data } = await verifyUser(email, password);

    if (success) {
      console.log("Успешная авторизация:", data);
      const token = data.access_token;
      globalStore.autorize();
      globalStore.setToken(token);

      setUserInfo(token);

      navigate("/");
    } else if (data.detail === "Incorrect username or password") {
      setPasswordError("Incorrect username or password")
    } else {
      setPasswordError("Что-то пошло не так...")
      console.error(data)
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

  function handleEmailKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();  // Чтобы не происходил submit формы при нажатии Enter
    }
  }

  return (
    <PageLayout>
      <div className="absolute flex flex-col items-center w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2d3449] opacity-[0.8] left-1/2 top-1/2 h-1/2 rounded-3xl">
        <p className="mt-8">Вход</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-12"
        >
          <input
            type="email"
            className="h-8 w-72 text-[18px] pl-3 bg-slate-100 dark:bg-[#111931]"
            placeholder="Введите свою почту"
            aria-describedby={hintLoginId}
            value={email}
            onKeyUp={(e) => handleEmailKeyUp(e)}
            onKeyDown={(e) => handleEmailKeyDown(e)}
            onChange={(e) => { 
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          <p
            id={hintLoginId}
            className="text-[12px] text-red-800 mb-4 w-80 text-center"
          >
            {emailError}
          </p>

          <input
            id="passwordInput"
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
          <p
            id={hintPasswordId}
            className="text-[12px] text-red-800 mb-4 w-80 text-center"
          >
            {passwordError}
          </p>

          <button
            type="submit"
            className="text-[18px] bg-slate-200 py-2 px-4 rounded-2xl"
          >
            Войти
          </button>
        </form>

        <p className="text-[24px] mt-8">Войти с помощью других сервисов:</p>
      </div>
    </PageLayout>
  );
}
