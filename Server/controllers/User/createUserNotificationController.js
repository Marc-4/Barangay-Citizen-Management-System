import { Admin, Employee, Notification, User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'
const createUserNotification = async (req, res) => {
  console.log(req.body);
  if (
    req.body.notifType === undefined ||
    req.body.message === undefined ||
    req.body.linkID === undefined
  )
    return sendError('Missing Required Fields', 404, res)

  try {
    const adminAccounts = await Admin.find()
    const employeeAccounts = await Employee.find()
    // const user = await User.findOne({ _id: req.user.id })

    for (const admin of adminAccounts) {
      await Notification.create({
        accountID: req.user.id,
        notifType: req.body.notifType,
        linkID: req.body.linkID,
        message: req.body.message,
        timestamp: Date.now(),
        recipient: admin._id,
        status: 'UNREAD',
      })
    }

    for (const employee of employeeAccounts) {
      await Notification.create({
        accountID: req.user.id,
        notifType: req.body.notifType,
        linkID: req.body.linkID,
        message: req.body.message,
        timestamp: Date.now(),
        recipient: employee._id,
        status: 'UNREAD',
      })
    }

    const payload = { message: 'successfully sent notifications' }
    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default createUserNotification
