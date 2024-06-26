import { Employee } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const editEmployee = async (req, res) => {
  console.log('editing employee...')
  console.log(req.body)
  console.log(req.file)
  if (!mongoose.isValidObjectId(req.params.id)) return sendError('invalid employee ID', 400, res)
  if (
    (req.body.firstName === undefined &&
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
      req.body.phone_number === undefined) ||
    (req.body.email === undefined &&
      req.body.address_streetName === undefined &&
      req.body.address_houseNumber === undefined &&
      req.body.address_subdivisionPurok === undefined &&
      req.body.address_cityMunicipality === undefined)
  )
    return sendError('Mising Required Fields', 404, res)

  //check if employee profile exists
  let employee
  try {
    employee = await Employee.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!employee) return sendError('employee not found', 404, res)

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

  const existingUser = await Employee.findOne({ 'profile.email': email })

  if (existingUser && existingUser._id.toString() !== employee._id.toString())
    return sendError('email is already taken', 403, res)

  if (firstName) employee.profile.firstName = req.body.firstName
  if (lastName) employee.profile.lastName = req.body.lastName
  if (middleName) employee.profile.middleName = req.body.middleName
  if (dateOfBirth !== 'null') employee.profile.dateOfBirth = req.body.dateOfBirth
  if (placeOfBirth_city) employee.profile.placeOfBirth.city = placeOfBirth_city
  if (placeOfBirth_province) employee.profile.placeOfBirth.province = placeOfBirth_province
  if (placeOfBirth_country) employee.profile.placeOfBirth.country = placeOfBirth_country
  if (sex) employee.profile.sex = req.body.sex
  if (civilStatus) employee.profile.civilStatus = req.body.civilStatus
  if (occupation) employee.profile.occupation = req.body.occupation
  if (citizenship) employee.profile.citizenship = req.body.citizenship
  if (phone_number) employee.profile.phone_number = req.body.phone_number
  if (email != null) employee.profile.email = req.body.email
  if (address_streetName) employee.profile.address.streetName = address_streetName
  if (address_houseNumber) employee.profile.address.houseNumber = address_houseNumber
  if (address_subdivisionPurok) employee.profile.address.subdivisionPurok = address_subdivisionPurok
  if (address_cityMunicipality) employee.profile.address.cityMunicipality = address_cityMunicipality
  if (profilePhoto?.buffer) employee.profile.profilePhoto.data = profilePhoto.buffer
  if (profilePhoto?.originalname) employee.profile.profilePhoto.fileName = profilePhoto.originalname

  try {
    await employee.save()
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 400, res)
  }

  const payload = { request: employee }

  return sendSuccess(payload, 200, res)
}

export default editEmployee
