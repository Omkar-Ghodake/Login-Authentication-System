import React from 'react'
import '../css/pages/Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

	const navigate = useNavigate()

	const handleRegisterClick = () => {
		navigate('/signup')
	}

	const handleLoginBtnClick = () => {
		navigate('/login')
	}

	return (
		<>
			<div className="Home adjust-layout fit-content">
				<div className="container border rounded-3 ms-4 px-5 py-3">
					<div className="group d-flex align-items-center mb-5">
						<h3 className='text-primary me-4'>Please Log In to Continue</h3>
						<button className="btn btn-outline-primary d-flex justify-content-center align-items-center" onClick={handleLoginBtnClick}>Log In</button>
					</div>

					<div className="group d-flex align-items-center mb-5">
						<h3 className='text-success me-4'>Don't have and Account ?</h3>
						<button className="btn btn-outline-success d-flex justify-content-center align-items-center" onClick={handleRegisterClick}>Register</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home