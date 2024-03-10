import { sendError, sendSuccess } from '../../../utils/index.js'
import { User } from '../../../models/index.js'
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  console.log('registering a user...')
  try {
    if (
      req.body.username === undefined ||
      req.body.password === undefined ||
      req.body.firstName === undefined ||
      req.body.lastName === undefined ||
      req.body.middleName === undefined ||
      req.body.dateOfBirth === undefined ||
      req.body.placeOfBirth_city === undefined ||
      req.body.placeOfBirth_province === undefined ||
      req.body.placeOfBirth_country === undefined ||
      req.body.sex === undefined ||
      req.body.civilStatus === undefined ||
      req.body.occupation === undefined ||
      req.body.citizenship === undefined ||
      req.body.email === undefined ||
      req.body.address_streetName === undefined ||
      req.body.address_houseNumber === undefined ||
      req.body.address_subdivisionPurok === undefined
    )
      return sendError('Missing required parameters', 404, res)

    // Check if username exists in db
    let user = await User.findOne({ username: req.body.username })
    if (user) return sendError('Username Taken', 400, res)
    if (await User.findOne({ 'profile.email': req.body.email }))
      return sendError('email is already taken', 403, res)

    const profilePhoto = req.file
    // if (!profilePhoto) {
    //   return sendError('Profile photo is missing', 400, res)
    // }

    const encryptedPass = await bcrypt.hash(req.body.password, 10)

    const profile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: {
        city: req.body.placeOfBirth_city,
        province: req.body.placeOfBirth_province,
        country: req.body.placeOfBirth_country,
      },
      sex: req.body.sex,
      civilStatus: req.body.civilStatus,
      occupation: req.body.occupation,
      citizenship: req.body.citizenship,
      email: req.body.email,
      address: {
        streetName: req.body.address_streetName,
        houseNumber: req.body.address_houseNumber,
        subdivisionPurok: req.body.address_subdivisionPurok,
      },
      profilePhoto: {
        data: profilePhoto?.buffer,
        fileName: profilePhoto?.originalname,
      },
    }
    let newUser = await User.create({
      username: req.body.username,
      password: encryptedPass,
      role: 'user',
      active: true,
      dateOfCreation: Date.now(),
      profile: profile,
    })

    const payload = newUser
    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default registerUser
