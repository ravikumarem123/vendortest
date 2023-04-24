
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isSearchClicked, getSearchedText } from '../../common/commonSelector';
import SelectDate from '../proofofdelivery/SelectDate';
import { useAppSelector, useAppDispatch } from "../../reduxInit/hooks";
import PaymentUTRCard from './PaymentUTRCard';
import PaymentAdviceCard from './PaymentAdviceCard';
import { getPaymentError, getIsPaymentLoading, getDefaultTime } from './paymentSelector';
import { setSearchParams } from '../../common/commonSlice';
import './payments.css';
import { sagaActions } from '../../reduxInit/sagaActions';



const Payments = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false);
	const paymentError = useAppSelector(getPaymentError);
	const paymentLoading = useAppSelector(getIsPaymentLoading);
	const getDefaultDates = useAppSelector(getDefaultTime);
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
			setDateClicked(false);
		}
	}, [searchClicked]);

	useEffect(() => {
		/* this will run 
		1. when user clicks remove button
		2. when search button is clicked
		*/
		if (!dateClicked) {
			setToDate(null);
			setFromDate(null);
			//const payload = {
			//	pageSize: 20,
			//	lastReadInvoice
			//};
			//dispatch({ type: sagaActions.FETCH_PAYMENT_DETAILS, payload });

		}
	}, [dateClicked]);

	const fetchData = () => {

		//let payload = {
		//	lastReadInvoice,
		//	startTime: (dateClicked && fromDate && !paymentError) ? dayjs(fromDate).startOf('day').valueOf() : null,
		//	endTime: (dateClicked && toDate && !paymentError) ? dayjs(toDate).endOf('day').valueOf() : null,
		//};
		if (paymentError) {
			setFromDate(null);
			setToDate(null);
			setDateClicked(false);
		} else {
			dispatch({
				type: sagaActions.FETCH_PAYMENT_DETAILS,
				//payload,
			});
		}
	};


	const handleBackClickOnSearch = () => {
		const payload = {
			pageSize: 20
		};
		//sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, {})
		//dispatch({ type: sagaActions.FETCH_PAYMENT_DETAILS, payload });
		dispatch(setSearchParams({ clicked: false, text: '' }))
		setDateClicked(false);
	};

	const handleDateApplyClicked = () => {
		dispatch(setSearchParams({ clicked: false, text: '' }))
		if (toDate && fromDate) {
			setDateClicked(true);
			const payload = {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				dateClicked: true,
			};
			//sendEvents(events.ON_CLICK_DATE_APPLY, {
			//	startTime: dayjs(fromDate).startOf('day').valueOf(),
			//	endTime: dayjs(toDate).endOf('day').valueOf(),
			//});
			//dispatch({
			//	type: sagaActions.FETCH_PAYMENT_DETAILS,
			//	payload,
			//});
		}
	};


	return (
		<div className="payment-container">

			{
				searchClicked ?

					<div className='datepicker-container'
						onClick={handleBackClickOnSearch}
					>
						<ArrowBackIcon
							className="back-icon"
						/> Showing Search Results
					</div>
					:

					<SelectDate
						fromDate={fromDate}
						toDate={toDate}
						setFromDate={setFromDate}
						setToDate={setToDate}
						handleDateApplyClicked={handleDateApplyClicked}
						dateClicked={dateClicked}
						setDateClicked={setDateClicked}
						error={paymentError}
						loading={paymentLoading}
					/>

			}

			<div className="select-date-hr" ></div>
			<div className='payment-data-container'>
				<p className="date-range-text">
					{searchClicked && `${t('pod.showingdfi')} ${searchText}`}
					{(dateClicked && !paymentError && !paymentLoading) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')} 
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
					{(!dateClicked && !searchClicked && getDefaultDates?.startTime) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')}  
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
				</p>
				<div className='flex-50'>
					<div className='utr-cards-div'>
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
						<PaymentUTRCard />
					</div>
					<div className='advice-cards-div'>
						<PaymentAdviceCard />
					</div>
				</div>

			</div>
		</div>
	);
};

export default Payments;