import * as mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  Notiftype: {
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
