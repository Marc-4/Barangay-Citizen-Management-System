import { Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getEmployee = async (req, res) => {
    const profile = await Profile.findOne({ accountID: req.user.id })
    if (!profile) return sendError('profile does not exist', 404, res)
  
    const payload = {
      profile: profile,
    }
    return sendSuccess(payload, 200, res)
}

export default getEmployee