const sendSuccess = (payload, statusCode, res) => {
    res.status(statusCode)
    res.json({
        result: success,
        payload: payload
    })
    return res.end()
}

export default sendSuccess