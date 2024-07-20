import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaMailchimp, FaTwitter } from "react-icons/fa6";
import { MdEmail, MdOutlineCall, MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className='dark:bg-[#2B2D42]'>
			<div className='mx-auto max-w-screen-xl px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pt-12'>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-3 border-t border-gray-100 pt-12 pb-6'>
					<div>
						<Link to='/' className='flex justify-center sm:justify-start'>
							<img src='/logo.png' alt='logo' className='h-16 sm:h-20' />
						</Link>

						<p className='mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left'>
							EdCare Medical Center is the most famous and well known medical
							center and believe that every patient deserves compassionate,
							personalized care.
						</p>

						<ul className='mt-8 flex justify-center gap-6 sm:justify-start md:gap-8'>
							<li>
								<a
									href='https://www.facebook.com/edcare'
									rel='noreferrer'
									target='_blank'
									className='hover:text-teal-700'
								>
									<FaFacebook size={30} />
								</a>
							</li>

							<li>
								<a
									href='https://www.Instagram.com/ed-care'
									rel='noreferrer'
									target='_blank'
									className='hover:text-teal-700'
								>
									<FaInstagram size={30} />
								</a>
							</li>

							<li>
								<a
									href='https://www.twitter.com/ed-care'
									rel='noreferrer'
									target='_blank'
									className='hover:text-teal-700'
								>
									<FaTwitter size={30} />
								</a>
							</li>

							<li>
								<a
									href='https://www.github.com/ed-care'
									rel='noreferrer'
									target='_blank'
									className='hover:text-teal-700'
								>
									<FaGithub size={30} />
								</a>
							</li>

							<li>
								<a
									href='https://www.edcare.com'
									rel='noreferrer'
									target='_blank'
									className='hover:text-teal-700'
								>
									<FaDribbble size={30} />
								</a>
							</li>
						</ul>
					</div>

					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2'>
						<div className='text-center sm:text-left'>
							<p className='text-lg font-medium'>About Us</p>

							<ul className='mt-8 space-y-4 text-sm'>
								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										Company History
									</a>
								</li>

								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										Meet the Team
									</a>
								</li>

								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										Employee Handbook
									</a>
								</li>

								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										Careers
									</a>
								</li>
							</ul>
						</div>

						<div className='text-center sm:text-left'>
							<p className='text-lg font-medium'>Helpful Links</p>

							<ul className='mt-8 space-y-4 text-sm'>
								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										FAQs
									</a>
								</li>

								<li>
									<a className='transition hover:text-gray-700/75' href='#'>
										Support
									</a>
								</li>
							</ul>
						</div>

						<div className='text-center sm:text-left'>
							<p className='text-lg font-medium'>Contact Us</p>

							<ul className='mt-8 space-y-4 text-sm'>
								<li>
									<a
										className='flex items-center justify-center gap-1.5 sm:justify-start'
										href='#'
									>
										<MdEmail size={20} />

										<span className=''>edcare@gmail.com</span>
									</a>
								</li>

								<li>
									<a
										className='flex items-center justify-center gap-1.5 sm:justify-start'
										href='#'
									>
										<MdOutlineCall size={20} />

										<span className=''>+251910634296</span>
									</a>
								</li>

								<li className='flex items-center justify-center gap-1.5 sm:justify-start'>
									<MdOutlineLocationOn size={20} />
									<address className='-mt-0.5 not-italic'>
										Addis Ababa, Ethiopia
									</address>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='mt-1 pt-6 border-t border-gray-100'>
					<div className='text-center sm:flex sm:justify-between sm:text-left'>
						<p className='text-sm'>
							<span className='block sm:inline'>All rights reserved. </span>

							<a
								className='inline-block underline transition hover:text-teal-600/75'
								href='#'
							>
								Terms & Conditions
							</a>

							<span> &middot; </span>

							<a
								className='inline-block underline transition hover:text-teal-600/75'
								href='#'
							>
								Privacy Policy
							</a>
						</p>

						<p className='mt-4 text-sm sm:order-first sm:mt-0'>
							&copy; 2024 EdCare Medical Center
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

