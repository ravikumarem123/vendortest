
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';

const BackToTop = () => {

	const { t } = useTranslation();

	const handleBackToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="btt-container">
			<p 
				className="btt-text" 
				onClick={handleBackToTop}
			>
				{t('pod.backtotop')}  
			<ExpandLessIcon className="btt-icon" /></p>
		</div>	
	);
};

export default BackToTop;