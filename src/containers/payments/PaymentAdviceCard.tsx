import React, { useCallback } from "react";
import { Button, CircularProgress } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PaymentAdviceTable from "./PaymentAdviceTable";
import { EmptyUTRImg } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import { getIsDownloadIngestionLoading, getIsPaymentAdviceLoading, getSelectedUtrInfo } from "./paymentSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import { events, sendEvents } from "../../appEvents";
import { useTranslation } from "react-i18next";

function isObjEmpty(obj: object) {
	return Object.keys(obj).length === 0;
}

const PaymentAdviceCard = () => {

	const utrDetails = useAppSelector(getSelectedUtrInfo);
	const isPaymentAdviceLoading = useAppSelector(getIsPaymentAdviceLoading);
	const isIngestionLoading = useAppSelector(getIsDownloadIngestionLoading);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();


	const showEmptyUtr = isObjEmpty(utrDetails);

	const handleIngestionClick = useCallback(() => {
		const payload = {
			utr: utrDetails.utr,
		};
		sendEvents(events.ON_CLICK_PAYMENT_ADVICE_DOWNLOAD, {
			screen: 'PAYMENTS',
			utr: utrDetails.utr
		});
		dispatch({ type: sagaActions.FETCH_UTR_INGESTION, payload });
	}, [JSON.stringify(utrDetails)]);

	const { utr, settledDate, totalAmount, items } = utrDetails;

	return (
		<div className="advice-card-container">
			{
				showEmptyUtr ?

					isPaymentAdviceLoading ? <h1 style={{ textAlign: 'center' }}><CircularProgress /></h1>
						:
						<div className="empty-utr-container">
							<img className="empty-utr-img" src={EmptyUTRImg} alt="Empty UTR" />
							<p className="empty-utr-text">{t('payment.emptyUtrtext')}</p>
						</div>

					:
					<>
						<div className="advice-card-header">
							<p className="p-advice-head-text" style={{ fontWeight: '600' }}>{t('payment.padvicesummary')}</p>
							<div className="p-advice-head-utr">
								<p className="p-advice-utr">UTR {utr}</p>
								<p className="p-advice-update-date">{t('payment.settledon')} {settledDate}
								</p>
							</div>
						</div>

						<hr />
						<PaymentAdviceTable
							items={items!}
							amount={totalAmount!}
						/>
						<div className="p-download-btn-container">
							<Button
								variant="outlined"
								className="p-download-btn"
								startIcon={!isIngestionLoading && <FileDownloadOutlinedIcon />}
								onClick={handleIngestionClick}
								disabled={isIngestionLoading}
							>
								{`${isIngestionLoading ? t('payment.downloading...') : t('payment.downloaddetails')}`}
							</Button>
						</div>
					</>
			}
		</div>
	);
};

export default React.memo(PaymentAdviceCard);