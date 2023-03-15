import { RootState } from '../reduxInit/store';

const getDialogDetails = (state: RootState) => {
    return {
        title: state.common.dialogTitle,
        content: state.common.dialogContent,
        open: state.common.dialogOpen,
        logout: state.common.dialogLogout,
    };
};

export { getDialogDetails };
