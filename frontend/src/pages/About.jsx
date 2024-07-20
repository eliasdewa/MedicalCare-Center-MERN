import Title from '../components/Title';
import { MdMedicalServices, MdBusinessCenter } from 'react-icons/md';
import { RiTeamLine, RiCommunityFill } from 'react-icons/ri';
import { FaClinicMedical } from 'react-icons/fa';

export default function About() {
	return (
		<div className='min-h-screen'>
			<Title
				title={'About Us'}
				desc={
					'EdCare Medical Center is the most famous and well known medical center and believe that every patient deserves compassionate, personalized care'
				}
			/>
			<section>
				<div className='max-w-screen px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:items-start'>
						<div className='w-[90%] mx-auto '>
							<h2 className='text-2xl font-bold text-center sm:text-3xl'>
								Our Commitment to Excellence
							</h2>

							<p className='my-4'>
								At EdCare Medical Center, we believe that every patient deserves
								compassionate, personalized care. Our team of dedicated
								healthcare professionals is committed to providing the highest
								quality medical services to our community. Here's what sets us
								apart:
							</p>
						</div>

						<div className='w-[90%] grid grid-cols-1 justify-stretch mx-auto gap-4 sm:grid-cols-2 dark:text-slate-100'>
							<div className='flex flex-col items-center bg-teal-200 dark:bg-black shadow-xl p-3 rounded-md'>
								<MdMedicalServices size={50} />
								<h2 className='mt-2 font-bold'>Comprehensive Services</h2>

								<p className='sm:mt-1 sm:block sm:text-sm'>
									We offer a wide range of medical services, including:{' '}
									<strong>
										Emergency Care, Surgery, Diagnostic Imaging, Obstetrics,
										Cardiopulmonary Services, Acute Care, Rehabilitation
									</strong>{' '}
									and more
								</p>
							</div>
							<div className='flex flex-col items-center bg-teal-200 dark:bg-black shadow-xl p-3 rounded-md'>
								<RiTeamLine size={50} />
								<h2 className='mt-2 font-bold'>Our Team</h2>
								<p className='sm:mt-1 sm:block sm:text-sm sm'>
									Our healthcare professionals are not just experts in their
									fields; they're also compassionate individuals who genuinely
									care about our patients. From our doctors and nurses to our
									administrative staff, everyone at EdCare Medical Center is
									dedicated to your well-being.
								</p>
							</div>
							<div className='flex flex-col items-center bg-teal-200 dark:bg-black shadow-xl p-3 rounded-md'>
								<MdBusinessCenter size={50} />
								<h2 className='mt-2 font-bold'>Patient-Centered Approach</h2>
								<p className='sm:mt-1 sm:block sm:text-sm sm'>
									We put our patients at the center of everything we do. Your
									comfort, safety, and health are our top priorities. We listen
									to your concerns, answer your questions, and involve you in
									your treatment decisions.
								</p>
							</div>
							<div className='flex flex-col items-center bg-teal-200 dark:bg-black shadow-xl p-3 rounded-md'>
								<RiCommunityFill size={50} />
								<h2 className='mt-2 font-bold'>Community Involvement</h2>
								<p className='sm:mt-1 sm:block sm:text-sm sm'>
									EdCare Medical Center actively participates in community
									health initiatives. We organize health fairs, educational
									workshops, and screenings to promote wellness and preventive
									care.
								</p>
							</div>
							<div className='flex flex-col items-center bg-teal-200 dark:bg-black shadow-xl p-3 rounded-md'>
								<FaClinicMedical size={50} />
								<h2 className='mt-2 font-bold'>State-of-the-Art Facilities</h2>
								<p className='sm:mt-1 sm:block sm:text-sm sm'>
									Our modern facility is equipped with the latest medical
									technology. We invest in continuous training for our staff to
									ensure that we deliver the best care possible.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
