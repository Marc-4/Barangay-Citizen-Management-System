import * as mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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

export default mongoose.model('Employee', employeeSchema)
