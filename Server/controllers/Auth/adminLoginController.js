import JWT from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
import { Admin } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const adminLogin = async (req, res) => {
  console.log('admin logging in...');
  if (req.cookies.authorization) return sendError('already logged in', 400, res)
  //input validation  
  if (req.body.username === undefined || req.body.password === undefined)
    return sendError('missing required fields', 404, res)

  //check is account exists
  let admin
  try {
    admin = await Admin.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!admin) return sendError('username or password incorrect', 404, res)

  const hashedPass = admin.password

  //check password
  bcrpyt.compare(req.body.password, hashedPass, async (err, result) => {
    if (err) {
      console.log(err)
      return sendError('Internal Server Error', 500, res)
    }
    if (result) {
      //token signing
      const id = { id: admin._id }

      const token = JWT.sign(id, process.env.JWT_SECRET, {
        expiresIn: '48h',
      })
      res.cookie('authorization', token)
      const payload = {
        token: token,
        role: 'admin'
      }
      return sendSuccess(payload, 200, res)
    } else {
      sendError('username or password incorrect', 400, res)
    }
  })
}

export default adminLogin
