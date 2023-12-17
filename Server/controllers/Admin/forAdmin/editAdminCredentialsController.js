import { Admin } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import bcrypt from 'bcrypt'
const editAdminCredentials = async (req, res) => {
  console.log(req.body)
  if (req.body.username === undefined && req.body.new_password === undefined)
    return sendError('missing required fields', 404, res)

  let admin
  try {
    admin = await Admin.findById(req.user.id)
  } catch (error) {
    return sendError('Internal Server Error', 500, res)
  }

  if (!admin) return sendError('admin does not exist', 404, res)

  const { username, new_password, old_password } = req.body

  const result = await bcrypt.compare(old_password, admin.password)
  if (!result) return sendError('incorrect old password', 400, res)

  try {
    if (username) admin.username = username
    if (new_password) {
      const newpass = await bcrypt.hash(new_password, 10)
      admin.password = newpass
    }
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  await admin.save()

  return sendSuccess('success', 200, res)
}

export default editAdminCredentials
