import { User, ProfileRequest } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const requestEditUserProfile = async (req, res) => {
  console.log(req.body);
  if (
    req.body.firstName === undefined &&
    req.body.lastName === undefined &&
    req.body.middleName === undefined &&
    req.body.placeOfBirth.city === undefined &&
    req.body.placeOfBirth.province === undefined &&
    req.body.placeOfBirth.country === undefined &&
    req.body.dateOfBirth === undefined &&
    req.body.sex === undefined &&
    req.body.civilStatus === undefined &&
    req.body.occupation === undefined &&
    req.body.citizenship === undefined &&
    req.body.email === undefined &&
    req.body.address?.streetName === undefined &&
    req.body.address?.houseNumber === undefined &&
    req.body.address?.subdivision_Purok === undefined
    // req.body.profilePhoto === undefined
  )
    return sendError('missing required fields', 404, res)

  let user
  try {
    user = await User.findById(req.user.id)
  } catch (error) {
    console.log()
    return sendError('Internal Server Error', 400, res)
  }

  if (!user) return sendError('user does not exist', 404, res)

  let oldrequest
  try {
    oldrequest = await ProfileRequest.findOne({
      accountID: req.user.id,
      requestType: 'EDIT',
      status: 'PENDING',
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  if (oldrequest) return sendError('similar request still pending', 400, res)

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
  } = req.body

  let requestContent = {
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    placeOfBirth: {
      city: '',
      province: '',
      country: ''
    },
    sex: '',
    civilStatus: '',
    occupation: '',
    citizenship: '',
    email: '',
    address: {
      streetName: '',
      houseNumber: '',
      subdivision_Purok: ''
    },
  }

  let request
  try {
    if (firstName) requestContent.firstName = firstName
    if (lastName) requestContent.lastName = lastName
    if (middleName) requestContent.middleName = middleName
    if (dateOfBirth) requestContent.dateOfBirth = dateOfBirth
    if (placeOfBirth?.city) requestContent.placeOfBirth.city = placeOfBirth.city
    if (placeOfBirth?.province) requestContent.placeOfBirth.province = placeOfBirth.province
    if (placeOfBirth?.country) requestContent.placeOfBirth.country = placeOfBirth.country
    if (sex) requestContent.sex = sex
    if (civilStatus) requestContent.civilStatus = civilStatus
    if (occupation) requestContent.occupation = occupation
    if (citizenship) requestContent.occupation = citizenship
    if (email) requestContent.email = email
    if (address?.streetName) requestContent.address.streetName = address.streetName
    if (address?.houseNumber) requestContent.address.houseNumber = address.houseNumber
    if (address?.subdivision_Purok) requestContent.address.subdivision_Purok = address.subdivision_Purok

    request = await ProfileRequest.create({
      accountID: req.user.id,
      requestType: 'EDIT',
      requestContent: requestContent,
      timestamp: Date.now(),
      status: 'PENDING',
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  const payload = {
    message: 'profile edit request sent successfully',
    request: request,
  }
  return sendSuccess(payload, 200, res)
}

export default requestEditUserProfile
