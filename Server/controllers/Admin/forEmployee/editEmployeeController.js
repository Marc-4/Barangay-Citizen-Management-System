import { Employee } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const editEmployee = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid employee ID', 400, res)

  //check input use &&
  if (
    req.body.firstName === undefined &&
    req.body.lastName === undefined &&
    req.body.middleName === undefined &&
    req.body.dateOfBirth === undefined &&
    req.body.placeOfBirth.city === undefined &&
    req.body.placeOfBirth.province === undefined &&
    req.body.placeOfBirth.country === undefined &&
    req.body.sex === undefined &&
    req.body.civilStatus === undefined &&
    req.body.occupation === undefined &&
    req.body.citizenship === undefined &&
    req.body.email === undefined &&
    req.body.address?.streetName === undefined &&
    req.body.address?.houseNumber === undefined &&
    req.body.address?.subdivisionPurok === undefined
    // req.body.profilePhoto === undefined
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

  if (!employee) return sendError('Employee not found', 404, res)

  //destructure
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    placeOfBirth,
    sex,
    civilStatus,
    occupation,
    citizenship,
    email,
    address,
    //profilePhoto,
  } = req.body

  if (firstName) employee.profile.firstName = req.body.firstName
  if (lastName) employee.profile.lastName = req.body.lastName
  if (middleName) employee.profile.middleName = req.body.middleName
  if (dateOfBirth) employee.profile.dateOfBirth = req.body.dateOfBirth
  if (placeOfBirth.city) employee.profile.placeOfBirth.city = req.body.placeOfBirth.city
  if (placeOfBirth.province) employee.profile.placeOfBirth.province = req.body.placeOfBirth.province
  if (placeOfBirth.country) employee.profile.placeOfBirth.country = req.body.placeOfBirth.country
  if (sex) employee.profile.sex = req.body.sex
  if (civilStatus) employee.profile.civilStatus = req.body.civilStatus
  if (occupation) employee.profile.occupation = req.body.occupation
  if (citizenship) employee.profile.citizenship = req.body.citizenship
  if (email) employee.profile.email = req.body.email
  if (address.streetName) employee.profile.address.streetName = req.body.address.streetName
  if (address.houseNumber) employee.profile.address.houseNumber = req.body.address.houseNumber
  if (address.subdivisionPurok) employee.profile.address.subdivisionPurok = req.body.address.subdivisionPurok
  //   if(profilePhoto) profile.profilePhoto = req.body.profilePhoto

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
