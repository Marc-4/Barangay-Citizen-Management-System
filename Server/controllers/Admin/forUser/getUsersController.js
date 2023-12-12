import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'

const getUsers = async (req, res) => {
  console.log('admin accessing getUsers...');
  if (req.query.entries === undefined)
    sendError('Missing Required Fields', 404, res)

  let users = []
  try {
    if (req.query.entries && req.query.entries == 0)
      users = await User.countDocuments({active: true})
    else if (req.query.filter && req.query.filter == 'ARCHIVED')
      users = await User.find({ active: false }).select('-password').limit(req.query.entries)
    else if (req.query.filter && req.query.filter == 'ACTIVE')
      users = await User.find({ active: true }).select('-password').limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  // if (!users) return sendError('no users found', 404, res)

  const payload = users

  return sendSuccess(payload, 200, res)
}

export default getUsers
