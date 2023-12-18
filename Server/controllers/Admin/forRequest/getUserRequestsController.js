import { Profile, ProfileRequest } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getUserRequests = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let requests
  try {
    if (req.query.entries == 0)
      requests = await ProfileRequest.countDocuments({ status: 'PENDING' })
    else if (req.query.filter && req.query.filter == 'PENDING')
      requests = await ProfileRequest.find({ status: 'PENDING' })
        .limit(req.query.entries)
        .sort({ _id: -1 })
    else
      requests = await ProfileRequest.find({
        status: { $ne: 'PENDING' },
      })
        .limit(req.query.entries)
        .sort({ _id: -1 })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  let payload
  if (requests) payload = requests

  return sendSuccess(payload, 200, res)
}

export default getUserRequests
