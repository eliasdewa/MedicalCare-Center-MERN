import React from 'react'
import Title from '../components/Title';
import Form from '../components/Form';

export default function Contact() {
  return (
		<div className='min-h-screen'>
			<Title
				title='Contact Us'
				desc='Ready to experience the EdCare difference? Reach out to us
			today'
			/>
			<Form />
		</div>
	);
}