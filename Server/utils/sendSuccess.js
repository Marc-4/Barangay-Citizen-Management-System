const sendSuccess = (payload, statusCode, res) => {
  res.status(statusCode).json({
    result: 'OK',
    payload: payload,
  })
}

export default sendSuccess
