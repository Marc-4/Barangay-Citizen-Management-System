import {Employee} from '../models/index.js'
import sendError from '../utils/sendError.js'

const authEmployee = async (req, res, next) => {
  const isEmployee = (await Employee.findById(req.user.id)) ? true : false

  if (!isEmployee) {
    return sendError('No access', 403, res)
  }

  next()
}

export default authEmployee
