import * as mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  userFirstName: {
    type: String,
  },
  userLastName: {
    type: String,
  },
  transacType: {
    type: String,
    required: true,
  },
  formData: {
    purpose: {
      type: String,
    },
    income: {
      type: Number,
    },
    cost: {
      type: String,
    },
    // attachment: {
    //   data: {
    //     type: Buffer,
    //   },
    //   fileName: {
    //     type: String,
    //   },
    // },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  // status: {
  //   type: String,
  //   required: true,
  // },
  message:{
    type: String
  }
})

export default mongoose.model('Transaction', transactionSchema)
