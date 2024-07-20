import { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddNewAdmin() {
	const { isAuthenticated } = useContext(Context);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [password, setPassword] = useState('');
	const [adminAvatar, setAdminAvatar] = useState('');
	const [adminAvatarPreview, setAdminAvatarPreview] = useState('');
	const navigate = useNavigate();
	// to handle avatar or preview
	const handleAvatar = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setAdminAvatarPreview(reader.result);
			setAdminAvatar(file);
		};
	};

	const handleAddNewAdmin = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData(); // To send text or file format data to the server
			formData.append('firstName', firstName);
			formData.append('lastName', lastName);
			formData.append('email', email);
			formData.append('phone', phone);
			formData.append('password', password);
			formData.append('gender', gender);
			formData.append('dob', dob);
			formData.append('adminAvatar', adminAvatar);
			await axios
				.post('http://localhost:8000/api/v1/user/admin/register', formData, {
					withCredentials: true,
					headers: {
						enctype: 'multipart/form-data',
					},
				})
				.then((res) => {
					toast.success(res.data.message);
					navigate('/');
					setFirstName('');
					setLastName('');
					setEmail('');
					setPhone('');
					setDob('');
					setGender('');
					setPassword('');
				});
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return (
		<div className='md:ml-64 md:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2'>
			<div className='bg-white rounded-lg p-4 shadow-md my-4'>
				<section className='w-4/5 flex flex-col gap-4 mx-auto p-4'>
					<img src='/logo.png' alt='logo' className='w-[40%] h-[40%] mx-auto' />
					<h1 className='text-center text-3xl font-semibold pb-6'>
						Add New Admin
					</h1>
					<div className='w-full lg:max-w-screen-xl flex items-center justify-between md:items-start flex-col md:flex-row gap-6'>
						<div>
							<img
								src={
									adminAvatarPreview
										? `${adminAvatarPreview}`
										: '/adminAvatar.jpg'
								}
								alt='Admin avatar'
								className='w-full h-[400px] sm:w-[300px] sm:h-[300px] object-cover'
							/>
							<input type='file' onChange={handleAvatar} />
						</div>
						<form
							onSubmit={handleAddNewAdmin}
							className='w-full grid grid-cols-6 gap-6'
						>
							{/* First name */}
							<div className='col-span-6 xl:col-span-3'>
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
							<div className='col-span-6 xl:col-span-3'>
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
							<div className='col-span-6 xl:col-span-3'>
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
							<div className='col-span-6 xl:col-span-3'>
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
							<div className='col-span-6 xl:col-span-3'>
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
							<div className='col-span-6 xl:col-span-3'>
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
							{/* Button */}
							<div className='col-span-6 flex flex-col items-center justify-center gap-4'>
								<button className='w-full inline-block shrink-0 rounded-md bg-[#3ec2ac] hover:bg-[#3ec2ac]/60 px-12 py-3 text-lg font-medium text-white transition focus:outline-none'>
									Register
								</button>
							</div>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
}
