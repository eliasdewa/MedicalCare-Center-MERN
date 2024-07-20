import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navLink } from '../data/data';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false);

	// to change theme, light or dark theme
	const [theme, setTheme] = useState(null);
	const element = document.documentElement;
	useEffect(() => {
		if (theme === 'dark') {
			element.classList.add('dark');
		} else {
			element.classList.remove('dark');
		}
	}, [theme]);

	const handleThemeSwitch = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	// Authentication
	const { isAuthenticated, setIsAuthenticated, user } = useContext(Context)
	// To navigate
	const navigate = useNavigate();
	// Handle logout
	const handleLogout = async () => {
		await axios
			.get('http://localhost:8000/api/v1/user/patient/logout', {
				withCredentials: true,
			})
			.then((res) => {
				toast.success(res.data.message);
				navigate('/');
				setIsAuthenticated(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<div className='w-full sticky top-0 z-50 flex justify-between items-center shadow-md bg-[#e0e4ea] dark:bg-[#2B2D42] dark:text-white'>
			{/* Logo */}
			<div className='ml-4'>
				<Link to='/'>
					<img
						src='/logo.png'
						alt='logo'
						className='w-full h-12 sm:h-16 md:h-20 cursor-pointer'
					/>
				</Link>
			</div>
			{/* Nav links */}
			<div className='flex justify-between items-center gap-5'>
				<ul className='hidden md:inline-flex items-center gap-6 lg:gap-10'>
					{navLink.map(({ id, title, to }) => (
						<li key={id}>
							<NavLink to={to} activeClassName='active'>
								{title}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			{/* Login & register */}
			<div className='flex items-center gap-2 sm:gap-4'>
				{isAuthenticated ? (
					<div className='flex gap-2 items-center border-gray-100'>
						<img
							alt='user profile'
							src='/login.png'
							className='size-10 rounded-full object-cover'
						/>

						<div className='flex '>
							<p className='text-xs'>
								<strong className='block font-medium'>{`${user.firstName} ${user.lastName}`}</strong>
								<span>{user.email}</span>
							</p>
						</div>
						{/* Logout */}
						<button
							className='rounded-md bg-[#98B5]/60 hover:bg-[#97E8B5] px-3 py-1 sm:px-5 sm:py-2.5 mx-4 text-md font-medium'
							onClick={handleLogout}
						>
							LOGOUT
						</button>
					</div>
				) : (
					<div className='sm:flex sm:gap-4'>
						<button
							onClick={() => navigate('/login')}
							className='rounded-md bg-[#FE6700]/60 hover:bg-[#FE6700] px-3 py-1 sm:px-5 sm:py-2.5 text-md font-medium text-white shadow'
						>
							Login
						</button>

						<div className='hidden sm:flex'>
							<button
								onClick={() => navigate('/register')}
								className='rounded-md bg-teal-600/60 hover:bg-teal-600 px-5 py-2.5 text-md font-medium'
							>
								Register
							</button>
						</div>
					</div>
				)}
				{/* Theme button and Toggle menu */}
				<div className='flex items-center'>
					{/* Theme button */}
					<button
						className='rounded-full dark:text-black font-semibold mr-2'
						onClick={handleThemeSwitch}
					>
						{theme === 'dark' ? (
							<MdOutlineLightMode className='w-8 h-8 text-gray-300' />
						) : (
							<MdOutlineDarkMode className='w-8 h-8 text-gray-400' />
						)}
					</button>
					{/* Toggle menu */}
					<span
						onClick={() => setShowMenu(!showMenu)}
						className='text-2xl md:hidden inline-flex items-center justify-center rounded-full cursor-pointer text-[#000] dark:text-white mr-8'
					>
						<FiMenu />
					</span>
				</div>
			</div>
			{/* Toggle menu */}
			{showMenu && (
				<div className='md:hidden w-[50%] h-screen absolute top-0 right-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4'>
					<div className='flex flex-col gap-8 py-4 relative'>
						<ul className='flex flex-col gap-4 pt-3'>
							{navLink.map(({ id, title, to }) => (
								<li
									key={id}
									className='font-semibold hover:bg-teal-600 cursor-pointer duration-300 p-1'
								>
									<NavLink
										to={to}
										activeClassName='active'
										onClick={() => setShowMenu(false)}
									>
										{title}
									</NavLink>
								</li>
							))}
						</ul>
						<span
							onClick={() => setShowMenu(false)}
							className='absolute top-0 right-3 text-gray-400 dark:text-gray-900  hover:bg-red-500 rounded-md text-2xl cursor-pointer'
						>
							<MdClose />
						</span>
					</div>
				</div>
			)}
		</div>
	);
};
