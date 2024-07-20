import { Carousel, Typography, Button } from '@material-tailwind/react';
import { departments } from '../data/data';
import { Link } from 'react-router-dom';

export function ServicesCarousel() {
	return (
		<Carousel className='rounded-xl w-[80%] mx-auto z-0'>
			{departments.map((department, index) => (
				<div key={index} className='relative w-full'>
					<img
						src={department.image}
						alt='image 1'
						className='h-[400px] w-full object-cover'
					/>
					<div className='absolute inset-0 grid h-full w-full place-items-center bg-black/50'>
						<div className='w-[75%] text-center'>
							<Typography
								variant='h1'
								color='white'
								className='mb-4 text-3xl md:text-4xl lg:text-5xl'
							>
								{department.title}
							</Typography>
							<Typography
								variant='lead'
								color='white'
								className='mb-12 opacity-80'
							>
								{department.description}
							</Typography>
							<Button
								size='lg'
								color='white'
								className='mb-2 hover:bg-white/60'
							>
								<Link to='/appointment'>Book Now</Link>
							</Button>
						</div>
					</div>
				</div>
			))}
		</Carousel>
	);
}
