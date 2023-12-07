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
    placeOfBirth: {
      city: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    sex: {
      type: String,
    },
    civilStatus: {
      type: String,
    },
    citizenship: {
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
      data: {
        type: Buffer,
      },
      fileName: {
        type: String,
      },
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
