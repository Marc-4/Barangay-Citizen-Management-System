import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { sendError } from './utils/index.js'
import {
  userRouter,
  adminRouter,
  authRouter,
  employeeRouter,
} from './routes/index.js'

const PORT = 3000

dotenv.config()
const app = express()

//middlewares
app.use(cookieParser())
app.use(express.json())

//routers
app.use('/api/admin', adminRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.all('*', (req, res) => {
  console.log('unhandled request')
  sendError('Page not found', 404, res)
})

//db connection
mongoose.connect(process.env.DB_URI, { useNewURLParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log('connected to DB'))

app.listen(PORT, () => {
  console.log('API server is live at ' + PORT)
})

// export { db }
