import { Employee } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import bcrypt from 'bcrypt'
const editEmployeeCredentials = async (req, res) => {
  console.log(req.body)
  if (req.body.username === undefined && req.body.new_password === undefined)
    return sendError('missing required fields', 404, res)

  let employee
  try {
    employee = await Employee.findById(req.user.id)
  } catch (error) {
    return sendError('Internal Server Error', 500, res)
  }

  if (!employee) return sendError('employee does not exist', 404, res)

  const { username, new_password, old_password } = req.body

  const result = await bcrypt.compare(old_password, employee.password)
  if (!result) return sendError('incorrect old password', 400, res)

  try {
    if (username) employee.username = username
    if (new_password) {
      const newpass = await bcrypt.hash(new_password, 10)
      employee.password = newpass
    }
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  await employee.save()

  return sendSuccess('success', 200, res)
}

export default editEmployeeCredentials
