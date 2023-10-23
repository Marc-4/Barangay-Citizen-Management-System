const sendError = (errorDescription, statusCode, res) => {
    res.status(statusCode)
    res.json({
        result: error,
        payload: {
            error: errorDescription
        }
    })
    return res.end()
}

export default sendError