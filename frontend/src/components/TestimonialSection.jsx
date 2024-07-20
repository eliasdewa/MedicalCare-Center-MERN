import { Carousel } from '@material-tailwind/react';
import { testimonials } from '../data/data';

export default function TestimonialSection() {
  return (
		<div>
			<div className='text-center w-full pt-8 px-4'>
				<h1 className='text-2xl sm:text-3xl md:text-5xl font-bold py-4 capitalize animate-fade-down animate-duration-[2000ms] mb-6'>
					What our patients say
				</h1>
				<Carousel
					transition={{ duration: 2 }}
					className='rounded-xl w-[80%] sm:w-[60%] mx-auto py-10 bg-[#55AD9B] dark:bg-black z-0'
				>
					{testimonials.map((testimonial, index) => (
						<section
							key={index}
							className='p-4 mx-auto max-w-7xl overflow-hidden rounded-lg hover:bg-slate-100'
						>
							<div className='w-full mx-auto md:w-4/5'>
								<h1 className='text-left mb-10'>{testimonial.quote}</h1>
								<div className='mx-auto mb-3 rounded-full shadow-lg avatar w-20 h-20 '>
									<img
										src={testimonial.avatar}
										alt='Photo of avatar'
										className='rounded-full'
									/>
								</div>
								<p className='text-base font-bold text-[#102C57] dark:text-blue-700'>
									{testimonial.name}
								</p>
								<p className='text-sm font-medium text-[#102C57] dark:text-blue-700'>
									{testimonial.job}
								</p>
							</div>
						</section>
					))}
				</Carousel>
			</div>
		</div>
	);
}
