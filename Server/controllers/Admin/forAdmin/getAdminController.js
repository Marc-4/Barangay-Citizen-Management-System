import { Profile} from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAdmin = async (req, res) => {

  const profile = await Profile.findOne({ userID: req.params.id })
  if (!profile) sendError('profile does not exist', 404, res)

  const payload = {
    message: 'Admin profile created successfully',
  }
  sendSuccess(payload, 200, res)
}

export default getAdmin

//REVISIT WHEN IMPLEMENTED AUTH AND COOKIES
