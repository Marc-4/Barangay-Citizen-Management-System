import mongoose from 'mongoose'
import { sendError, sendSuccess } from '../../../utils/index.js'
import { ProfileRequest } from '../../../models/index.js'

const editUserRequest = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    sendError('Invalid Request ID', 400, res)
  if (req.body.status === undefined)
    return sendError('Missing Required Fields', 404, res)

  let request
  try {
    request = await ProfileRequest.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!request) return sendError('Request Not Found', 404, res)

  request.status = req.body.status
  try {
    await request.save()
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  const payload = request
  return sendSuccess(payload, 200, res)
}

export default editUserRequest
