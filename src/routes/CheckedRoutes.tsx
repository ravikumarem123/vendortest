import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../reduxInit/hooks';
import { getVendorId } from '../containers/auth/authSelector';

const CheckedRoutes = () => {
    const vendorId = useAppSelector(getVendorId);
    const location = useLocation();

    return vendorId ? (
        <Navigate to="/" replace state={{ from: location }} />
    ) : (
        <Outlet />
    );
};

export default CheckedRoutes;
