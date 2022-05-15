import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

	const [inputInfo, setInputInfo] = useState({
		name: '', email: '', password: '', confirmPassword: ''
	})

	const navigate = useNavigate()

	const handleLoginBtnClick = () => {
		navigate('/login')
	}

	const handleSubmitClick = async (e) => {
		e.preventDefault()

		const response = await fetch('http://localhost:4040/api/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...inputInfo })
		})

		const json = await response.json()
		console.log(json)

		setInputInfo({ name: '', email: '', password: '', confirmPassword: '' })
		e.target.reset()
	}

	const onChange = (e) => {
		setInputInfo({ ...inputInfo, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className="Home adjust-layout container">
				<h1 className='mb-3'>Register</h1>
				<form id='registrationForm' onSubmit={handleSubmitClick}>
					<div className="input-group d-flex align-items-center mb-3 w-50">
						<label className='me-3 w-25' htmlFor="name">Name</label>
						<input type="text" name='name' className="form-control rounded-3" onChange={onChange} minLength={3} required />
					</div>

					<div className="input-group d-flex align-items-center mb-3 w-50">
						<label className='me-3 w-25' htmlFor="name">Email</label>
						<input type="email" name='email' className="form-control rounded-3" onChange={onChange} required />
					</div>

					<div className="input-group d-flex align-items-center mb-3 w-50">
						<label className='me-3 w-25' htmlFor="password">Password</label>
						<input type="password" name='password' className="form-control rounded-3" onChange={onChange} minLength={8} required />
					</div>

					<div className="input-group d-flex align-items-center mb-3 w-50">
						<label className='me-3 w-25' htmlFor="confirmPassword">Confirm Password</label>
						<input type="password" name='confirmPassword' className="form-control rounded-3" onChange={onChange} minLength={8} required />
					</div>

					<button className="btn mb-1 submit-btn" type='submit'>REGISTER</button>
				</form>

				<div className="group d-flex align-items-center mb-3">
					<b className='text-primary me-4'>Already have an Account ?</b>
					<button className="btn btn-outline-primary d-flex justify-content-center align-items-center" onClick={handleLoginBtnClick}>Log In</button>
				</div>
			</div>
		</>
	)
}

export default SignUp