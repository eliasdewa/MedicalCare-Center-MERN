import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
	// Initialize the authentication
	const { isAuthenticated, setIsAuthenticated } = useContext(Context);
	// Initialize the input
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	// To navigate
	const navigate = useNavigate();
	// To handle login
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await axios
				.post(
					'http://localhost:8000/api/v1/user/login',
					{ email, password, confirmPassword, role: 'Admin' },
					{
						withCredentials: true,
						headers: { 'Content-Type': 'application/json' },
					}
				)
				.then((res) => {
					toast.success(res.data.message);
					setIsAuthenticated(true);
					navigate('/');
					setEmail('');
					setPassword('');
					setConfirmPassword('');
				});
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};
	// Authentication
	if (isAuthenticated) {
		return <Navigate to={'/'} />;
	}
	return (
		<div>
			<div className='w-[80%] sm:w-[50%] md:w-[35%] flex items-center flex-col gap-3 container mx-auto mt-10 p-4 shadow-xl bg-[#d8dada] rounded-3xl'>
				<img src='/logo.png' alt='logo' className='w-[40%] h-[40%]' />
				<h1 className='text-center text-3xl font-semibold pb-2'>Welcome</h1>
				<p className='text-center font-semibold'>
					Only admin are allowed to Login
				</p>
				<form onSubmit={handleLogin} className='w-[95%] grid grid-cols-6 gap-6 my-4'>
					{/* Email */}
					<div className='col-span-6'>
						<label htmlFor='email' className='label'>
							{' '}
							Email{' '}
						</label>

						<input
							type='email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='input'
						/>
					</div>
					{/* Password */}
					<div className='col-span-6 sm:col-span-3'>
						<label htmlFor='password' className='label'>
							{' '}
							Password{' '}
						</label>

						<input
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='input'
						/>
					</div>
					{/* Confirm Password */}
					<div className='col-span-6 sm:col-span-3'>
						<label htmlFor='ConfirmPassword' className='label'>
							{' '}
							Confirm Password{' '}
						</label>

						<input
							type='password'
							id='ConfirmPassword'
							name='confirm_password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='input'
						/>
					</div>
					{/* Button */}
					<div className='col-span-6 flex flex-col justify-center sm:items-center sm:gap-4'>
						<button className='w-[100%] inline-block shrink-0 rounded-md bg-[#3ec2ac] hover:bg-[#3ec2ac]/60 px-12 py-3 text-lg font-medium text-white transition focus:outline-none'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
