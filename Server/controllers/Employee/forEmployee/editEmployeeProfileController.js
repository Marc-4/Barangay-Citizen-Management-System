import { Employee } from '../../../models/index.js'
import { sendSuccess, sendError } from '../../../utils/index.js'

const editEmployee = async (req, res) => {
  console.log('editing employee...')
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

  //check if employee profile exists
  let employee
  try {
    employee = await Employee.findById(req.user.id)
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
    email,
    address_streetName,
    address_houseNumber,
    address_subdivisionPurok,
  } = req.body

  const profilePhoto = req.file

  if (firstName) employee.profile.firstName = req.body.firstName
  if (lastName) employee.profile.lastName = req.body.lastName
  if (middleName) employee.profile.middleName = req.body.middleName
  if (dateOfBirth) employee.profile.dateOfBirth = req.body.dateOfBirth
  if (placeOfBirth_city) employee.profile.placeOfBirth.city = placeOfBirth_city
  if (placeOfBirth_province)
    employee.profile.placeOfBirth.province = placeOfBirth_province
  if (placeOfBirth_country)
    employee.profile.placeOfBirth.country = placeOfBirth_country
  if (sex) employee.profile.sex = req.body.sex
  if (civilStatus) employee.profile.civilStatus = req.body.civilStatus
  if (occupation) employee.profile.occupation = req.body.occupation
  if (citizenship) employee.profile.citizenship = req.body.citizenship
  if (email) employee.profile.email = req.body.email
  if (address_streetName) employee.profile.address.streetName = address_streetName
  if (address_houseNumber)
    employee.profile.address.houseNumber = address_houseNumber
  if (address_subdivisionPurok)
    employee.profile.address.subdivisionPurok = address_subdivisionPurok
  if (profilePhoto?.buffer) employee.profile.profilePhoto.data = profilePhoto.buffer
  if (profilePhoto?.originalname)
    employee.profile.profilePhoto.fileName = profilePhoto.originalname

  try {
    await employee.save()
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 400, res)
  }

  const payload = employee

  return sendSuccess(payload, 200, res)
}

export default editEmployee
