import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  console.log('registering a user...')

  try {
    if (
      req.body.username === undefined ||
      req.body.password === undefined ||
      req.body.firstName === undefined ||
      req.body.lastName === undefined ||
      req.body.middleName === undefined ||
      req.body.dateOfBirth === undefined ||
      req.body.placeOfBirth.city === undefined ||
      req.body.placeOfBirth.province === undefined ||
      req.body.placeOfBirth.country === undefined ||
      req.body.sex === undefined ||
      req.body.civilStatus === undefined ||
      req.body.occupation === undefined ||
      req.body.citizenship === undefined ||
      req.body.email === undefined ||
      req.body.address.streetName === undefined ||
      req.body.address.houseNumber === undefined ||
      req.body.address.subdivisionPurok === undefined
    )
      return sendError('Missing required parameters', 404, res)

    // Check if username exists in db
    let user = await User.findOne({ username: req.body.username })
    if (user) {
      return sendError('Username Taken', 400, res)
    }

    const encryptedPass = await bcrypt.hash(req.body.password, 10)

    const profile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: req.body.placeOfBirth,
      sex: req.body.sex,
      civilStatus: req.body.civilStatus,
      occupation: req.body.occupation,
      citizenship: req.body.citizenship,
      email: req.body.email,
      address: req.body.address,
    }
    console.log(profile)
    let newUser = await User.create({
      username: req.body.username,
      password: encryptedPass,
      role: 'user',
      active: true,
      dateOfCreation: Date.now(),
      profile: profile,
    })

    const payload = newUser
    sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default registerUser