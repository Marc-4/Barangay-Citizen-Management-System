import mongoose from 'mongoose'
import { Employee } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const deleteEmployee = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid employee ID', 400, res)

  let employee
  try {
    employee = await Employee.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!employee) return sendError('employee not found', 404, res)

  let payload = {
    'deleted account': employee,
  }
  employee.deleteOne()

  return sendSuccess(payload, 200, res)
}

export default deleteEmployee
