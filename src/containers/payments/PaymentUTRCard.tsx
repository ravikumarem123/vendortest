import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IUTR } from './paymentTypes';

interface IPros {
	utrInfo: IUTR;
	handleUTRCardClick: (utr: string) => void;
	activeUTRCard: string | null;
	index: number;
}

const PaymentUTRCard: React.FC<IPros> = ({ utrInfo, handleUTRCardClick, activeUTRCard, index }) => {
	return (
		<div
			className={`utr-card-container ${utrInfo.utr === activeUTRCard ? 'active-utr-card' : ''}`}
			onClick={() => handleUTRCardClick(utrInfo.utr)}
		>
			<div className="utr-card-sno">
				{index + 1}
			</div>
			<div className="utr-card-titles">
				<div className="utr-card-titles-container">
					<p>UTR</p>
					<p>Amount</p>
					<p>Settlement Date</p>
				</div>
			</div>
			<div className="utr-card-data">
				<div className="utr-card-data-container">
					<p>{utrInfo.utr.length > 16 ? `${utrInfo.utr.slice(0,15)}...` : utrInfo.utr}</p>
					<p className='utr-card-amount'>{utrInfo.amount}</p>
					<p>on {utrInfo.settledDate}</p>
				</div>
			</div>
			<div className="utr-card-arrow">
				<ArrowForwardIosOutlinedIcon className='utr-card-arrow-right' />
			</div>
		</div>
	);
};

export default PaymentUTRCard;