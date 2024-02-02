export default async function verifyUserAPI(email: string, password: string) {
    const url = 'http://localhost:8000/auth/sign-in/';
    const data = new URLSearchParams();
    data.append('grant_type', '');
    data.append('username', email);
    data.append('password', password);
    data.append('scope', '');
    data.append('client_id', '');
    data.append('client_secret', '');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      });
  
      const responseData = await response.json();
  
      return { success: response.ok, data: responseData };
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      return { success: false, error };
    }
  }