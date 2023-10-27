import { User } from '../models/index.js'
import sendError from '../utils/sendError.js'

const authUser = async (req, res, next) => {
  const isAdmin = (await User.findById(req.user.id)) ? true : false

  if (!isAdmin) {
    return sendError('No access', 403, res)
  }

  next()
}

export default authUser
