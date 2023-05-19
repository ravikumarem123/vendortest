import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { ReactNode, useState } from 'react';
import Popover from '@mui/material/Popover';

interface IProps {
    headText: string;
    subHeadText: string;
    email?: string;
    editFn?: () => void;
    icon?: ReactNode;
}

const AuthHeader = ({ headText, subHeadText, email, editFn, icon }: IProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { t } = useTranslation();

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="login-header-container">
            <h2 className="login-header">
                {t(headText)}
                <span
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    {icon}
                </span>
            </h2>
            <p className="gray-text login-sub-header">{t(subHeadText)}</p>
            {email && (
                <p className="login-header-email">
                    <span>{email}</span>
                    {editFn && (
                        <EditIcon
                            className="login-header-email-edit-icon"
                            onClick={editFn}
                        />
                    )}
                </p>
            )}
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <p style={{ padding: '12px' }}>
                    {t('auth.pwdvalidationchars')}
                </p>
            </Popover>
        </div>
    );
};

export default AuthHeader;
