import { User } from "../app/interfaces";
import { useNavigate } from "react-router";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { getUserById } from "../shared/api/getUserById";
import { useEffect, useState } from "react";
import globalStore from "../app/globalStore";
import getUserInfo from "../shared/api/getUserInfo";
import Cookies from "universal-cookie";

export default function Profile() {
  const navigator = useNavigate();
  const cookies = new Cookies();

  const [user, setUser] = useState({} as User);

  useEffect(() => {
    let user_id;
    getUserInfo(cookies.get("auth_token")).then((data) => {
      if (data.success_user) {
        globalStore.setUser(data.user_data);
        user_id = data.user_data.id;
        if (user_id === -1) {
          navigator("/login");
        }

        getUserById(user_id.toString())
        .then((data) => {
          
          if (data.success) {
            setUser(data.data);
          } else {
            console.log("Ошибка при получении пользователя");
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
      } else {
        console.log("Ошибка при получении данных пользователя");
      }
    });
 
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="p-5 bg-white rounded-xl">
          <p className="ml-5 font-bold">{user.user_name}</p>
          <p>Электронная почта: {user.email}</p>
          <p>Количество созданных викторин: {user.number_of_quizzes}</p>
          <p>Количество пройденных викторин: {user.completed_quizzes}</p>
        </div>
      </div>
    </PageLayout>
  );
}
