import { Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
import mongoose from 'mongoose'

const editEmployee = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid profile ID', 400, res)

  //check input use &&
  if (
    req.body.firstName === undefined &&
    req.body.lastName === undefined &&
    req.body.middleName === undefined &&
    req.body.dateOfBirth === undefined &&
    req.body.sex === undefined &&
    req.body.civilStatus === undefined &&
    req.body.occupation === undefined &&
    req.body.email === undefined &&
    req.body.address?.streetName === undefined &&
    req.body.address?.houseNumber === undefined &&
    req.body.address?.subdivisionPurok === undefined
    // req.body.profilePhoto === undefined
  )
    return sendError('Mising Required Fields', 404, res)

  //check if employee profile exists
  let profile
  try {
    profile = await Profile.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!profile) return sendError('Profile not found', 404, res)

  //destructure
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    sex,
    civilStatus,
    occupation,
    email,
    address,
    //profilePhoto,
  } = req.body

  if (firstName) profile.firstName = req.body.firstName
  if (lastName) profile.lastName = req.body.lastName
  if (middleName) profile.middleName = req.body.middleName
  if (dateOfBirth) profile.dateOfBirth = req.body.dateOfBirth
  if (sex) profile.sex = req.body.sex
  if (civilStatus) profile.civilStatus = req.body.civilStatus
  if (occupation) profile.occupation = req.body.occupation
  if (email) profile.email = req.body.email
  if (address.streetName)
    profile.address.streetName = req.body.address.streetName
  if (address.houseNumber)
    profile.address.houseNumber = req.body.address.houseNumber
  if (address.subdivisionPurok)
    profile.address.subdivisionPurok = req.body.address.subdivisionPurok
  //   if(profilePhoto) profile.profilePhoto = req.body.profilePhoto

  try {
    await profile.save()
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 400, res)
  }

  const payload = profile

  return sendSuccess(payload, 200, res)
}

export default editEmployee
