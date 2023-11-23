import * as mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    index: true,
  },
  middleName: {
    type: String,
    index: true,
  },
  dateOfBirth: {
    type: Date,
  },
  placeOfBirth: {
    type: Date,
  },
  sex: {
    type: String,
    index: true,
  },
  civilStatus: {
    type: String,
    index: true,
  },
  occupation: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  address: {
    streetName: {
      type: String,
    },
    houseNumber: {
      type: String,
    },
    subdivisionPurok: {
      type: String,
    },
  },
  email: {
    type: String,
    unique: true
  },
  profilePhoto: {
    type: String
  },
  active: {
    type: Boolean,
  },
})

export default mongoose.model('Profile', profileSchema)
