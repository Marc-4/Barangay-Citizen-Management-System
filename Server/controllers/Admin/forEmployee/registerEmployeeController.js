import { sendError, sendSuccess } from '../../../utils/index.js'
import { Employee } from '../../../models/index.js'
import bcrypt from 'bcrypt'

const registerEmployee = async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined)
    return sendError('missing required parameters', 404, res)

  //check if username exists in db
  let employee
  try {
    employee = await Employee.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (employee) return sendError('username Taken', 400, res)

  //encrypt pass
  const encryptedPass = await bcrypt.hash(req.body.password, 10)
  //register
  let newEmployee
  try {
    newEmployee = await Employee.create({
        username: req.body.username,
      password: encryptedPass,
      role: 'employee',
      active: true,
      dateOfCreation: Date.now(),
    })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }
  const payload = newEmployee
  sendSuccess(payload, 200, res)
}

export default registerEmployee
