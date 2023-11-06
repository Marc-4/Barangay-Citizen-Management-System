import { ProfileRequest } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getUserRequests = async (req, res) => {
  if (req.body.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let requests
  try {
    requests = await ProfileRequest.find().limit(req.body.entries)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  let payload
  if (requests) payload = requests

  return sendSuccess(payload, 200, res)
}

export default getUserRequests
