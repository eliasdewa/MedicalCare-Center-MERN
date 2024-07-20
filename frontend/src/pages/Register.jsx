import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
	// Initialize the authentication
	const { isAuthenticated, setIsAuthenticated } = useContext(Context);
	// Initialize the input
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [password, setPassword] = useState('');
	// To navigate
	const navigate = useNavigate();
	// To handle registration
	const handleRegistration = async (e) => {
		e.preventDefault();
		try {
			await axios
				.post(
					'http://localhost:8000/api/v1/user/patient/register',
					{ firstName, lastName, email, password, phone, dob, gender },
					{
						withCredentials: true,
						headers: { 'Content-Type': 'application/json' },
					}
				)
				.then((res) => {
					toast.success(res.data.message);
					setIsAuthenticated(true);
					navigate('/');
					setFirstName('');
					setLastName('');
					setEmail('');
					setPassword('');
					setPhone('');
					setDob('');
					setGender('');
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
					<h1 className='text-center text-2xl sm:text-3xl font-semibold pb-2'>Register</h1>
					<p className='text-center font-semibold pb-4'>Sign up to continue</p>
					<form
						onSubmit={handleRegistration}
						className='grid grid-cols-6 gap-6'
					>
						{/* First name */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='FirstName' className='label'>
								First Name
							</label>

							<input
								type='text'
								id='FirstName'
								name='first_name'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className='input'
							/>
						</div>
						{/* Last name */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='LastName' className='label'>
								Last Name
							</label>

							<input
								type='text'
								id='LastName'
								name='last_name'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className='input'
							/>
						</div>
						{/* Email */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='Email' className='label'>
								{' '}
								Email{' '}
							</label>

							<input
								type='email'
								id='Email'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='input'
							/>
						</div>
						{/* Password */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='Password' className='label'>
								{' '}
								Password{' '}
							</label>

							<input
								type='password'
								id='Password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='input'
							/>
						</div>
						{/* Phone number */}
						<div className='col-span-6'>
							<label htmlFor='Phone' className='label'>
								{' '}
								Phone Number{' '}
							</label>

							<input
								type='tel'
								id='Phone'
								name='phone number'
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className='input'
							/>
						</div>
						{/* Date of birth */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='DateOfBirth' className='label'>
								Date of Birth
							</label>

							<input
								type='date'
								id='DateOfBirth'
								name='dateOfBirth'
								value={dob}
								onChange={(e) => setDob(e.target.value)}
								className='input'
							/>
						</div>
						{/* Gender */}
						<div className='col-span-6 sm:col-span-3'>
							<label htmlFor='Gender' className='label'>
								Gender
							</label>

							<select
								className='input'
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							>
								<option value=''>Select Gender</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						{/* Term and Policy */}
						<div className='col-span-6'>
							<p className='text-sm'>
								By creating an account, you agree to our{' '}
								<Link to='/about' className='underline'>
									Terms and Conditions
								</Link>{' '}
								and{' '}
								<Link to='/about' className='underline'>
									Privacy Policy
								</Link>
								.
							</p>
						</div>
						{/* Button */}
						<div className='col-span-6 flex flex-col items-center justify-center gap-4'>
							<button className='w-full inline-block shrink-0 rounded-md bg-[#3ec2ac] hover:bg-[#3ec2ac]/60 px-12 py-3 text-lg font-medium text-white transition focus:outline-none'>
								Sign Up
							</button>

							<p className='mt-4 text-sm sm:mt-0'>
								Already have an account?{' '}
								<Link
									to='/login'
									className='text-blue-600 font-semibold hover:underline'
								>
									Log In
								</Link>
							</p>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}
