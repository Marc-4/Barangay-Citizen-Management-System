import * as mongoose from 'mongoose'

const archivedProfileSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  sex: {
    type: String,
  },
  civilStatus: {
    type: String,
  },
  occupation: {
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
  },
  profilePhoto: {
    type: Buffer,
  },
  dateOfArchive:{
    type: Date
  }
})

export default mongoose.model('ArchivedProfile', archivedProfileSchema)
