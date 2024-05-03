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
    req.body.placeOfBirth_city === undefined ||
    req.body.placeOfBirth_province === undefined ||
    req.body.placeOfBirth_country === undefined ||
    req.body.sex === undefined ||
    req.body.civilStatus === undefined ||
    req.body.occupation === undefined ||
    req.body.citizenship === undefined ||
    req.body.phone_number === undefined ||
    req.body.email === undefined ||
    req.body.phone_number === undefined ||
    req.body.address_streetName === undefined ||
    req.body.address_houseNumber === undefined ||
    req.body.address_subdivisionPurok === undefined
  )
    return sendError('missing required parameters', 404, res)

  let employee
  try {
    employee = await Employee.findOne({ username: req.body.username })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (employee) return sendError('username Taken', 400, res)
  if (await Employee.findOne({ 'profile.email': req.body.email }))
    return sendError('email is already taken', 403, res)

  const profilePhoto = req.file
  // if (!profilePhoto) {
  //   return sendError('Profile photo is missing', 400, res)
  // }

  const encryptedPass = await bcrypt.hash(req.body.password, 10)

  const profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: {
      city: req.body.placeOfBirth_city,
      province: req.body.placeOfBirth_province,
      country: req.body.placeOfBirth_country,
    },
    sex: req.body.sex,
    civilStatus: req.body.civilStatus,
    occupation: req.body.occupation,
    citizenship: req.body.citizenship,
    phone_number: req.body.phone_number,
    email: req.body.email,
    address: {
      streetName: req.body.address_streetName,
      houseNumber: req.body.address_houseNumber,
      subdivisionPurok: req.body.address_subdivisionPurok,
    },
    profilePhoto: {
      data: profilePhoto?.buffer || null,
      fileName: profilePhoto?.originalname || '',
    },
  }

  let newEmployee
  try {
    newEmployee = await Employee.create({
      username: req.body.username,
      password: encryptedPass,
      role: 'employee',
      active: true,
      dateOfCreation: Date.now(),
      profile: profile,
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  const payload = newEmployee
  return sendSuccess(payload, 200, res)
}

export default registerEmployee
