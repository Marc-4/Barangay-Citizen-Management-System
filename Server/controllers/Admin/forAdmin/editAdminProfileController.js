import { Admin } from '../../../models/index.js'
import { sendSuccess, sendError } from '../../../utils/index.js'

const editAdmin = async (req, res) => {
  console.log('editing admin...')
  console.log(req.body)
  console.log(req.file)

  if (
    req.body.firstName === undefined &&
    req.body.lastName === undefined &&
    req.body.middleName === undefined &&
    req.body.dateOfBirth === undefined &&
    req.body.placeOfBirth_city === undefined &&
    req.body.placeOfBirth_province === undefined &&
    req.body.placeOfBirth_country === undefined &&
    req.body.sex === undefined &&
    req.body.civilStatus === undefined &&
    req.body.occupation === undefined &&
    req.body.citizenship === undefined &&
    req.body.email === undefined &&
    req.body.address_streetName === undefined &&
    req.body.address_houseNumber === undefined &&
    req.body.address_subdivisionPurok === undefined
  )
    return sendError('Mising Required Fields', 404, res)

  //check if admin profile exists
  let admin
  try {
    admin = await Admin.findById(req.user.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!admin) return sendError('admin not found', 404, res)

  //destructure
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    placeOfBirth_city,
    placeOfBirth_province,
    placeOfBirth_country,
    sex,
    civilStatus,
    occupation,
    citizenship,
    email,
    address_streetName,
    address_houseNumber,
    address_subdivisionPurok,
  } = req.body

  const profilePhoto = req.file

  
  const existingUser = await Admin.findOne({ 'profile.email': email })
  
  if (existingUser && existingUser._id.toString() !== admin._id.toString())
    return sendError('email is already taken', 403, res)

  if (firstName) admin.profile.firstName = req.body.firstName
  if (lastName) admin.profile.lastName = req.body.lastName
  if (middleName) admin.profile.middleName = req.body.middleName
  if (dateOfBirth) admin.profile.dateOfBirth = req.body.dateOfBirth
  if (placeOfBirth_city) admin.profile.placeOfBirth.city = placeOfBirth_city
  if (placeOfBirth_province) admin.profile.placeOfBirth.province = placeOfBirth_province
  if (placeOfBirth_country) admin.profile.placeOfBirth.country = placeOfBirth_country
  if (sex) admin.profile.sex = req.body.sex
  if (civilStatus) admin.profile.civilStatus = req.body.civilStatus
  if (occupation) admin.profile.occupation = req.body.occupation
  if (citizenship) admin.profile.citizenship = req.body.citizenship
  if (email) admin.profile.email = req.body.email
  if (address_streetName) admin.profile.address.streetName = address_streetName
  if (address_houseNumber) admin.profile.address.houseNumber = address_houseNumber
  if (address_subdivisionPurok) admin.profile.address.subdivisionPurok = address_subdivisionPurok
  if (profilePhoto?.buffer) admin.profile.profilePhoto.data = profilePhoto.buffer
  if (profilePhoto?.originalname) admin.profile.profilePhoto.fileName = profilePhoto.originalname

  try {
    await admin.save()
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 400, res)
  }

  const payload = admin

  return sendSuccess(payload, 200, res)
}

export default editAdmin
