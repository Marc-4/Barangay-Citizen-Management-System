import { User } from '../../../models/index.js'
import sendError from '../../../utils/sendError.js'
import sendSuccess from '../../../utils/sendSuccess.js'

const searchUser = async (req, res) => {
  console.log('searching for user..')
  try {
    const { query, filter } = req.query

    console.log(filter);
    const queryFilter = {
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { 'profile.firstName': { $regex: query, $options: 'i' } },
        { 'profile.lastName': { $regex: query, $options: 'i' } },
        { 'profile.middleName': { $regex: query, $options: 'i' } },
        { 'profile.sex': { $regex: query, $options: 'i' } },
        { 'profile.civilStatus': { $regex: query, $options: 'i' } },
      ],
    }

    if (filter === 'ACTIVE') {
      queryFilter.active = true
    } else if (filter === 'ARCHIVED') {
      queryFilter.active = false
    }

    const users = await User.find(queryFilter)

    const payload = users
    console.log(payload);

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    sendError('Internal Server Error', 500, res)
  }
}

export default searchUser
