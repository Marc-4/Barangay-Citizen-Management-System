import * as mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  requestContent: {
    firtName: {
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
      subdivision_purok: {
        type: String,
      },
    },
    email: {
      type: String,
    },
    profilePhoto: {
      type: Buffer,
    },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Request', requestSchema)
