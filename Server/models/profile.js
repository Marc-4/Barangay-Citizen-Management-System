import * as mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  middleName: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  sex: {
    type: String
  },
  civilStatus: {
    type: String
  },
  occupation: {
    type: String
  },
  address: {
    streetName: {
      type: String
    },
    houseNumber: {
      type: String
    },
    subdivision_purok:{
      type: String
    }
  },
  profilePhoto: {
    type: Buffer,
  }
})

export default mongoose.model('Profile', profileSchema)
