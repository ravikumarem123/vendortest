import React from "react";
import dayjs from "dayjs";
import { Button, CircularProgress } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PaymentAdviceTable from "./PaymentAdviceTable";
import { EmptyUTRImg } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import { getIsDownloadIngestionLoading, getIsPaymentAdviceLoading, getSelectedUtrInfo } from "./paymentSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import { events, sendEvents } from "../../appEvents";

function isObjEmpty(obj: object) {
	return Object.keys(obj).length === 0;
}

const PaymentAdviceCard = () => {

	const utrDetails = useAppSelector(getSelectedUtrInfo);
	const isPaymentAdviceLoading = useAppSelector(getIsPaymentAdviceLoading);
	const isIngestionLoading = useAppSelector(getIsDownloadIngestionLoading);
	const dispatch = useAppDispatch();


	const showEmptyUtr = isObjEmpty(utrDetails);

	const handleIngestionClick = () => {
		const payload = {
			utr: utrDetails.utr,
		};
		sendEvents(events.ON_CLICK_PAYMENT_ADVICE_DOWNLOAD, {
			screen: 'PAYMENTS', 
			utr: utrDetails.utr
		});
		dispatch({ type: sagaActions.FETCH_UTR_INGESTION, payload });
	};

	return (
		<div className="advice-card-container">
			{
				showEmptyUtr ?

					isPaymentAdviceLoading ? <h1 style={{ textAlign: 'center' }}><CircularProgress /></h1>
						:
						<div className="empty-utr-container">
							<img className="empty-utr-img" src={EmptyUTRImg} alt="Empty UTR" />
							<p className="empty-utr-text">Please select a UTR card to see the
								Payment Advice details</p>
						</div>

					:
					<>
						<div className="advice-card-header">
							<p className="p-advice-head-text" style={{ fontWeight: '600' }}>Payment Advice Summary</p>
							<div className="p-advice-head-utr">
								<p className="p-advice-utr">UTR {utrDetails.utr}</p>
								<p className="p-advice-update-date">Settled on {dayjs(utrDetails.settledDate).format('DD/MM/YYYY')}
								</p>
							</div>
						</div>

						<hr />
						<PaymentAdviceTable
							items={utrDetails.items!}
							amount={utrDetails.totalAmount!}
						/>
						<div className="p-download-btn-container">
							<Button
								variant="outlined"
								className="p-download-btn"
								startIcon={!isIngestionLoading && <FileDownloadOutlinedIcon />}
								onClick={handleIngestionClick}
								disabled={isIngestionLoading}
							>
								{isIngestionLoading ? 'Downloading...' : 'Download Details'}
							</Button>
						</div>
					</>
			}
		</div>
	);
};

export default React.memo(PaymentAdviceCard);