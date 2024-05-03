import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  dateOfCreation: {
    type: Date,
  },
  profile: {
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
    occupation: {
      type: String,
    },
    citizenship: {
      type: String,
    },
    phone_number: {
      type: Number
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
      unique: true,
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
    active: {
      type: Boolean,
    },
  },
})

export default mongoose.model('User', userSchema)
