import React from 'react';
import Title from './Title';
import Form from './Form';

export default function MessageSection() {
	return (
		<div className='dark:bg-[#2B2D42] dark:text-white'>
			<div className='text-center w-full pt-8 px-4'>
				<h1 className='text-2xl sm:text-3xl md:text-5xl font-bold py-4 capitalize animate-fade-down animate-duration-[2000ms]'>
					Send us message
				</h1>
				<p className='py-3 px-4'>Any comments, suggestion or question please</p>
			</div>
			<Form />
		</div>
	);
}
