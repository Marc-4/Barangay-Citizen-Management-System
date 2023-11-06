import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'

const getUsers = async (req, res) => {
  if (req.body.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let users
  try {
    users = await User.find().limit(10)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!users) return sendError('no users found', 404, res)

  const payload = users
  
  return sendSuccess(payload, 200, res)
}

export default getUsers
