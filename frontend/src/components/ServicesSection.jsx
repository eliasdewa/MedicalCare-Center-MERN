import { ServicesCarousel } from './ServicesCarousel';

export default function ServicesSection() {
  return (
		<div className='m-auto'>
			<div className='text-center w-full pt-8 px-4'>
				<h1 className='text-2xl sm:text-3xl md:text-5xl font-bold py-4 capitalize animate-fade-down animate-duration-[2000ms]'>
					Our Services
				</h1>
				<p className='py-6 px-4 text-left'>
					We provide 24 hours of medical services from Monday to
					Sunday for both in and out patients. It also provides high quality
					emergency services, organizing specialists with patients-focused care
					who are accessible and responsive. This care is delivered by skilled
					and motivated staff, in collaboration with overseas medical experts
				</p>
			</div>

			<ServicesCarousel />
		</div>
	);
}
