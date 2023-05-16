import { useTranslation } from 'react-i18next';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Fade from '@mui/material/Fade';
import LogoutIcon from '@mui/icons-material/Logout';
import COLORS from '../../utils/cssutils';
import { UserDetails } from '../auth/authTypes';

interface ProfileProps {
    userDetails: UserDetails;
    handleMenu: (e: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    handleLogout: () => void;
    anchorEl: null | HTMLElement;
}

const ProfileContainer = ({
    userDetails,
    handleMenu,
    handleClose,
    handleLogout,
    anchorEl,
}: ProfileProps) => {
    const { t } = useTranslation();

    const { businessName, businessAddress, gstNumber } = userDetails;

    return (
        <div className="user-icon-container">
            <div className="user-info">
                <p className="user-name">{t('sidebar.welcome')}</p>
                <p className="user-business-name">{businessName}</p>
            </div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="default"
                className="icon-btn"
            >
                <AccountCircle className="user-icon" />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                TransitionComponent={Fade}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '280px',
                        minHeight: '130px',
                        border: `1px solid ${COLORS.purple}`,
                    },
                }}
            >
                <table className="user-business-info">
                    <tbody>
                        <tr>
                            <th>{t('sidebar.businessname')}:</th>
                            <td> {businessName} </td>
                        </tr>
                        <tr>
                            <th>{t('sidebar.businessaddress')}:</th>
                            <td>{businessAddress}</td>
                        </tr>
                        <tr>
                            <th>{t('sidebar.gstno')}:</th>
                            <td>{gstNumber}</td>
                        </tr>
                    </tbody>
                </table>
                <hr style={{ width: '90%' }} />
                <div className="logout-container" onClick={handleLogout}>
                    <LogoutIcon className="logout-icon" />
                    <span className="logout-text">{t('sidebar.logout')}</span>
                </div>
            </Menu>
        </div>
    );
};

export default ProfileContainer;
