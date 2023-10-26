import * as mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  transacType: {
    type: String,
    required: true
  },
    formData:{
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
  }
})

export default mongoose.model('Transaction', transactionSchema)
