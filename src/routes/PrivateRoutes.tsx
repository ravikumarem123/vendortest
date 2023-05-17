import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../reduxInit/hooks';
import { getVendorId } from '../containers/auth/authSelector';


const PrivateRoutes = () => {
	const vendorId = useAppSelector(getVendorId);
	const location = useLocation();


	return vendorId ? (
		<Outlet />
	) : (
		<Navigate
			to={'/login'}
			replace
			state={{ from: location }}
		/>
	);


}

export default PrivateRoutes;