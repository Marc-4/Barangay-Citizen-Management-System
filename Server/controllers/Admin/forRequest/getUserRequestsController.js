import { Profile, ProfileRequest } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getUserRequests = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let requests
  try {
    if (req.query.entries == 0) requests = await ProfileRequest.countDocuments()
    else if (req.query.filter && req.query.filter == 'PENDING')
      requests = await ProfileRequest.find({ status: 'PENDING' })
    else requests = await ProfileRequest.find().limit(req.query.entries)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  let payload
  if (requests) payload = requests

  return sendSuccess(payload, 200, res)
}

export default getUserRequests
