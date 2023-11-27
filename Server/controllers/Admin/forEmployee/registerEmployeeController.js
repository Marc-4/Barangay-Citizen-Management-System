import { sendError, sendSuccess } from '../../../utils/index.js'
import { Employee } from '../../../models/index.js'
import bcrypt from 'bcrypt'

const registerEmployee = async (req, res) => {
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
    return sendError('missing required parameters', 404, res)

  //check if username exists in db
  let employee
  try {
    employee = await Employee.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (employee) return sendError('username Taken', 400, res)

  //encrypt pass
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
  //register
  let newEmployee
  try {
    newEmployee = await Employee.create({
      username: req.body.username,
      password: encryptedPass,
      role: 'employee',
      active: true,
      dateOfCreation: Date.now(),
      profile: profile
    })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }
  const payload = newEmployee
  sendSuccess(payload, 200, res)
}

export default registerEmployee
