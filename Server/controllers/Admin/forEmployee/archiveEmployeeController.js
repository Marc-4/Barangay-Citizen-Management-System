import mongoose from 'mongoose'
import { Employee, Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const archiveEmployee = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return sendError('invalid employee ID', 400, res)

    const employee = await Employee.findById(req.params.id)
    if (!employee) return sendError('employee not found', 404, res)

    const profile = await Employee.findOne({ accountID: req.params.id })

    if (profile) {
      await Employee.updateOne({ _id: profile._id }, { active: false })
    }

    await Employee.updateOne({ _id: employee._id }, { active: false })

    let payload = {
      'archived account': employee,
      'archived employee profile': profile,
    }

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default archiveEmployee
