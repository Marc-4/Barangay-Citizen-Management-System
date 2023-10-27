const sendError = (errorDescription, statusCode, res) => {
  res.status(statusCode).json({
    result: 'ERR',
    payload: {
      error: errorDescription,
    },
  })
}

export default sendError
