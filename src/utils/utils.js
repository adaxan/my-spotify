async function getToken() {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            '50b275d96f164fe9ba01da915b4c199a' +
              ':' +
              'a6c698d5580a4c5483954fe28d49db45'
          )}`,
        },
        body: 'grant_type=client_credentials',
      });
  
      const auth = await response.json();
      localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
    } catch (error) {
      console.log(error);
    }
  }
  
  export { getToken };
  