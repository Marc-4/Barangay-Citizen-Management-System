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
    else if (req.query.filter && req.query.filter == 'UNREAD')
      notifications = await Notification.find({
        recipient: req.user.id,
        status: 'UNREAD',
      })
    else if (req.query.filter && req.query.filter == 'READ')
      notifications = await Notification.find({
        recipient: req.user.id,
        status: 'READ',
      })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!notifications) return sendError('No Notifications Found', 404, res)

  const payload = notifications
  return sendSuccess(payload, 200, res)
}

export default getUserNotifications
