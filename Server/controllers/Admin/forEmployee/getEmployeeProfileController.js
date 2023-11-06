import { Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const getEmployeeProfile = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid employee ID', 400, res)

  let profile
  try {
    profile = await Profile.findOne({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!profile) return sendError('employee profile not found', 404, res)

  let payload = profile

  return sendSuccess(payload, 200, res)
}

export default getEmployeeProfile
