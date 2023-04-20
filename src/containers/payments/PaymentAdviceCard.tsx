import { Button } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PaymentAdviceTable from "./PaymentAdviceTable";

const PaymentAdviceCard = () => {
	return (
		<div className="advice-card-container">
			<div className="advice-card-header">
				<p className="p-advice-head-text" style={{ fontWeight: '600' }}>Payment Advice</p>
				<div className="p-advice-head-utr">
					<p className="p-advice-utr">UTR No. #C743987498347982</p>
					<p className="p-advice-update-date">Last updated on 12/01/23</p>
				</div>
			</div>

			<hr />
			<PaymentAdviceTable />
			<div className="p-download-btn-container">
				<Button
					variant="outlined"
					className="p-download-btn"
					startIcon={<FileDownloadOutlinedIcon />}
				>
					Download
				</Button>
			</div>
		</div>
	);
};

export default PaymentAdviceCard;