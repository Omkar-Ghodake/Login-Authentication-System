const mongoose = require('mongoose')
require('dotenv').config()

const connectToMongo = () => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log('Connected to Mongo Successfully'))
		.catch(err => console.log(err))
}

module.exports = connectToMongo