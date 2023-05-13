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
			fetchData({ sendLastInvoice: true, pageSize: 20 });

		}
	}, [dateClicked]);

	const handleBackClickOnSearch = () => {
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
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				screen: 'INVOICE'
			});
		}
	};

	const fetchData = ({ sendLastInvoice = true, isDateClicked = false, pageSize = 10 }: IFetchDataProps) => {

		const sendDates = isDateClicked && fromDate && !invoiceError;
		const fromDateStart = dayjs(fromDate).startOf('day'); // start time of day
		const toDateEnd = dayjs(toDate).endOf('day'); // end time of day

		let payload = {
			lastReadInvoice: sendLastInvoice ? lastReadInvoice : null,
			startTime: sendDates ? fromDateStart.valueOf() : null,
			endTime: sendDates ? toDateEnd.valueOf() : null,
			dateClicked: isDateClicked,
			pageSize
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

	const dateRangeText = () => {
		if (searchClicked) {
			return `${t('pod.showingdfi')} ${searchText}`;
		}
		const { start, end } = formatDateRange(getDefaultDates?.startTime, getDefaultDates?.endTime);
		const isDateFilterApplied = dateClicked && !invoiceError && !invoiceLoading;
		const isFirstRender =!dateClicked && !searchClicked && getDefaultDates?.startTime;

		if (isDateFilterApplied) { // date filter applied
			return `${t('pod.showingdf')} ${start} ${t('pod.to')} ${end}`
		}
		if (isFirstRender) { // initial render
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
				{showBackToTop && <BackToTop />}

			</div>

		</div>
	);
};

export default Invoices;