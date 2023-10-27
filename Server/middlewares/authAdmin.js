import {Admin} from '../models/index.js'
import sendError from '../utils/sendError.js'

const authAdmin = async (req, res, next) => {
  const isAdmin = (await Admin.findById(req.user.id)) ? true : false

  if (!isAdmin) {
    return sendError('No access', 403, res)
  }

  next()
}

export default authAdmin
