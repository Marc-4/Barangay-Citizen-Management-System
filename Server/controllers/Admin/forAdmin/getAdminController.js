import { Admin } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.user.id)
  if (!admin) return sendError('account does not exist', 404, res)

  const payload = admin
  return sendSuccess(payload, 200, res)
}

export default getAdmin
