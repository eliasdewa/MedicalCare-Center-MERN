import { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { GoCheckCircleFill } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function Dashboard() {
	const { isAuthenticated, user } = useContext(Context);
	// To get all the appointments
	const [appointments, setAppointments] = useState([]);
	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/api/v1/appointment/getall',
					{ withCredentials: true } // to get data from server, withCredentials should be set to true
				);
				setAppointments(data.allAppointments);
			} catch (error) {
				setAppointments([]);
				console.log(error.response.data.message);
			}
		};
		fetchAppointments();
	}, []);

	// To get all doctors
	const [doctors, setDoctors] = useState([]);
	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/api/v1/user/doctors',
					{ withCredentials: true }
				);
				setDoctors(data.doctors);
			} catch (error) {
				toast.error(error.response.data.message);
			}
		};
		fetchDoctors();
	}, []);

	const handleUpdateStatus = async (appointmentId, status) => {
		try {
			const { data } = await axios.put(
				`http://localhost:8000/api/v1/appointment/update/${appointmentId}`,
				{ status },
				{ withCredentials: true }
			);
			setAppointments((prevAppointments) =>
				prevAppointments.map((appointment) =>
					appointment._id === appointmentId
						? { ...appointment, status }
						: appointment
				)
			);
			toast.success(data.message);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return (
		<div className='md:ml-64 md:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2'>
			<div className='flex flex-col sm:flex-row gap-4 items-stretch'>
				<div className='bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%] md:w-[50%]'>
					<div className='flex flex-col gap-2 lg:flex-row justify-center items-center h-full'>
						<img
							src={user.adminAvatar ? user.adminAvatar.url : '/adminAvatar.jpg'}
							alt='docImg'
							className='h-25 w-25 sm:h-30 sm:w-30 md:h-40 md:w-40 object-cover rounded-full'
						/>
						<div>
							<div className='text-center'>
								<h1>Hello</h1>
								<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-600'>
									{user && `${user.firstName} ${user.lastName}`}{' '}
								</h2>
							</div>
						</div>
					</div>
				</div>
				{/* Status */}
				<div className='bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%] md:w-[50%]'>
					<div className='flex flex-wrap justify-between h-full'>
						{/* Total appointment */}
						<div className='flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2'>
							<h1 className='text-xl text-center font-semibold'>
								Total Appointments
							</h1>
							<p className='text-3xl font-extrabold'>{appointments.length}</p>
						</div>
						{/* Total doctors */}
						<div className='flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2'>
							<h1 className='text-xl text-center font-semibold'>
								Registered Doctors
							</h1>
							<p className='text-3xl font-extrabold'>{doctors.length}</p>
						</div>
					</div>
				</div>
			</div>
			{/* Table */}
			<div className='bg-white rounded-lg p-4 shadow-md my-4 h-full'>
				<h5 className='text-center text-4xl font-bold pb-6'>Appointments</h5>
				<div className='flex flex-col'>
					<div className='overflow-x-auto'>
						<div className='p-1.5 w-full inline-block align-middle'>
							<div className='overflow-scroll border rounded-lg'>
								<table className='divide-y divide-gray-200 w-full min-w-max table-auto'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Patient Full Name
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Email
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Phone Number
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Gender
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												DOB
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Date of Appointment
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Department
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Selected Doctor
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Address
											</th>

											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Visited Before?
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Status
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{appointments && appointments.length > 0 ? (
											appointments.map((appointment) => (
												<tr key={appointment._id}>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{`${appointment.firstName} ${appointment.lastName}`}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.email}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.phone}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.gender}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.dob.substring(0, 10)}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.appointment_date.substring(0, 10)}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.department}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.address}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{appointment.hasVisited === true ? (
															<GoCheckCircleFill className='green' />
														) : (
															<AiFillCloseCircle className='text-[#dc2626]' />
														)}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														<select
															className={
																appointment.status === 'Pending'
																	? 'text-[#eab308]'
																	: appointment.status === 'Accepted'
																	? 'text-[#16a34a]'
																	: 'text-[##dc2626]'
															}
															value={appointment.status}
															onChange={(e) =>
																handleUpdateStatus(
																	appointment._id,
																	e.target.value
																)
															}
														>
															<option
																value='Pending'
																className='text-[#eab308]'
															>
																Pending
															</option>
															<option
																value='Accepted'
																className='text-[#16a34a]'
															>
																Accepted
															</option>
															<option
																value='Rejected'
																className='text-[##dc2626]'
															>
																Rejected
															</option>
														</select>
													</td>
												</tr>
											))
										) : (
											<div className='text-center font-semibold text-2xl pt-10'>
												No Appointments Found!
											</div>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
