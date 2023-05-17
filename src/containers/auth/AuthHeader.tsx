import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    headText: string;
    subHeadText: string;
    email?: string;
    editFn?: () => void;
}

const AuthHeader = ({ headText, subHeadText, email, editFn }: IProps) => {
    const { t } = useTranslation();

    return (
        <div className="login-header-container">
            <h2 className="login-header">{t(headText)}</h2>
            <p className="gray-text login-sub-header">{t(subHeadText)}</p>
            {email && (
                <p className="login-header-email">
                    <span>{email}</span>
                    <EditIcon
                        className="login-header-email-edit-icon"
                        onClick={editFn}
                    />
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
