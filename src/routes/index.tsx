import {
	Route,
	Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../containers/auth';
import CustomHistoryRouter from './CustomHistoryRouter';
import ProofOfDelivery from '../containers/proofofdelivery';
import SideBar from '../containers/sidebar';
import ErrorDialog from '../common/ErrorDialog';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../reduxInit/store';
import PrivateRoutes from './PrivateRoutes';
import CheckedRoutes from './CheckedRoutes';


const AppRoutes = () => {

	return (
		<CustomHistoryRouter history={history}>
			<Routes>
				<Route
					element={
						<PrivateRoutes />
					}
				>
					<Route path='/' element={<SideBar />}>
						<Route path='/' element={<ProofOfDelivery />} />
					</Route>
				</Route>
				<Route
					element={
						<CheckedRoutes />
					}
				>
					<Route path='/login' element={<Login />} />
				</Route>
			</Routes>
			<ToastContainer />
			<ErrorDialog />
		</CustomHistoryRouter>
	);
};

export default AppRoutes;