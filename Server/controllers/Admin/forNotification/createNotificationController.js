import { Notification } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
const createNotification = async (req, res) => {
  if (
    req.body.notifType === undefined ||
    req.body.message === undefined
  )
    return sendError('Missing Required Fields', 404, res)

  let notification
  try {
    notification = await Notification.create({
      accountID: req.user.id,
      notifType: req.body.notifType,
      message: req.body.message,
      timestamp: Date.now(),
      recipient: req.body.recipient,
      status: 'UNREAD',
    })

    const payload = notification
    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default createNotification
