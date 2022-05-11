const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	createUser,
	userLogin,
	userLogout
} = require('../controllers/userController')
const verifyLoginSession = require('../middlewares/verifyLoginSession')

// create user
router.post('/create-user',
	[
		body('name').isLength({ min: 3 }),
		body('email').isEmail(),
		body('password').isLength({ min: 8 }),
		body('confirmPassword').isLength({ min: 8 }),
	],
	createUser
)

// user login
router.post('/login',
	[
		body('email').isEmail(),
		body('password').isLength({ min: 8 })
	],
	userLogin
)

// user logout
router.get('/logout',
	verifyLoginSession,
	userLogout
)

module.exports = router