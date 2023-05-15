import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const vendorId = localStorage.getItem('vendorId');
    const location = useLocation();

    return vendorId ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoutes;
