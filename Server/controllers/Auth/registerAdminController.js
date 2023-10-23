import Admin from '../../models/admin.js'
import { sendError, sendSuccess } from '../../utils/index.js'

import bcrypt from 'bcrypt'

const secret_code = 42069

const registerAdmin = async (req, res) => {
  if (
    req.body.username === undefined &&
    req.body.password === undefined &&
    req.body.secret === undefined
  )
    sendError('missing required fields', 404, res)

  if (req.body.secret != secret_code) sendError('invalid secret!', 400, res)

  let admin
  try {
    admin = await Admin.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 400, res)
  }

  if (admin) sendError('username taken', 400, res)

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 400, res)
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
}

export default registerAdmin
