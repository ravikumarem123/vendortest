import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const PaymentUTRCard = () => {
	return (
		<div className="utr-card-container">
			<div className="utr-card-sno">
				1
			</div>
			<div className="utr-card-titles">
				<div className="utr-card-titles-container">
					<p>UTR No.</p>
					<p>Amount</p>
					<p>Last updated</p>
				</div>
			</div>
			<div className="utr-card-data">
				<div className="utr-card-data-container">
					<p>#C743987498347982</p>
					<p className='utr-card-amount'>₹1,28,600</p>
					<p>on 12/01/23</p>
				</div>
			</div>
			<div className="utr-card-arrow">
				<ArrowForwardIosOutlinedIcon className='utr-card-arrow-right' />
			</div>
		</div>
	);
};

export default PaymentUTRCard;