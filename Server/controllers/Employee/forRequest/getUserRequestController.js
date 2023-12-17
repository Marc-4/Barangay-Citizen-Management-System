import mongoose from 'mongoose'
import { ProfileRequest } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getUserRequest = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid request ID', 400, res)

  let request
  try {
    request = await ProfileRequest.findById(req.params.id)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  if (!request) return sendError('Request Not Found', 404, res)
  
  let payload = request
  return sendSuccess(payload, 200, res)
}

export default getUserRequest
