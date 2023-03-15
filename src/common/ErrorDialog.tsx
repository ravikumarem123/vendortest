import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../reduxInit/hooks';
import { getDialogDetails } from './commonSelector';
import { setDialogClose } from './commonSlice';
import { useNavigate } from 'react-router-dom';


const ErrorDialog = () => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const dialogDetails = useAppSelector(getDialogDetails);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClose = () => {
		if (dialogDetails.logout) {
			localStorage.removeItem('vendorId');
			localStorage.removeItem('userDetails');
			navigate('/login');
		}
		dispatch(setDialogClose());
	};

	return (
		<Dialog
			//fullScreen={fullScreen}
			open={dialogDetails.open}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				{dialogDetails.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{dialogDetails.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus>
					OK
				</Button>
			</DialogActions>
		</Dialog>

	);

};

export default ErrorDialog;