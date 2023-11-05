import * as mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  accountID:{
    type: String,
    required: true
  },
  notifType: {
    type: String,
    required: true
  },
    message:{
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
  }
})

export default mongoose.model('Notification', notificationSchema)
