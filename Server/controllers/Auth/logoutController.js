import { sendSuccess } from '../../utils/index.js'

const logout = (req, res) => {
  res.clearCookie('authorization')
  sendSuccess('Successfully Logged Out', 200, res)
}

export default logout
