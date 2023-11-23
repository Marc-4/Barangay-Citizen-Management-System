import mongoose from 'mongoose'
import { Notification } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const deleteNotification = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Notification ID', 400, res)

  let notification
  try {
    notification = await Notification.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!notification) return sendError('Notification Not Found', 404, res)

  const payload = notification
  notification.deleteOne()
  return sendSuccess(payload, 200, res)
}

export default deleteNotification
