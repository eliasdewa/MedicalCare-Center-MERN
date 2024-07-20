import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdEmail, MdOutlinePhoneCallback } from 'react-icons/md';

export default function Form() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios
				.post(
					'http://localhost:8000/api/v1/message/send',
					{ firstName, lastName, email, message },
					{
						withCredentials: true,
						headers: { 'Content-Type': 'application/json' },
					}
				)
				.then((res) => {
					toast.success(res.data.message);
					setFirstName('');
					setLastName('');
					setEmail('');
					setMessage('');
				});
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<section>
			<div className='w-full px-4 grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-2'>
				{/* Left side */}
				<div>
					<div className='grid grid-cols-3 md:grid-cols-2 gap-2'>
						<div className='w-full flex flex-col gap-2 items-center bg-teal-200/80 dark:bg-[#000]/70 dark:hover:bg-[#000] shadow-xl p-4 rounded-md hover:bg-teal-300 cursor-pointer'>
							<MdEmail size={50} />
							<h2 className='mt-2 font-bold'>Email Us</h2>
							<p>edcare@gmail.com</p>
						</div>
						<div className='w-full flex flex-col gap-2 items-center bg-teal-200/80 dark:bg-[#000]/70 dark:hover:bg-[#000] shadow-xl p-4 rounded-md hover:bg-teal-300 cursor-pointer'>
							<MdOutlinePhoneCallback size={50} />
							<h2 className='mt-2 font-bold'>Call Us</h2>
							<p>+251 910 634296</p>
						</div>
						<div className='w-full flex flex-col gap-2 items-center bg-teal-200/80 dark:bg-[#000]/70 dark:hover:bg-[#000] shadow-xl p-4 rounded-md hover:bg-teal-300 cursor-pointer lg:col-span-2'>
							<FaMapLocationDot size={50} />
							<h2 className='mt-2 font-bold'>Our Address</h2>
							<p>Lafto, Addis Ababa, Ethiopia</p>
						</div>
					</div>
				</div>
				{/* Right side */}
				<div>
					<div className='rounded-lg p-8 shadow-xl lg:col-span-3 bg-[#d8dada] dark:bg-[#000]'>
						<h1 className='text-center text-2xl font-semibold pb-10'>
							Send us a message
						</h1>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<div>
									<input
										type='text'
										placeholder='First Name'
										id='first_name'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className='input'
									/>
								</div>
								<div>
									<input
										type='text'
										placeholder='Last Name'
										id='last_name'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className='input'
									/>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4'>
								<div>
									<input
										type='email'
										placeholder='Email address'
										id='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='input'
									/>
								</div>
							</div>

							<div>
								<textarea
									type='text'
									placeholder='Write your message here...'
									rows='8'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									id='message'
									className='w-full rounded-lg border border-gray-500 p-3 text-sm dark:text-gray-600'
								></textarea>
							</div>

							<div className='mt-4'>
								<button
									type='submit'
									className='inline-block w-full rounded-lg bg-indigo-500 px-5 py-3 font-medium sm:w-auto hover:scale-105'
								>
									Send Message
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
