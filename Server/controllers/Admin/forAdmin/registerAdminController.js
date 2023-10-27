import Admin from '../../../models/admin.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

import bcrypt from 'bcrypt'

const admin_secret_code = 42069

const registerAdmin = async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.secret === undefined
  ) {
    sendError('missing required fields', 404, res)
    return
  }
  if (req.body.secret != admin_secret_code) {
    sendError('invalid secret!', 400, res)
    return
  }

  let admin
  try {
    admin = await Admin.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 400, res)
    return
  }

  if (admin) {
    sendError('username taken', 400, res)
    return
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
    return
  }

  Admin.create({
    username: req.body.username,
    password: hashedPassword,
    role: 'Admin',
    active: true,
    dateOfCreation: Date.now(),
  })
  const payload = {
    message: 'Admin account created successfully',
  }
  sendSuccess(payload, 200, res)
  return
}

export default registerAdmin
