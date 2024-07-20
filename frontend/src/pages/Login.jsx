import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
					{ email, password, confirmPassword, role: 'Patient' },
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
		<div className='min-h-screen'>
			<section className='flex gap-2 max-w-4xl mx-auto p-10'>
				{/* Lefts side */}
				<section className='relative w-1/3 items-center flex-col gap-3 container mx-auto'>
					<img
						alt=''
						src='/EdCare.jpg'
						className='absolute inset-0 h-full w-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-xl'
					/>
				</section>
				{/* Right side */}
				<div className='w-2/3 items-center flex-col gap-3 container mx-auto p-4 shadow-xl bg-[#d8dada]  dark:bg-gray-800 rounded-tr-3xl rounded-br-3xl'>
					<h1 className='text-center text-2xl sm:text-3xl font-semibold pb-2'>
						Welcome
					</h1>
					<p className='text-center font-semibold pb-4'>Login to your account</p>
					<form onSubmit={handleLogin} className='grid grid-cols-6 gap-6'>
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
						<div className='col-span-6'>
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
						<div className='col-span-6'>
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
							<button className='w-full inline-block shrink-0 rounded-md bg-[#3ec2ac] hover:bg-[#3ec2ac]/60 px-12 py-3 text-lg font-medium text-white transition focus:outline-none'>
								Login
							</button>

							<p className='mt-4 text-sm sm:mt-0'>
								Don't you have an account?{' '}
								<Link
									to='/register'
									className='text-blue-600 font-semibold hover:underline'
								>
									Register
								</Link>
							</p>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}
