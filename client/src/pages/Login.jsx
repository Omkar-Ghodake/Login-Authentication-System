import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

	const [inputInfo, setInputInfo] = useState({
		email: '', password: ''
	})

	const navigate = useNavigate()

	const handleRegisterClick = () => {
		navigate('/signup')
	}

	const handleSubmitClick = async (e) => {
		e.preventDefault()

		const response = await fetch('http://localhost:4040/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...inputInfo })
		})

		const json = await response.json()
		console.log(json)

		setInputInfo({ email: '', password: '' })
		e.target.reset()
	}

	const onChange = (e) => {
		setInputInfo({ ...inputInfo, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className="Home adjust-layout container">
				<h1 className='mb-4'>Log In</h1>

				<form onSubmit={handleSubmitClick}>
					<div className="input-group d-flex align-items-center mb-4 w-50">
						<label className='me-3 w-25' htmlFor="name">Email</label>
						<input type="email" name='email' className="form-control rounded-3" onChange={onChange} required />
					</div>

					<div className="input-group d-flex align-items-center mb-4 w-50">
						<label className='me-3 w-25' htmlFor="password">Password</label>
						<input type="password" name='password' className="form-control rounded-3" onChange={onChange} minLength={8} required />
					</div>

					<button className="btn mb-3 submit-btn" type='submit'>Log In</button>
				</form>

				<div className="group d-flex align-items-center mb-4">
					<b className='text-success me-4'>Don't have and Account ?</b>
					<button className="btn btn-outline-success d-flex justify-content-center align-items-center" onClick={handleRegisterClick}>Register</button>
				</div>
			</div>
		</>
	)
}

export default Login