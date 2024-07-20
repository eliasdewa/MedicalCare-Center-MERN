import React from 'react'
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
		<section className="overflow-hidden h-screen bg-[url('/hero.jpg')] bg-cover bg-top bg-no-repeat">
			<div className='flex flex-col items-center justify-center sm:justify-end h-full py-24 dark:bg-black/40'>
				<div className='w-3/4 text-center sm:my-20 animate-fade-right animate-duration-[2000ms]'>
					<h2 className='text-2xl font-extrabold sm:text-3xl md:text-5xl'>
						Welcome to <span className='text-[#FF007F]'>EdCare</span>
					</h2>

					<p className='md:mt-6 md:block md:text-lg md:leading-relaxed'>
						EdCare Medical Center is the most famous and well known medical
						center and believe that every patient deserves compassionate,
						personalized care.
					</p>

					<div className='mt-4 sm:mt-8'>
						<Link
							to='/appointment'
							className='w-full rounded bg-[#FF007F] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#FF007F]/60 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'
						>
							Book an Appointment
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}