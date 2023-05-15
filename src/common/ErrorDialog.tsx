import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../reduxInit/hooks';
import { getDialogDetails } from './commonSelector';
import { setDialogClose } from './commonSlice';

const ErrorDialog = () => {
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
            open={dialogDetails.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {dialogDetails.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogDetails.content}</DialogContentText>
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
