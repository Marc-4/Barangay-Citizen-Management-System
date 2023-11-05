import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Employee } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const changeEmployeePassword = async (req, res) => {
  if (mongoose.isValidObjectId(req.employee.id))
    return sendError('invalid employee id', 400, res)

  if (req.body.newPassword === undefined)
    return sendError('missing required parameters', 404, res)

  let employee
  try {
    employee = await Employee.findById(req.employee.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (!employee) return sendError('employee not found', 404, res)

  try {
    employee.password = await bcrypt.hash(req.body.password, 10)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  const payload = {
    message: 'successfully changed employee password',
  }
  return sendSuccess(payload, 200, res)
}

export default changeEmployeePassword
