import { Profile, ProfileRequest } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const requestCreateUserProfile = async (req, res) => {
  if (
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
    req.body.address.subdivision_Purok === undefined
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

  let oldRequest
  try {
    oldRequest = await ProfileRequest.findOne({
      accountID: req.user.id,
      requestType: 'CREATE',
      status: 'PENDING',
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (oldRequest) return sendError('similar request still pending', 400, res)

  const address = {
    streetName: req.body.address.streetName,
    houseNumber: req.body.address.houseNumber,
    subdivision_Purok: req.body.address.subdivision_Purok,
  }

  let request
  try {
    request = await ProfileRequest.create({
      accountID: req.user.id,
      requestType: 'create',
      requestContent: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        sex: req.body.sex,
        civilStatus: req.body.civilStatus,
        occupation: req.body.occupation,
        email: req.body.email,
      },
      address: address,
      timestamp: Date.now(),
      status: 'PENDING',
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  const payload = {
    message: 'User profile request sent successfully',
    request: request,
  }
  return sendSuccess(payload, 200, res)
}

export default requestCreateUserProfile
