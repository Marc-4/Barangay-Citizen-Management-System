import { ProfileRequest } from '../../../models/index.js'
import { sendSuccess, sendError } from '../../../utils/index.js'

const searchRequest = async (req, res) => {
  console.log('searching for requests..')
  try {
    const { query, filter } = req.query

    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    const queryFilter = {
      $or: [
        { requestType: { $regex: escapedQuery, $options: 'i' } },
        { userFirstName: { $regex: escapedQuery, $options: 'i' } },
        { userLastName: { $regex: escapedQuery, $options: 'i' } },
      ],
    }

    if (filter === 'PENDING') {
      queryFilter.status = 'PENDING'
    } else if (filter === 'HISTORY') {
      queryFilter.status = { $ne: 'PENDING' }
    }

    const requests = await ProfileRequest.find(queryFilter)

    const payload = requests

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    sendError('Internal Server Error', 500, res)
  }
}

export default searchRequest
