import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import { MdEmail, MdLocalPhone } from 'react-icons/md';

export default function Doctors() {
	const { isAuthenticated } = useContext(Context);
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

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}
	return (
		<div className='md:ml-64 md:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2'>
			<div className='bg-white rounded-lg p-4 shadow-md my-4'>
				<h1 className='text-center text-4xl font-bold pb-6'>All Doctors</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 justify-content mx-auto gap-3'>
					{doctors && doctors.length > 0 ? (
						doctors.map((element, index) => {
							return (
								<div
									key={index}
									className='flow-root bg-slate-300 rounded-lg border border-gray-100 py-3 px-2 shadow-lg'
								>
									<div className='flex flex-col gap-4 w-full'>
										<img
											src={element.doctorAvatar && element.doctorAvatar.url}
											alt='doctor avatar'
											className='aspect-square w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full object-cover mt-2 mx-auto'
										/>
										<h2 className='text-lg/tight font-bold text-gray-900 text-center'>
											{`${element.firstName} ${element.lastName}`}
										</h2>

										<div className='flex justify-between items-center gap-2'>
											<div className='mt-0.5 text-gray-700 w-full'>
												<div className='flex items-center gap-2'>
													<MdEmail size={20} />
													<span>{element.email}</span>
												</div>
												<div className='flex items-center gap-2'>
													<MdLocalPhone size={20} />{' '}
													<span>{element.phone}</span>
												</div>
											</div>

											<div className='mt-0.5 text-gray-700'>
												<div className='flex items-center gap-2'>
													<strong>Gender</strong>
													<span>{element.gender}</span>
												</div>
												<div className='flex items-center gap-2'>
													<strong>DOB</strong>
													<span>{element.dob.substring(0, 10)}</span>
												</div>
												<div className='flex items-center gap-2'>
													<strong>Department</strong>
													<span>{element.doctorDepartment}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<h1 className='px-6 py-4 whitespace-nowrap text-3xl font-bold text-center'>
							No Registered Doctors Found!
						</h1>
					)}
				</div>
			</div>
		</div>
	);
}
