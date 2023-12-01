import { User } from '../../models/index.js'
import bcrypt from 'bcrypt'
import { sendError, sendSuccess } from '../../utils/index.js'

const registerUser = async (req, res) => {
  console.log('user registering..')
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
  ) {
    sendError('missing required fields', 404, res)
    return
  }

  let user
  try {
    user = await User.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
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
  let newUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    role: 'user',
    active: true,
    dateOfCreation: Date.now(),
    profile: profile,
  })
  const payload = newUser
  sendSuccess(payload, 200, res)
  return
}

export default registerUser
