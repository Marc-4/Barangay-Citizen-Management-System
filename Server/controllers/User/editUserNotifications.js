import mongoose from 'mongoose'
import { sendSuccess, sendError } from '../../utils/index.js'
import { Notification } from '../../models/index.js'

const editNotification = async (req, res) => {
  console.log('editing notification..');
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Notification ID', 400, res)

  // if (req.body.status === undefined)
  //   return sendError('Missing Required Fields', 404, res)

  let notification
  try {
    notification = await Notification.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if(!notification) return sendError('Notification not found', 404, res)

  notification.status = 'READ'

  try {
    await notification.save()
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }
  const payload = notification
  return sendSuccess(payload, 200, res)
}

export default editNotification
