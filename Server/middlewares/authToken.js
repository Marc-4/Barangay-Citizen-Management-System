import { sendError } from '../utils/index.js'
import jwt from 'jsonwebtoken'

const authToken = (req, res, next) => {
  const token = req.cookies.authorization
  if (!token) return sendError('Not logged in', 403, res)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return sendError('invalid token', 403, res)
    
    req.user = user
    next()
  })
}

export default authToken
