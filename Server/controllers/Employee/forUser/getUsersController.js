import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'

const getUsers = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let users
  try {
    if (req.query.entries === 0) users = await User.countDocuments()
    users = await User.find({active: true}).limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!users) return sendError('no users found', 404, res)

  const payload = users
  
  return sendSuccess(payload, 200, res)
}

export default getUsers
