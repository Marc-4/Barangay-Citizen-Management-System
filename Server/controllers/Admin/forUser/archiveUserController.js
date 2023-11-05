import mongoose from 'mongoose'
import {
  User,
  ArchivedAccount,
  Profile,
  ArchivedProfile,
} from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const archiveUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)

  let user
  try {
    user = await User.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user not found', 404, res)

  let profile
  try {
    profile = Profile.findOne({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  if (profile) {
    var archived_profile
    archived_profile = await ArchivedProfile.create({
      accountID: profile.accountID,
      firstName: profile.firstName,
      lastName: profile.lastName,
      middleName: profile.middleName,
      dateOfBirth: profile.dateOfBirth,
      sex: profile.sex, 
      civilStatus: profile.civilStatus,
      occupation: profile.occupation,
      email: profile.email,
      address: profile.address,
      dateOfArchive: Date.now(),
    })
    profile.deleteOne()
  }

  const archivedAccount = await ArchivedAccount.create({
    username: user.username,
    password: user.password,
    role: user.role,
    active: false,
    dateOfCreation: user.dateOfCreation,
    dateOfArchive: Date.now(),
  })
  user.deleteOne()

  let payload = {
    'archived account': archivedAccount,
    'archived user profile': archived_profile,
  }

  return sendSuccess(payload, 200, res)
}

export default archiveUser