import { User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const editUserCredentials = async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  if (req.body.username === undefined && req.body.password === undefined)
    return sendError('missing required fields', 404, res)

  let user
  try {
    user = await User.findById(req.user.id)
  } catch (error) {
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user does not exist', 404, res)

  const { username, new_password, old_password } = req.body

  if(user.password !== old_password)
  return sendError('incorrect old password', 400, res)

  try {
    if (username) user.username = username
    if (new_password) user.password = new_password
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  await user.save()

  return sendSuccess(user, 200, res)
}

export default editUserCredentials
