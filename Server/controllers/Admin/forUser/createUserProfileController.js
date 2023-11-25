import mongoose from 'mongoose'
import { Profile, User } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'
const createUserProfile = async (req, res) => {
  
  if (
    req.body.accountID === undefined ||
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.middleName === undefined ||
    req.body.dateOfBirth === undefined ||
    req.body.sex === undefined ||
    req.body.civilStatus === undefined ||
    req.body.occupation === undefined ||
    req.body.email === undefined ||
    req.body.address.streetName === undefined ||
    req.body.address.houseNumber === undefined ||
    req.body.address.subdivisionPurok === undefined
    // req.body.profilePhoto === undefined
  )
    return sendError('Mising Required Fields', 404, res)

  if (!mongoose.isValidObjectId(req.body.accountID))
    return sendError('invalid account ID', 400, res)

  let user
  try {
    user = await User.findById(req.body.accountID)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (!user) return sendError('User not found', 404, res)

  let profile
  try {
    profile = await Profile.findOne({ accountID: req.body.accountID })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (profile) return sendError('Profile already exists', 400, res)

  const address = {
    subdivisionPurok: req.body.address.subdivisionPurok,
    streetName: req.body.address.streetName,
    houseNumber: req.body.address.houseNumber,
  }
  try {
    profile = await Profile.create({
      accountID: req.body.accountID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      dateOfBirth: req.body.dateOfBirth,
      sex: req.body.sex,
      civilStatus: req.body.civilStatus,
      occupation: req.body.occupation,
      email: req.body.email,
      address: address,
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  const payload = profile
  return sendSuccess(payload, 200, res)
}

export default createUserProfile
