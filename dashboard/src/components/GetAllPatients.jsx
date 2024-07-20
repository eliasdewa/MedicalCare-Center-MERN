import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function GetAllPatients() {
  const { isAuthenticated } = useContext(Context);
	// To get all doctors
	const [patients, setPatients] = useState([]);
	useEffect(() => {
		const fetchAllPatients = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/api/v1/user/patient/getall',
					{ withCredentials: true }
				);
				setPatients(data.allPatients);
			} catch (error) {
				toast.error(error.response.data.message);
			}
		};
		fetchAllPatients();
	}, []);

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}
	return (
		<div className='md:ml-64 md:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2'>
			<div className='bg-white rounded-lg p-4 shadow-md my-4'>
				<h1 className='text-center text-4xl font-bold pb-6'>
					All Registered Patients
				</h1>
				<div className='flex flex-col'>
					<div className='overflow-x-auto'>
						<div className='p-1.5 w-full inline-block align-middle'>
							<div className='overflow-hidden border rounded-lg'>
								<table className='min-w-full divide-y divide-gray-200'>
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
												Phone
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
												Gender
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{patients && patients.length > 0 ? (
											patients.map((patient) => (
												<tr key={patient._id}>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{`${patient.firstName} ${patient.lastName}`}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{patient.email}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-wrap'>
														{patient.phone}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-wrap'>
														{patient.dob.substring(0, 10)}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-wrap'>
														{patient.gender}
													</td>
												</tr>
											))
										) : (
											<td
												className='px-6 py-4 whitespace-nowrap text-3xl font-bold text-center'
											>
												No Patient Registered Yet!
											</td>
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
