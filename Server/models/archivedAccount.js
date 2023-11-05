import * as mongoose from 'mongoose'

const archivedAccountSchema = new mongoose.Schema({
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
  },
  dateOfArchive:{
    type: Date
  }
})

export default mongoose.model('ArchivedAccount', archivedAccountSchema)