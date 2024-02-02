
export default async function verifyUser(email: string, password: string) {

    const url = 'http://localhost:8000/auth/sign-in/';
    const data = new URLSearchParams();
    data.append('grant_type', '');
    data.append('username', email);
    data.append('password', password);
    data.append('scope', '');
    data.append('client_id', '');
    data.append('client_secret', '');
    
    fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Ошибка:', error));
    
}
