import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  //check inputs
  if (req.body.username === undefined || req.body.password === undefined)
    return sendError('missing required parameters', 404, res)

  //check if username exists in db
  let user
  try {
    user = await User.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (user) return sendError('Username Taken', 400, res)

  //encrypt pass
  const encryptedPass = await bcrypt.hash(req.body.password, 10)
  //register
  let newUser
  try {
    newUser = await User.create({
      username: req.body.username,
      password: encryptedPass,
      role: 'user',
      active: true,
      dateOfCreation: Date.now(),
    })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }
  const payload = newUser
  sendSuccess(payload, 200, res)
}

export default registerUser
