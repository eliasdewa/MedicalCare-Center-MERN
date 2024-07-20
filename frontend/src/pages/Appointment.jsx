import { useEffect, useState } from 'react';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { departments } from '../data/data';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [appointmentDate, setAppointmentDate] = useState('');
	const [department, setDepartment] = useState('');
	const [doctorFirstName, setDoctorFirstName] = useState('');
	const [doctorLastName, setDoctorLastName] = useState('');
	const [address, setAddress] = useState('');
	const [hasVisited, setHasVisited] = useState(false);

	// To navigate
	const navigate = useNavigate()

	// To get all doctors
	const [doctors, setDoctors] = useState([]);
	useEffect(() => {
		const fetchDoctors = async () => {
			const { data } = await axios.get(
				'http://localhost:8000/api/v1/user/doctors',
				{ withCredentials: true }
			);
			setDoctors(data.doctors);
		};
		fetchDoctors();
	}, []);

	// Handle appointment
	const handleAppointment = async (e) => {
		e.preventDefault();
		try {
			const hasVisitedBool = Boolean(hasVisited);
			const { data } = await axios.post(
				'http://localhost:8000/api/v1/appointment/send',
				{
					firstName,
					lastName,
					email,
					phone,
					dob,
					gender,
					appointment_date: appointmentDate,
					department,
					doctor_firstName: doctorFirstName,
					doctor_lastName: doctorLastName,
					hasVisited: hasVisitedBool,
					address,
				},
				{
					withCredentials: true,
					headers: { 'Content-Type': 'application/json' },
				}
			);
			toast.success(data.message);
			navigate('/')
			setFirstName(''),
			setLastName(''),
			setEmail(''),
			setPhone(''),
			setDob(''),
			setGender(''),
			setAppointmentDate(''),
			setDepartment(''),
			setDoctorFirstName(''),
			setDoctorLastName(''),
			setHasVisited(''),
			setAddress('');
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className='min-h-screen'>
			<Title
				title={'Schedule your appointment'}
				desc={
					'Making appointments is an effective way to manage your time and be more productive. It helps you stay organized, prioritize tasks, and get more done in less time'
				}
			/>
			<div className='w-full sm:max-w-screen-xl flex items-center sm:items-start flex-col sm:flex-row gap-3 mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='w-full sm:w-1/2 p-3 rounded-xl shadow-2xl bg-[#d8dada] dark:bg-[#000]'>
					<div className='flex items-center flex-col gap-3 container py-3 px-4'>
						<h1 className='text-center text-3xl font-semibold pb-2'>
							Appointment
						</h1>
						<form
							onSubmit={handleAppointment}
							className='w-full grid grid-cols-6 gap-6'
						>
							{/* First name */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='firstName' className='label'>
									First Name
								</label>

								<input
									type='text'
									id='firstName'
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className='input'
								/>
							</div>
							{/* Last name */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='lastName' className='label'>
									Last Name
								</label>

								<input
									type='text'
									id='lastName'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className='input'
								/>
							</div>
							{/* Email */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='email' className='label'>
									Email
								</label>

								<input
									type='email'
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='input'
								/>
							</div>
							{/* Phone number */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='phone' className='label'>
									Phone Number
								</label>

								<input
									type='tel'
									id='phone'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className='input'
								/>
							</div>
							{/* Gender */}
							<div className='col-span-6'>
								<label htmlFor='Gender' className='label'>
									Gender
								</label>

								<select
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className='input'
								>
									<option value=''>Select Gender</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
								</select>
							</div>
							{/* Date of birth */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='dob' className='label'>
									Date of Birth
								</label>

								<input
									type='date'
									id='dob'
									value={dob}
									onChange={(e) => setDob(e.target.value)}
									className='input'
								/>
							</div>
							{/* Date of appointment */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='appointmentDate' className='label'>
									Date of Appointment
								</label>

								<input
									type='date'
									id='appointmentDate'
									value={appointmentDate}
									onChange={(e) => setAppointmentDate(e.target.value)}
									className='input'
								/>
							</div>
							{/* Select department */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='department' className='label'>
									Select Department
								</label>

								<select
									id='department'
									className='input'
									value={department}
									placeholder='Select Department'
									onChange={(e) => {
										setDepartment(e.target.value);
										setDoctorFirstName('');
										setDoctorLastName('');
									}}
								>
									{departments.map((depart, index) => {
										return (
											<option value={depart.title} key={index}>
												{depart.title}
											</option>
										);
									})}
								</select>
							</div>
							{/* Select doctor */}
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='doctor' className='label'>
									Select Doctor
								</label>

								<select
									id='doctor'
									className='input'
									value={`${doctorFirstName} ${doctorLastName}`}
									onChange={(e) => {
										const [firstName, lastName] = e.target.value.split(' ');
										setDoctorFirstName(firstName);
										setDoctorLastName(lastName);
									}}
									disabled={!department}
								>
									<option value=''>Select Doctor</option>
									{doctors
										.filter((doctor) => doctor.doctorDepartment === department)
										.map((doctor, index) => (
											<option
												value={`${doctor.firstName} ${doctor.lastName}`}
												key={index}
											>
												Dr. {doctor.firstName} {doctor.lastName}
											</option>
										))}
								</select>
							</div>
							{/* address */}
							<div className='col-span-6'>
								<label htmlFor='address' className='label'>
									Your Address
								</label>
								<textarea
									className='w-full rounded-lg border border-gray-500 p-3 text-sm'
									rows='6'
									id='address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							{/* checkbox */}
							<div className='col-span-6'>
								<label htmlFor='Accept' className='flex gap-4'>
									<input
										type='checkbox'
										id='Accept'
										name='accept'
										checked={hasVisited}
										onChange={(e) => setHasVisited(e.target.checked)}
										className='size-5 rounded-md border-gray-200 bg-white shadow-sm'
									/>

									<span className='text-sm'>Have you visited before?</span>
								</label>
							</div>
							{/* Button */}
							<div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
								<button
									type='submit'
									className='mt-12 inline-block w-full rounded-lg bg-[#125678] px-5 py-3 font-medium hover:bg-[#125678]/75'
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className='hidden sm:inline-flex sm:w-1/2'>
					<img src='/Appointment.jpg' alt='appointment' />
				</div>
			</div>
		</div>
	);
}
