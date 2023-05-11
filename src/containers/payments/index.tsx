
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import CenterLoader from '../../common/CenterLoader';
import { isSearchClicked, getSearchedText } from '../../common/commonSelector';
import SelectDate from '../proofofdelivery/SelectDate';
import { useAppSelector, useAppDispatch } from "../../reduxInit/hooks";
import PaymentUTRCard from './PaymentUTRCard';
import PaymentAdviceCard from './PaymentAdviceCard';
import { getPaymentError, getIsPaymentLoading, getDefaultTime, getPaymentList, getIsPaymentListHasMore } from './paymentSelector';
import { setSearchParams } from '../../common/commonSlice';
import { sagaActions } from '../../reduxInit/sagaActions';
import { events, sendEvents } from '../../appEvents';
import { NoInvoice, PaymentIdea } from '../../assets';
import { IPaymentPayload, IFetchDataProps } from './paymentTypes';
import { formatDateRange } from '../../utils/dateUtils';
import './payments.css';

const PAGE_SIZE = 10;

const getPaymentDetailsPayload = ({
	pageNumber,
	pageSize,
	dateClicked,
	fromDate,
	toDate,
	paymentError
}: IPaymentPayload) => {
	return {
		pageNumber,
		pageSize: pageSize || PAGE_SIZE,
		startTime: (dateClicked && fromDate && !paymentError) ? dayjs(fromDate).startOf('day').valueOf() : null,
		endTime: (dateClicked && toDate && !paymentError) ? dayjs(toDate).endOf('day').valueOf() : null,
	};
};

const Payments = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const [activeUTRCard, setActiveUTRCard] = useState<string | null>(null);
	const [pageNumber, setPageNumber] = useState(0);
	const [dateClicked, setDateClicked] = useState<boolean>(false); // date filter applied, will make a call and keep the date filter state maintained

	// redux selectors
	const paymentUTRList = useAppSelector(getPaymentList);
	const paymentError = useAppSelector(getPaymentError);
	const paymentLoading = useAppSelector(getIsPaymentLoading);
	const getDefaultDates = useAppSelector(getDefaultTime);
	const hasMorePayments = useAppSelector(getIsPaymentListHasMore);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
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
		if (!dateClicked && !searchClicked) {
			setToDate(null);
			setFromDate(null);
			fetchData({ page: 0, pageSize: 20 });
		}
	}, [dateClicked]);

	const fetchData = ({ page, isDateClicked = false }: IFetchDataProps) => {
		const payload = getPaymentDetailsPayload({ pageNumber: page, dateClicked: isDateClicked, fromDate, paymentError })
		setPageNumber(page + 1);
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
		fetchData({ page: 0, pageSize: 20 });
		sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, { screen: 'PAYMENTS' });
		dispatch(setSearchParams({ clicked: false, text: '' }));
		setActiveUTRCard(null);
		setDateClicked(false);
	};

	const handleDateApplyClicked = useCallback(() => {
		dispatch(setSearchParams({ clicked: false, text: '' }))
		if (toDate && fromDate) {
			setDateClicked(true);
			fetchData({ page: 0, pageSize: 20, isDateClicked: true });
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				screen: 'PAYMENTS'
			});
			setActiveUTRCard(null);
		}
	}, [toDate, fromDate]);

	const handleUTRCardClick = useCallback((utr: string) => {
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
	}, [activeUTRCard]);

	const dateRangeText = () => {
		if (searchClicked) {
			return `${t('pod.showingdfi')} ${searchText}`;
		}
		const { start, end } = formatDateRange(getDefaultDates?.startTime, getDefaultDates?.endTime);
		if (dateClicked && !paymentError && !paymentLoading) { // date filter applied
			return `${t('pod.showingdf')} ${start} ${t('pod.to')} ${end}`
		}
		if (!dateClicked && !searchClicked && getDefaultDates?.startTime) { // initial render
			return `${t('pod.showingdf')} ${start} ${t('pod.to')} ${end}`
		}
		return null;
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
						/> {t('pod.showingsr')}
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
						minFromDate={dayjs('2023-05-2')}
					/>

			}

			<div className="select-date-hr" ></div>
			<div className='payment-data-container'>
				<p className="date-range-text">
					{dateRangeText()}
				</p>

				{
					paymentLoading ?

						(<h1 style={{ textAlign: 'center' }}> <CircularProgress /></h1>)

						:

						(
							paymentUTRList && paymentUTRList.length === 0 ?
								(
									<div className='no-record-container' style={{ height: '69vh' }}>
										<img src={NoInvoice} alt='no-utr' className='no-invoice-img' />
										<p className='no-invoice-text'>{t('payment.noutrfound')}</p>
									</div>
								) :

								<div className='flex-50'>
									<div className='utr-cards-div' id="scrollableDiv">
										<InfiniteScroll
											dataLength={paymentUTRList.length} //This is important field to render the next data
											next={() => fetchData({ page: pageNumber })}
											hasMore={hasMorePayments}
											scrollableTarget="scrollableDiv"
											loader={<CenterLoader />}
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
			<div className='payment-idea-info-div'>
				<img src={PaymentIdea} className='idea-img' alt='idea-img' />
				<p className='idea-text'>{t('payment.ideainfo')}</p>
			</div>
		</div>
	);
};

export default React.memo(Payments);