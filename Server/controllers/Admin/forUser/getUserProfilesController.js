import { sendError, sendSuccess } from '../../../utils/index.js'
import { Profile } from '../../../models/index.js'

const getUserProfiles = async (req, res) => {
  if (req.body.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let profile
  try {
    profile = await Profile.find().limit(req.body.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!profile) return sendError('no user profiles found', 404, res)

  let payload = profile

  return sendSuccess(payload, 200, res)
}

export default getUserProfiles
