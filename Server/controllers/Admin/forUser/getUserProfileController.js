import { Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const getUserProfile = async (req, res) => {
  console.log('getting user profile..');
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)
  
  let profile
  try {
    profile = await Profile.findOne({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!profile) return sendError('user profile not found', 404, res)

  let payload = profile

  return sendSuccess(payload, 200, res)
}

export default getUserProfile
