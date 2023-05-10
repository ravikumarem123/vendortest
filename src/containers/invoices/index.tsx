import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from "react-i18next";
import SelectDate from "../proofofdelivery/SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import { setSearchParams } from "../../common/commonSlice";
import { getDefaultTime, getInvoiceList, getIsInvoiceLoading, getLastReadInvoice, getInvoiceError } from "./invoiceSelector";
import { isSearchClicked, getSearchedText } from "../../common/commonSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import { events, sendEvents } from "../../appEvents";
import InvoiceTable from "./InvoiceTable";
import { IFetchDataProps } from "./invoicetypes";
import { formatDateRange } from "../../utils/dateUtils";
import useSmoothScroll from "../../customHooks/useSmoothScroll";
import BackToTop from "../../common/backToTop";
import './invoice.css';


const Invoices = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	//const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false);
	const lastReadInvoice = useAppSelector(getLastReadInvoice);
	const isInvoiceLoading = useAppSelector(getIsInvoiceLoading);
	const invoiceList = useAppSelector(getInvoiceList);
	const invoiceError = useAppSelector(getInvoiceError);
	const invoiceLoading = useAppSelector(getIsInvoiceLoading);
	const getDefaultDates = useAppSelector(getDefaultTime);
	const showBackToTop = useSmoothScroll({ defaultShowBackToTop: false });
	const { t } = useTranslation();

	const dispatch = useAppDispatch();


	//useEffect(() => {
	//	document.body.style.overflowY = 'auto';
	//	window.addEventListener('scroll', handleScroll);
	//	return () => window.removeEventListener('scroll', handleScroll);
	//}, []);

	useEffect(() => {
		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
			setDateClicked(false);
		}
	}, [searchClicked]);

	/* When user clicks remove button when search button is clicked */
	useEffect(() => {
		if (!dateClicked && !searchClicked) {
			setToDate(null);
			setFromDate(null);
			//const payload = {
			//	pageSize: 20,
			//	lastReadInvoice
			//};
			//dispatch({ type: sagaActions.FETCH_INVOICE_DETAILS, payload });
			fetchData({ sendLastInvoice: true });

		}
	}, [dateClicked]);

	const handleBackClickOnSearch = () => {
		//const payload = {
		//	pageSize: 20
		//};
		//dispatch({ type: sagaActions.FETCH_INVOICE_DETAILS, payload });
		fetchData({ sendLastInvoice: false });
		sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, { screen: 'INVOICE' });
		dispatch(setSearchParams({ clicked: false, text: '' }))
		setDateClicked(false);
	};

	const handleDateApplyClicked = () => {
		dispatch(setSearchParams({ clicked: false, text: '' }))
		if (toDate && fromDate) {
			setDateClicked(true);
			fetchData({ isDateClicked: true, sendLastInvoice: false });
			//const payload = {
			//	startTime: dayjs(fromDate).startOf('day').valueOf(),
			//	endTime: dayjs(toDate).endOf('day').valueOf(),
			//	dateClicked: true,
			//};
			//dispatch({
			//	type: sagaActions.FETCH_INVOICE_DETAILS,
			//	payload,
			//});
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				screen: 'INVOICE'
			});
		}
	};

	const fetchData = ({sendLastInvoice = true, isDateClicked = false}: IFetchDataProps) => {

		const sendDates = isDateClicked && fromDate && !invoiceError;

		let payload = {
			lastReadInvoice: sendLastInvoice? lastReadInvoice : null,
			startTime: sendDates ? dayjs(fromDate).startOf('day').valueOf() : null,
			endTime: sendDates ? dayjs(toDate).endOf('day').valueOf() : null,
			dateClicked: isDateClicked, 
		};
		if (invoiceError) {
			setFromDate(null);
			setToDate(null);
			setDateClicked(false);
		} else {
			dispatch({
				type: sagaActions.FETCH_INVOICE_DETAILS,
				payload,
			});
		}
	};

	//const handleScroll = () => {
	//	const scrollTop = window.pageYOffset;
	//	const screenTop = window.innerHeight;
	//	if (scrollTop > screenTop) {
	//		setShowBackToTop(true);
	//	} else {
	//		setShowBackToTop(false);
	//	}
	//};

	const dateRangeText = () => {
		if (searchClicked) {
		  return `${t('pod.showingdfi')} ${searchText}`;
		}
		const { start, end } = formatDateRange(getDefaultDates?.startTime, getDefaultDates?.endTime);
		if (dateClicked && !invoiceError && !invoiceLoading) { // date filter applied
			return `${t('pod.showingdf')} ${start} ${t('pod.to')} ${end}`
		}
		if (!dateClicked && !searchClicked && getDefaultDates?.startTime) { // initial render
			return `${t('pod.showingdf')} ${start} ${t('pod.to')} ${end}`
		}
		return null;
	  };

	return (
		<div className="pod-container">

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
						error={invoiceError}
						loading={invoiceLoading}
					/>

			}

			<div className="select-date-hr" ></div>

			<div className="pod-data-container">
				<p className="date-range-text">
					{/*{searchClicked && `${t('pod.showingdfi')} ${searchText}`}
					{(dateClicked && !podError && !podLoading) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')} 
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
					{(!dateClicked && !searchClicked && getDefaultDates?.startTime) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')}  
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}*/}
						{dateRangeText()}
				</p>

				{
					isInvoiceLoading ?
						<h1 style={{ textAlign: 'center' }}> <CircularProgress /></h1>
						:

						<InvoiceTable
							lastReadInvoice={lastReadInvoice}
							invoiceList={invoiceList}
							fetchData={() => fetchData({})}
						/>

				}
				{
					showBackToTop &&
					//<div className="btt-container">
					//	<p className="btt-text" onClick={handleBackToTop}>{t('pod.backtotop')}  <ExpandLessIcon className="btt-icon" /></p>
					//</div>
					<BackToTop />
					
				}


			</div>

		</div>
	);
};

export default Invoices;