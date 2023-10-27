import { User } from '../../models/index.js'
import bcrypt from 'bcrypt'
import { sendError, sendSuccess } from '../../utils/index.js'

const registerUser = async (req, res) => {
    if (
        req.body.username === undefined ||
        req.body.password === undefined
      ) {
        sendError('missing required fields', 404, res)
        return
      }
    
      let user
      try {
        user = await User.findOne({ username: req.body.username })
      } catch (error) {
        console.log(error)
        sendError('Internal Server Error', 400, res)
        return
      }
    
      if (user) {
        sendError('username taken', 400, res)
        return
      }
    
      let hashedPassword
      try {
        hashedPassword = await bcrypt.hash(req.body.password, 10)
      } catch (error) {
        console.log(error)
        sendError('Internal Server Error', 500, res)
        return
      }
    
      User.create({
        username: req.body.username,
        password: hashedPassword,
        role: 'User',
        active: true,
        dateOfCreation: Date.now(),
      })
      const payload = {
        message: 'User account created successfully',
      }
      sendSuccess(payload, 200, res)
      return
}

export default registerUser