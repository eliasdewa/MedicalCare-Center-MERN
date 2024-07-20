import HeroSection from '../components/HeroSection';
import TestimonialSection from '../components/TestimonialSection';
import ServicesSection from '../components/ServicesSection';

export default function Home() {
  return (
		<div className='min-h-screen'>
			<HeroSection />
			<ServicesSection />
			<TestimonialSection />
		</div>
	);
}