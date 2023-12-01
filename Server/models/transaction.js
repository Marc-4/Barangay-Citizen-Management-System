import * as mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  transacType: {
    type: String,
    required: true,
  },
  formData: {
    purpose: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
    },
    cost: {
      type: String,
    },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  attachment: {
    type: Buffer,
  },
  status: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Transaction', transactionSchema)
