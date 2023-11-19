import * as mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true
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
  }
})

export default mongoose.model('Admin', adminSchema)
