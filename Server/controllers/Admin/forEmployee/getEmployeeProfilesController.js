import { sendError, sendSuccess } from '../../../utils/index.js'
import { Profile } from '../../../models/index.js'

const getEmployeeProfiles = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let profile
  try {
    profile = await Profile.find().limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!profile) return sendError('no employee profiles found', 404, res)

  let payload = profile

  return sendSuccess(payload, 200, res)
}

export default getEmployeeProfiles
