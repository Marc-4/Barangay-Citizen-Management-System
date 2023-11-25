import JWT from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
import { User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const userLogin = async (req, res) => {
  if (req.cookies.authorization) return sendError('already logged in', 400, res)
  //input validation
  if (req.body.username === undefined || req.body.password === undefined)
    return sendError('missing required fields', 404, res)

  //check is account exists
  let user
  try {
    user = await User.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('account not found', 404, res)

  const hashedPass = user.password

  //check password
  bcrpyt.compare(req.body.password, hashedPass, async (err, result) => {
    if (err) {
      console.log(err)
      return sendError('Internal Server Error', 500, res)
    }
    if (result) {
      //token signing
      const id = { id: user._id }

      const token = JWT.sign({ id: id, role: 'user' }, process.env.JWT_SECRET)
      res.cookie('authorization', token)
      const payload = token
      return sendSuccess(payload, 200, res)
    } else {
      sendError('password incorrect', 400, res)
    }
  })
}

export default userLogin
