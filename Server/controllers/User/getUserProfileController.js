import { User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) return sendError('user profile does not exist', 404, res)
  
    const payload = user
    return sendSuccess(payload, 200, res)
}

export default getUserProfile