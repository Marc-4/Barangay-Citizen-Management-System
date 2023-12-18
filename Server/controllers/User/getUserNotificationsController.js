import { Notification } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const getUserNotifications = async (req, res) => {
  console.log('user accessing getAllNotifications..')
  if (req.query.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let notifications
  try {
    if (req.query.entries == 0)
      notifications = await Notification.countDocuments({
        recipient: req.user.id,
        status: 'UNREAD',
      })
    else
      notifications = await Notification.find({
        recipient: req.user.id,
      }).sort({ _id: -1 })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!notifications) return sendError('No Notifications Found', 404, res)

  const payload = notifications
  return sendSuccess(payload, 200, res)
}

export default getUserNotifications
