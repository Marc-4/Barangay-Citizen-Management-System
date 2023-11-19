const callAPI = async (body, method, route) => {
  const options = {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (body) options.body = JSON.stringify(body)
  try {
    const response = await fetch(route, options)
    return response.json()
  } catch (error) {
    console.log('error connecting to API')
    console.log(error)
  }
}

export default callAPI
