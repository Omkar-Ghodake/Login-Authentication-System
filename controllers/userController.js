const User = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')
require('dotenv').config()

// create user
exports.createUser = async (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ success: false, validationErrors })
	}

	try {
		const user = await User.findOne({ email: req.body.email })
		if (user) {
			return res.status(400).json({ success: false, error: 'User with this email already exists' })
		}

		if (req.body.password !== req.body.confirmPassword) {
			return res.status(400).json({ success: false, error: 'Passwords did not match' })
		}

		// password hashing
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)

		req.body.password = hashedPassword

		await User.create(req.body)

		return res.json({ success: true, message: 'User Created Successfully' })
	} catch (error) {
		return res.status(500).json({ success: false, error })
	}
}

// user login
exports.userLogin = async (req, res) => {
	const validaionErrors = validationResult(req)
	if (!validaionErrors.isEmpty()) {
		return res.status(400).json({ success: false, validaionErrors })
	}

	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ success: false, error: 'User not Found' })
		}

		const validatePassword = await bcrypt.compare(password, user.password)
		if (!validatePassword) {
			return res.status(400).json({ success: false, error: 'Incorrect Password' })
		}

		const payload = {
			user: user._id
		}

		generateJWT(res, payload)
		// res.json({ success: true, message: 'Logged In' })
	} catch (error) {
		return res.status(500).json({ success: false, error })
	}
}

//user logout
exports.userLogout = async (req, res) => {
	try {
		const cookieOptions = {
			expires: new Date(Date.now()),
			httpOnly: true
		}

		res.cookie('authToken', null, cookieOptions)

		return res.json({ success: true, message: 'Logged Out' })
	} catch (error) {
		return res.json({ success: false, error })
	}
}