import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../containers/auth';
import Counter from '../containers/counter';
import ProofOfDelivery from '../containers/proofofdelivery';
import SideBar from '../containers/sidebar';
import 'react-toastify/dist/ReactToastify.css';




const AppRoutes = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<SideBar />}>
					<Route path='/' element={<ProofOfDelivery />} />
				</Route>
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
};

export default AppRoutes;