import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const changeUserPassword = async (req, res) => {
  if (mongoose.isValidObjectId(req.user.id))
    return sendError('invalid user id', 400, res)

  if (req.body.newPassword === undefined)
    return sendError('missing required parameters', 404, res)

  let user
  try {
    user = await User.findById(req.user.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (!user) return sendError('user not found', 404, res)

  try {
    user.password = await bcrypt.hash(req.body.password, 10)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  const payload = {
    message: 'successfully changed user password',
  }
  return sendSuccess(payload, 200, res)
}

export default changeUserPassword
