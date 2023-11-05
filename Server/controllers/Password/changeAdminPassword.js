import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Admin } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const changeAdminPassword = async (req, res) => {
  if (mongoose.isValidObjectId(req.Admin.id))
    return sendError('invalid Admin id', 400, res)

  if (req.body.newPassword === undefined)
    return sendError('missing required parameters', 404, res)

  let admin
  try {
    admin = await Admin.findById(req.admin.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (!admin) return sendError('admin not found', 404, res)

  try {
    admin.password = await bcrypt.hash(req.body.password, 10)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  const payload = {
    message: 'successfully changed admin password',
  }
  return sendSuccess(payload, 200, res)
}

export default changeAdminPassword
