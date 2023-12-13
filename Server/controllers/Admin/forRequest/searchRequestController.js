import { ProfileRequest } from '../../../models/index.js'
import { sendSuccess, sendError } from '../../../utils/index.js'

const searchRequest = async (req, res) => {
  console.log('searching for requests..')
  try {
    const { query, filter } = req.query

    const queryFilter = {
      $or: [
        { requestType: { $regex: query, $options: 'i' } },
        { userFirstName: { $regex: query, $options: 'i' } },
        { userLastName: { $regex: query, $options: 'i' } },
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
