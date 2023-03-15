import { Navigate, Outlet, useLocation } from 'react-router-dom';


const CheckedRoutes = () => {
	const vendorId = localStorage.getItem('vendorId');
	const location = useLocation();


	return vendorId ? (
		<Navigate
			to={'/'}
			replace
			state={{ from: location }}
		/>
	) : (
		<Outlet />
	);


}

export default CheckedRoutes;