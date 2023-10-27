import { Employee } from '../../../models/index.js'
import bcrypt from 'bcrypt'
import { sendError, sendSuccess } from '../../../utils/index.js'

const employee_secret_code = 12345

const registerEmployee = async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.secret === undefined
  ) {
    sendError('missing required fields', 404, res)
    return
  }

  if (req.body.secret != employee_secret_code) {
    sendError('invalid secret!', 400, res)
    return
  }

  let employee
  try {
    employee = await Employee.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 400, res)
    return
  }

  if (employee) {
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

  Employee.create({
    username: req.body.username,
    password: hashedPassword,
    role: 'Employee',
    active: true,
    dateOfCreation: Date.now(),
  })
  const payload = {
    message: 'Employee account created successfully',
  }
  sendSuccess(payload, 200, res)
  return
}

export default registerEmployee
