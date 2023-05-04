
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isSearchClicked, getSearchedText } from '../../common/commonSelector';
import SelectDate from '../proofofdelivery/SelectDate';
import { useAppSelector, useAppDispatch } from "../../reduxInit/hooks";
import PaymentUTRCard from './PaymentUTRCard';
import PaymentAdviceCard from './PaymentAdviceCard';
import { getPaymentError, getIsPaymentLoading, getDefaultTime, getPaymentList, getIsPaymentListHasmore } from './paymentSelector';
import { setSearchParams } from '../../common/commonSlice';
import './payments.css';
import { sagaActions } from '../../reduxInit/sagaActions';
import { events, sendEvents } from '../../appEvents';
import { CircularProgress } from '@mui/material';

const PAGE_SIZE = 10;

const Payments = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const [pageNumber, setPageNumber] = useState(0); // for pagination
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false); // date filter applied, will make a call and keep the date filter state maintained
	const [activeUTRCard, setActiveUTRCard] = useState<string | null>(null);
	const paymentUTRList = useAppSelector(getPaymentList);
	const paymentError = useAppSelector(getPaymentError);
	const paymentLoading = useAppSelector(getIsPaymentLoading);
	const getDefaultDates = useAppSelector(getDefaultTime);
	const hasMorePayments = useAppSelector(getIsPaymentListHasmore);
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
			setDateClicked(false);
			setActiveUTRCard(null);
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
			const payload = {
				pageNumber: 0
			};
			setPageNumber(1);
			dispatch({ type: sagaActions.FETCH_PAYMENT_DETAILS, payload });
		}
	}, [dateClicked]);

	const fetchData = () => {

		// TODO: make a generic payload creator function 
		let payload = {
			pageNumber,
			pageSize: PAGE_SIZE,
			startTime: (dateClicked && fromDate && !paymentError) ? dayjs(fromDate).startOf('day').valueOf() : null,
			endTime: (dateClicked && toDate && !paymentError) ? dayjs(toDate).endOf('day').valueOf() : null,
		};
		setPageNumber(pageNumber + 1);
		if (paymentError) {
			setFromDate(null);
			setToDate(null);
			setDateClicked(false);
		} else {
			dispatch({
				type: sagaActions.FETCH_PAYMENT_DETAILS,
				payload,
			});
		}
	};


	const handleBackClickOnSearch = () => {
		const payload = {
			pageNumber: 0
		};
		setPageNumber(1);
		sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, { screen: 'PAYMENTS' })
		dispatch({ type: sagaActions.FETCH_PAYMENT_DETAILS, payload });
		dispatch(setSearchParams({ clicked: false, text: '' }));
		setActiveUTRCard(null);
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
				pageNumber: 0,
			};
			setPageNumber(1);
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				screen: 'PAYMENTS'
			});
			setActiveUTRCard(null);
			dispatch({
				type: sagaActions.FETCH_PAYMENT_DETAILS,
				payload,
			});
		}
	};

	const handleUTRCardClick = (utr: string) => {
		setActiveUTRCard(utr);
		const payload = {
			utr,
		}
		sendEvents(events.ON_CLICK_UTR_CARD, {
			screen: 'PAYMENTS',
			utr: utr
		});
		dispatch({
			type: sagaActions.FETCH_UTR_DETAILS,
			payload,
		});
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
					{searchClicked && `${t('pod.showingdfutr')} ${searchText}`}
					{(dateClicked && !paymentError && !paymentLoading) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')} 
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
					{(!dateClicked && !searchClicked && getDefaultDates?.startTime) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')}  
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
				</p>

				{
					(paymentLoading && paymentUTRList.length < 1) ?

						<h1 style={{ textAlign: 'center' }}> <CircularProgress /></h1>

						:

						(
							paymentUTRList && paymentUTRList.length === 0 ?
								(
									<div>
										No Payment Record Found
									</div>
								) :

								<div className='flex-50'>
									<div className='utr-cards-div'>
										<InfiniteScroll
											dataLength={paymentUTRList.length} //This is important field to render the next data
											next={fetchData}
											hasMore={hasMorePayments}
											loader={
											<div style={{ display: 'flex', justifyContent: 'center' }}
											><CircularProgress /></div>
											}
										>
											{paymentUTRList.map((utr, index) => {
												return (
													<PaymentUTRCard
														key={utr.utr}
														utrInfo={utr}
														handleUTRCardClick={handleUTRCardClick}
														activeUTRCard={activeUTRCard}
														index={index}
													/>
												);
											})}
										</InfiniteScroll>
									</div>
									<div className='advice-cards-div'>
										<PaymentAdviceCard />
									</div>
								</div>
						)
				}

			</div>
		</div>
	);
};

export default React.memo(Payments);