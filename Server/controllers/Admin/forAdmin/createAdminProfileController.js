import { Profile } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const createAdminProfile = async (req, res) => {
  if (
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.middleName === undefined ||
    req.body.dateOfBirth === undefined ||
    req.body.sex === undefined ||
    req.body.civilStatus === undefined ||
    req.body.occupation === undefined
    // req.body.address === undefined
    // req.body.profilePhoto === undefined
  )
    return sendError('missing required fields', 404, res)

    let profile
  try {
    profile = await Profile.findOne({ accountID: req.user.id })
  } catch (error) {
    console.log()
    return sendError('Internal Server Error', 400, res)
  }

  if (profile) return sendError('profile already exists', 400, res)

  Profile.create({
    accountID: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    sex: req.body.sex,
    civilStatus: req.body.civilStatus,
    occupation: req.body.occupation,
  })

  const payload = {
    message: 'Admin profile created successfully',
  }
  return sendSuccess(payload, 200, res)
}

export default createAdminProfile
