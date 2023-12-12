import mongoose from 'mongoose'
import { User } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const restoreUser = async (req, res) => {
  console.log('restoring user..')
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return sendError('invalid user ID', 400, res)

    const user = await User.findById(req.params.id)
    if (!user) return sendError('user not found', 404, res)

    await User.updateOne({ _id: user._id }, { active: true })

    let payload = user

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default restoreUser
