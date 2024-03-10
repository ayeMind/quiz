export function updateUserCompletions(id: string) {
  const url = `http://localhost:8000/users/${id}/complete`;
  const headers = {
    accept: "application/json",
  };
  return fetch(url, { method: "PUT", headers })
    .then((response) => response.json())
    .then((data) => {
      if (data.user_name) {
        return { success_user: true, user_data: data };
      } else {
        return { success_user: false, user_data: data };
      }
    })
    .catch((data) => {
      console.error("Ошибка при отправке запроса:", data);
      return { success_user: false, user_data: data };
    });
}

export function userCreateCount(id: string) {
  const url = `http://localhost:8000/users/${id}/create/`;
 
  const headers = {
    accept: "application/json",
  };
  return fetch(url, { method: "PUT", headers})
    .then((response) => response.json())
    .then((data) => {
      if (data.user_name) {
        return { success_user: true, user_data: data };
      } else {
        return { success_user: false, user_data: data };
      }
    })
    .catch((data) => {
      console.error("Ошибка при отправке запроса:", data);
      return { success_user: false, user_data: data };
    });
}

export function userRemoveCount(id: string) {
  const url = `http://localhost:8000/users/${id}/remove/`;
 
  const headers = {
    accept: "application/json",
  };
  return fetch(url, { method: "PUT", headers})
    .then((response) => response.json())
    .then((data) => {
      if (data.user_name) {
        return { success_user: true, user_data: data };
      } else {
        return { success_user: false, user_data: data };
      }
    })
    .catch((data) => {
      console.error("Ошибка при отправке запроса:", data);
      return { success_user: false, user_data: data };
    });
}