import globalStore from "../app/globalStore";
import getUserInfo from "../shared/api/getUserInfo";
import Cookies from "universal-cookie";

export const setUserInfo = async (token: string) => {

    const cookies = new Cookies(null, { path: '/', secure: true, sameSite: "none" });

    const { success_user, user_data } = await getUserInfo(token);

      if (success_user) {
        // console.log("Успешное получение данных пользователя");
        globalStore.setUser(user_data);
        cookies.set("auth_token", token, { path: "/", secure: true, sameSite: "none" });
      } else {
        console.error("Ошибка получения данных пользователя:", user_data);
      }
};
