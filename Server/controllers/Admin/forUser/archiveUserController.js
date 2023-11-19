import mongoose from 'mongoose'
import { User, Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const archiveUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return sendError('invalid user ID', 400, res)

    const user = await User.findById(req.params.id)
    if (!user) return sendError('user not found', 404, res)

    const profile = await Profile.findOne({ accountID: req.params.id })

    if (profile) {
      await Profile.updateOne({ _id: profile._id }, { active: false })
    }

    await User.updateOne({ _id: user._id }, { active: false })

    let payload = {
      'archived account': user,
      'archived user profile': profile,
    }

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default archiveUser
