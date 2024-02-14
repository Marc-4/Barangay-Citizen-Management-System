import { User } from '../../../models/index.js'
import sendError from '../../../utils/sendError.js'
import sendSuccess from '../../../utils/sendSuccess.js'

const searchUser = async (req, res) => {
  console.log('Searching for user...')
  try {
    const { query, filter, params, sex } = req.query

    const paramsArray = params.split(',')
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

    console.log('Query: ' + escapedQuery)
    console.log('sex: ' + sex.toLowerCase());

    // Check if 'username' is present in paramsArray.
    const hasUsername = paramsArray.includes('username')

    const queryFilter = {
      $or: paramsArray.map((keyword) => {
        if (hasUsername && keyword === 'username') {
          return { [keyword]: { $regex: escapedQuery, $options: 'i' } }
        }
        return { [`profile.${keyword}`]: { $regex: escapedQuery, $options: 'i' } }
      }),
    }

    if (filter === 'ACTIVE') {
      queryFilter.active = true
    } else if (filter === 'ARCHIVED') {
      queryFilter.active = false
    }

    var users
    if(sex === 'All')
    users = await User.find(queryFilter)
    else 
    users = await User.find(queryFilter).where({'profile.sex': sex.toLowerCase()})

    const payload = users
    console.log(payload);

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    sendError('Internal Server Error', 500, res)
  }
}

export default searchUser
