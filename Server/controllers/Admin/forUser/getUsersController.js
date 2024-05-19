import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'

const getUsers = async (req, res) => {
  console.log('admin accessing getUsers...')
  if (req.query.entries === undefined) sendError('Missing Required Fields', 404, res)

  var skip = (req.query.page - 1) * req.query.entries

  if (req.query.page % 1 != 0) skip++

  console.log('page: ' + req.query.page)
  console.log('entries: ' + req.query.entries)
  // console.log('skip: ' + skip)

  let users = []

  try {
    if (req.query.entries && req.query.entries == 0)
      users = await User.countDocuments({ active: true })
    else if (req.query.entries && req.query.entries == 'ARCHIVED_COUNT')
      users = await User.countDocuments({ active: false })
    else if (req.query.filter && req.query.filter == 'ARCHIVED')
      users = await User.find({ active: false })
        .select('-password')
        .select('-profile.profilePhoto')
        .skip(skip)
        .limit(req.query.entries)
        // .sort({ _id: -1 })
        .sort({ dateOfCreation: -1 })
    else if (req.query.filter && req.query.filter == 'ACTIVE')
      users = await User.find({ active: true })
        .select('-password')
        .select('-profile.profilePhoto')
        .skip(skip)
        .limit(req.query.entries)
        // .sort({ _id: -1 })
        .sort({ dateOfCreation: -1 })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  // if (!users) return sendError('no users found', 404, res)
  // if (users.length >= req.query.entries) users = users.shift()

  const payload = users

  return sendSuccess(payload, 200, res)
}

export default getUsers
