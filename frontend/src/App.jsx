import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import { FaArrowCircleUp } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import axios from 'axios'

export default function App() {
	const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
	// To get the user
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8000/api/v1/user/patient/me',
					{
						withCredentials: true,
					}
				);
				setIsAuthenticated(true);
				setUser(response.data.user);
			} catch (error) {
				setIsAuthenticated(false);
				setUser({});
			}
		};
		fetchUser();
	}, [isAuthenticated]);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/appointment' element={<Appointment />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			<Footer />
			{/* Scroll to top */}
			<div>
				<button
					onClick={() => window.scrollTo(0, 0)}
					className='absolute text-4xl sm:text-6xl right-5 mt-[-16rem] cursor-pointer hover:scale-105 text-indigo-600 dark:text-teal-500 animate-bounce'
				>
					<FaArrowCircleUp />
				</button>
			</div>
			{/* Toast */}
			<ToastContainer position='top-center' />
		</Router>
	);
}
