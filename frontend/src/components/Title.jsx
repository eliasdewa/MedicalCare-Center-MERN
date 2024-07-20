import React from 'react'

export default function Title({ title, desc }) {
  return (
		<div className='text-center w-full py-8 px-4'>
			<h1 className='text-2xl sm:text-3xl md:text-5xl font-bold py-4 capitalize animate-fade-down animate-duration-[2000ms]'>
				{title}
			</h1>
			<p className='py-3 px-4'>{desc}</p>
		</div>
	);
}
