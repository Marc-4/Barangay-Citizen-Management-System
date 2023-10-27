import JWT from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
import { Employee } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const employeeLogin = async (req, res) => {
  if (req.cookies.authorization) return sendError('already logged in', 400, res)
  //input validation
  if (req.body.username === undefined || req.body.password === undefined)
    return sendError('missing required fields', 404, res)

  //check is account exists
  let employee
  try {
    employee = await Employee.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!employee) return sendError('account not found', 404, res)

  const hashedPass = employee.password

  //check password
  bcrpyt.compare(req.body.password, hashedPass, async (err, result) => {
    if (err) {
      console.log(err)
      return sendError('Internal Server Error', 500, res)
    }
    if (result) {
      //token signing
      const id = { id: employee._id }

      const token = JWT.sign(id, process.env.JWT_SECRET, {
        expiresIn: '48h',
      })
      res.cookie('authorization', token)
      const payload = {
        token: token,
      }
      return sendSuccess(payload, 200, res)
    } else {
      sendError('password incorrect', 400, res)
    }
  })
}

export default employeeLogin
