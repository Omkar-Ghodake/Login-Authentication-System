const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateJWT = async (res, payload) => {
	const cookieOptions = {
		expires: new Date(Date.now() + (86400000 * 7)),
		httpOnly: true
	}

	const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

	return res.cookie('authToken', authToken, cookieOptions).json({ success: true, message: 'Logged In' })
}

module.exports = generateJWT