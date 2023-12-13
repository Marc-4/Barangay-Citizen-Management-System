import mongoose from 'mongoose'
import { Employee } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const restoreEmployee = async (req, res) => {
  console.log('restoring employee..');
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return sendError('invalid employee ID', 400, res)

    const employee = await Employee.findById(req.params.id)
    if (!employee) return sendError('employee not found', 404, res)

    await Employee.updateOne({ _id: employee._id }, { active: true })

    let payload = employee

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default restoreEmployee
