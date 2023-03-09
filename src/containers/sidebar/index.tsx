import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ErrorIcon from '@mui/icons-material/Error';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import LogoutIcon from '@mui/icons-material/Logout';
import { BrowserView, MobileView } from 'react-device-detect';
import SearchBox from './SearchBox';

import './sidebar.css';

const drawerWidth = 240;

interface Props {
	window?: () => Window;
}

const SideBar = (props: Props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	const drawer = (
		<div>
			<Toolbar
				sx={{ backgroundColor: '#323F8B', color: '#ffffff' }}
			>
				<p className='portal-title'>VP</p>
			</Toolbar>
			<Divider />
			<List
				sx={{
					paddingTop: '0'
				}}
			>
				<ListItem
					key={'pod'}
					disablePadding
					sx={{
						border: '1px solid #ffffff',
						background: '#6F79AE',
						color: '#ffffff',
					}}
				>
					<ListItemButton>
						<ListItemIcon>
						</ListItemIcon>
						<ListItemText className='list-item-text' primary={'Proof of Delivery'} />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;


	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: '#ffffff'
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

					<div className='appbar-content'>
						<SearchBox />
					</div>

					<BrowserView>
						<div className='report-issue-container'>
							<ErrorIcon className='report-icon' />
							<span>Report an issue</span>
						</div>
					</BrowserView>
					<MobileView>
						<div className='report-issue-container'>
							<ErrorIcon className='report-icon-mobile' />
						</div>

					</MobileView>


					<div className='user-icon-container'>
						<div className='user-info'>
							<p className='user-name'> Hello User</p>
							<p className='user-business-name'>Sri sai traders</p>
						</div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="default"
							className='icon-btn'
						>
							<AccountCircle className='user-icon' />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							keepMounted
							TransitionComponent={Fade}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							sx={{

							}}
							PaperProps={{
								style: {
									width: '280px',
									minHeight: '130px',
									border: '1px solid #323F8B'
								},
							}}
						>
							<table className='user-business-info'>
								<tbody>
									<tr>
										<th>Business Name:</th>
										<td>Shri PQR Traders</td>
									</tr>
									<tr>
										<th>Business Address:</th>
										<td>Office No #758, APMC yard, Bengaluru</td>
									</tr>
									<tr>
										<th>GST No.:</th>
										<td>123456687923193</td>
									</tr>
								</tbody>
							</table>
							<hr style={{ width: '90%' }} />
							<div className='logout-container'>
								<LogoutIcon className='logout-icon' />
								<span className='logout-text'>Logout</span>
							</div>

						</Menu>

					</div>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box >
	);
};

export default SideBar;