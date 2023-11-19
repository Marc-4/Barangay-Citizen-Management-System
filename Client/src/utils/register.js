const register = async (username, password, route) => {
  try {
    const response = await fetch(route, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
 
    return await response.json();
  } catch (error) {
    console.log('error connecting to API');
    console.log(error);
  }
 };
 
 export { register };