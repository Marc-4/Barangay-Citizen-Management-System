import mongoose from 'mongoose'
import {
  User,
  Profile,
} from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)

  let user
  try {
    user = await User.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user not found', 404, res)

  let profile
  try {
    profile = await Profile.findOne({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  let payload = {
    'deleted account': user,
  }
  user.deleteOne()

  return sendSuccess(payload, 200, res)
}

export default deleteUser
