const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyLoginSession = (req, res, next) => {
	try {
		const token = req.cookies.authToken
		if (!token) {
			return res.status(401).json({ success: false, error: 'Please Authenticate using Valid Token' })
		}

		const data = jwt.verify(token, process.env.JWT_SECRET)
		req.user = data

		next()
	} catch (error) {
		return res.status(500).json({ success: false, error })
	}
}

module.exports = verifyLoginSession