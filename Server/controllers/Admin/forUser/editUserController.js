import { User } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const editUser = async (req, res) => {
  console.log('editing user...')
  console.log(req.body)
  console.log(req.file)
  if (!mongoose.isValidObjectId(req.params.id)) return sendError('invalid user ID', 400, res)
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
    req.body.phone_number === undefined ||
    req.body.email === undefined &&
    req.body.address_streetName === undefined &&
    req.body.address_houseNumber === undefined &&
    req.body.address_subdivisionPurok === undefined &&
    req.body.address_cityMunicipality === undefined
  )
    return sendError('Mising Required Fields', 404, res)

  console.log(req.body)
  //check if user profile exists
  let user
  try {
    user = await User.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user not found', 404, res)

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
    phone_number,
    email,
    address_streetName,
    address_houseNumber,
    address_subdivisionPurok,
    address_cityMunicipality,
  } = req.body

  const profilePhoto = req.file

  console.log('DOB: ' + req.body.dateOfBirth)

  const existingUser = await User.findOne({ 'profile.email': email })

  // console.log("existing: " + existingUser?._id);
  // console.log("user: " + user._id);
  if (existingUser && existingUser._id.toString() !== user._id.toString())
    // if(existingUser.profile.email === user)
    return sendError('email is already taken', 403, res)


  if (firstName) user.profile.firstName = req.body.firstName
  if (lastName) user.profile.lastName = req.body.lastName
  if (middleName) user.profile.middleName = req.body.middleName
  if (dateOfBirth !== 'null') user.profile.dateOfBirth = dateOfBirth
  if (placeOfBirth_city) user.profile.placeOfBirth.city = placeOfBirth_city
  if (placeOfBirth_province) user.profile.placeOfBirth.province = placeOfBirth_province
  if (placeOfBirth_country) user.profile.placeOfBirth.country = placeOfBirth_country
  if (sex) user.profile.sex = req.body.sex
  if (civilStatus) user.profile.civilStatus = req.body.civilStatus
  if (occupation) user.profile.occupation = req.body.occupation
  if (citizenship) user.profile.citizenship = req.body.citizenship
  if (phone_number) user.profile.phone_number = req.body.phone_number
  if (email != null) user.profile.email = req.body.email
  if (address_streetName) user.profile.address.streetName = address_streetName
  if (address_houseNumber) user.profile.address.houseNumber = address_houseNumber
  if (address_subdivisionPurok) user.profile.address.subdivisionPurok = address_subdivisionPurok
  if (address_cityMunicipality) user.profile.address.cityMunicipality = address_cityMunicipality
  if (profilePhoto?.buffer) user.profile.profilePhoto.data = profilePhoto.buffer
  if (profilePhoto?.originalname) user.profile.profilePhoto.fileName = profilePhoto.originalname

  try {
    await user.save()
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 400, res)
  }

  const payload = { request: user }

  return sendSuccess(payload, 200, res)
}

export default editUser
