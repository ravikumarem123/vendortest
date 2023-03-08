import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import Login from '../containers/auth';
import Counter from '../containers/counter';
import ProofOfDelivery from '../containers/proofofdelivery';
import SideBar from '../containers/sidebar';




const AppRoutes = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<SideBar />}>
					<Route path='/' element={<ProofOfDelivery />} />
				</Route>
			</Routes>

		</BrowserRouter>
	);
};

export default AppRoutes;