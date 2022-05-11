const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectToMongo = require('./db')
const cookieParser = require('cookie-parser')

// connecting to MongoDb
connectToMongo()

// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// middleware routes
app.use('/api/user/', require('./routes/user'))

// start express server
app.listen(process.env.PORT, () => {
	console.log(`Express Server Running at http://127.0.0.1:${process.env.PORT}`)
})