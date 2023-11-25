import mongoose from 'mongoose'
import { User } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)
  
  let user
  try {
    user = await User.findById(req.params.id).select('-password')
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user not found', 404, res)

  const payload = user
  console.log(payload);

  return sendSuccess(payload, 200, res)
}

export default getUser
