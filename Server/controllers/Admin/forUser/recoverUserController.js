import mongoose from 'mongoose'
import {
  User,
  ArchivedAccount,
  Profile,
  ArchivedProfile,
} from '../../../models/index.js'
import sendError from '../../../utils/sendError.js'

const recoverUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)

  let archivedAccount
  try {
    archivedAccount = await ArchivedAccount.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!archivedAccount) return sendError('archived account not found', 404, res)

  
  let archivedProfile
  try {
    archivedProfile = await ArchivedProfile.findOne({accountID: req.params.id})
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  let profile
  if(archivedProfile){
    profile = Profile.create({
      accountID: archivedProfile.accountID,
      firstName: archivedProfile.firstName,
      lastName: archivedProfile.lastName,
      middleName: archivedProfile.middleName,
      dateOfBirth: archivedProfile.dateOfBirth,
      sex: archivedProfile.sex,
      civilStatus: archivedProfile.civilStatus,
      occupation: archivedProfile.occupation,
      email: archivedProfile.email,
      address: archivedProfile.address,
      dateOfCreation: Date.now(),
    })
  }

  let newUser
  try {
    newUser = User.create({
      username: archivedAccount.username,
      password: archivedAccount.password,
      role: archivedAccount.role,
      active: true,
      dateOfCreation: archivedAccount.dateOfCreation,
    })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  archivedAccount.deleteOne()

  let payload = user

  return sendSuccess(payload, 200, res)
}

export default recoverUser
