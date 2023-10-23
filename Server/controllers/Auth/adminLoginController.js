import JWT from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
import { Admin } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const adminLogin = async (req, res) => {
  //input validation
  if (req.body.username === undefined && req.body.password === undefined)
    sendError('missing required fields', 404, res)

  //check is account exists
  let admin
  try {
    admin = await Admin.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 400, res)
  }

  if (!admin) sendError('account not found', 404, res)

  //check password
  bcrpyt.compare(req.body.password, admin.password, (err, result) => {
    if (err) {
      console.log(err)
      sendError('Invalid password', 400, res)
    }
    if (res) {
      //token signing
      const id = admin._id

      const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h',
      })
      //res
      const payload = {
        token: token,
      }
      sendSuccess(payload, 200, res)
    }
  })
}

export default adminLogin