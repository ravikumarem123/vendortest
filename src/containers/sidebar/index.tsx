import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import CallIcon from '@mui/icons-material/Call';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Toolbar from '@mui/material/Toolbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import SearchBox from './SearchBox';
import getUserDetails from '../auth/authSelector';
import { events, sendEvents } from '../../appEvents';
import { JeetLogo } from '../../assets';
import { resetSearchState } from '../../common/commonSlice';
import './sidebar.css';
import COLORS from '../../utils/cssutils';
import ProfileContainer from './ProfileContainer';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

const SideBar = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState(pathname.substring(1));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userDetails = useAppSelector(getUserDetails);
    const { t } = useTranslation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        sendEvents(events.ON_CLICK_USER_PROFILE, {});
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sendEvents(events.ON_CLICK_LOGOUT, {});
        localStorage.removeItem('vendorId');
        localStorage.clear();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        navigate('/login');
    };

    const handleSideMenuClick = (menu: string) => {
        setActiveTab(menu);
        dispatch(resetSearchState());
        navigate(`/${menu}`);
        sendEvents(events.ON_CLICK_SIDE_MENU, { menu });
    };

    const handleHomeClick = () => {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/';
    };

    const drawer = (
        <div>
            <Toolbar
                sx={{
                    backgroundColor: `${COLORS.purple}`,
                    color: `${COLORS.white}`,
                }}
            >
                <p className="portal-title" onClick={handleHomeClick}>
                    <img src={JeetLogo} alt="logo" className="logo-jeet" />
                </p>
            </Toolbar>
            <List
                sx={{
                    paddingTop: '0',
                }}
            >
                <ListItem
                    key="pod"
                    disablePadding
                    className={
                        activeTab === 'pod' || activeTab === ''
                            ? 'active-tab'
                            : 'default-tab'
                    }
                    onClick={() => handleSideMenuClick('pod')}
                >
                    <ListItemButton>
                        <ListItemText
                            className="list-item-text"
                            primary={t('sidebar.proofofdelivery')}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key="payment"
                    disablePadding
                    className={
                        activeTab === 'payment' ? 'active-tab' : 'default-tab'
                    }
                    onClick={() => handleSideMenuClick('payment')}
                >
                    <ListItemButton>
                        <ListItemText
                            className="list-item-text"
                            primary={t('sidebar.payment')}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key="invoices"
                    disablePadding
                    className={
                        activeTab === 'invoices' ? 'active-tab' : 'default-tab'
                    }
                    onClick={() => handleSideMenuClick('invoices')}
                >
                    <ListItemButton>
                        <ListItemText
                            className="list-item-text"
                            primary={t('sidebar.invoices')}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: '#ffffff' }} />
                    </IconButton>

                    <div className="appbar-content">
                        <SearchBox />
                    </div>

                    <BrowserView>
                        <div
                            className="report-issue-container"
                            onClick={() =>
                                sendEvents(events.ON_CLICK_REPORT, {})
                            }
                        >
                            <CallIcon className="report-icon" />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <span style={{ fontSize: '15px' }}>
                                    <p>09869304115</p>
                                </span>
                                <span style={{ fontSize: '12px' }}>
                                    10AM to 8PM {t('sidebar.helpline')}
                                </span>
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className="report-issue-container">
                            <SupportAgentIcon className="report-icon-mobile" />
                        </div>
                    </MobileView>

                    <ProfileContainer
                        userDetails={userDetails}
                        handleMenu={handleMenu}
                        handleClose={handleClose}
                        handleLogout={handleLogout}
                        anchorEl={anchorEl}
                    />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            background:
                                'linear-gradient(180deg, #301134 0%, rgba(48, 17, 52, 0.8) 100%)',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default SideBar;
