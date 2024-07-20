import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import Messages from './components/Messages';
import Doctors from './components/Doctors';
import { Context } from './main';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewAdmin from './components/AddNewAdmin';
import Sidebar from './components/Sidebar';
import GetAllPatients from './components/GetAllPatients';

export default function App() {
	const { isAuthenticated, setIsAuthenticated, setUser } =
		useContext(Context);
	//To get user
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8000/api/v1/user/admin/me',
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
			<Sidebar />
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/login' element={<Login />} />
				<Route path='/messages' element={<Messages />} />
				<Route path='/patients' element={<GetAllPatients />} />
				<Route path='/doctors' element={<Doctors />} />
				<Route path='/doctor/register' element={<AddNewDoctor />} />
				<Route path='/admin/register' element={<AddNewAdmin />} />
			</Routes>
			<ToastContainer position='top-center' />
		</Router>
	);
}
