import {
	MdClose,
	MdOutlinePowerSettingsNew,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sidebarLinks } from '../data/data';
import { FiMenu } from 'react-icons/fi';

export default function Sidebar() {
	const [showMenu, setShowMenu] = useState(false);

	const { isAuthenticated, setIsAuthenticated } = useContext(Context);

	const handleLogout = async () => {
		await axios
			.get('http://localhost:8000/api/v1/user/admin/logout', {
				withCredentials: true,
			})
			.then((res) => {
				toast.success(res.data.message);
				setIsAuthenticated(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<div style={!isAuthenticated ? { display: 'none' } : { display: 'flex' }}>
			{/* Toggle menu */}
			<div className='fixed'>
				<span
					onClick={() => setShowMenu(!showMenu)}
					className='md:hidden text-2xl inline-flex items-center justify-center p-2 rounded-full cursor-pointer text-[#000] ml-4 mt-5 bg-gray-300 hover:bg-gray-600'
				>
					<FiMenu />
				</span>
			</div>
			{showMenu && (
				<div className='md:hidden w-[50%] h-screen fixed top-0 left-0 bg-gray-900 text-white p-4'>
					<div className='flex flex-col gap-8 py-4 relative'>
						<ul className='p-2 space-y-4'>
							{sidebarLinks.map(({ id, title, to, icon }) => (
								<li key={id}>
									<NavLink
										to={to}
										activeclassname='active'
										className='px-2 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gray-600'
										onClick={() => setShowMenu(false)}
									>
										{icon}
										<span className='-mr-1 font-medium'>{title}</span>
									</NavLink>
								</li>
							))}
						</ul>
						{/* Logout button */}
						<button
							className='px-2 mb-2 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-red-300'
							onClick={handleLogout}
						>
							<MdOutlinePowerSettingsNew size={30} />
							<span>Log Out</span>
						</button>
						<span
							onClick={() => setShowMenu(false)}
							className='absolute top-0 right-0 text-gray-400 hover:bg-red-500 rounded-md text-2xl cursor-pointer'
						>
							<MdClose />
						</span>
					</div>
				</div>
			)}
			<div
				id='sideNav'
				className='hidden md:flex flex-col justify-between hidden bg-white w-64 h-screen fixed rounded-none border-none'
			>
				{/* Links */}
				<div>
					<ul className='p-4 space-y-4'>
						{sidebarLinks.map(({ id, title, to, icon }) => (
							<li key={id}>
								<NavLink
									to={to}
									activeclassname='active'
									className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gray-600'
								>
									{icon}
									<span className='-mr-1 font-medium'>{title}</span>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				{/* Logout button */}
				<div>
					<button
						className='mx-4 mb-4 px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-red-300'
						onClick={handleLogout}
					>
						<MdOutlinePowerSettingsNew size={30} />
						<span>Log Out</span>
					</button>
				</div>
			</div>
		</div>
	);
}
