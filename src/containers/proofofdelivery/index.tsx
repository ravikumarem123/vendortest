import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";
import SelectDate from "./SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import PodTable from "./PodTable";
import { setSearchParams } from "./podSlice";
import { getDefaultTime, getInvoiceList, getIsInvoiceLoading, getLastReadInvoice, getPodError, getSearchedText, isSearchClicked } from "./podSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import './pod.css';
import { events, sendEvents } from "../../appEvents";




const ProofOfDelivery = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const [isBttVisible, setIsBttVisible] = useState<boolean>(false);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false);
	const lastReadInvoice = useAppSelector(getLastReadInvoice);
	const isInvoiceLoading = useAppSelector(getIsInvoiceLoading);
	const invoiceList = useAppSelector(getInvoiceList);
	const podError = useAppSelector(getPodError);
	const podLoading = useAppSelector(getIsInvoiceLoading);
	const getDefaultDates = useAppSelector(getDefaultTime);
	const { t } = useTranslation();

	const dispatch = useAppDispatch();


	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
			const payload = {
				pageSize: 20,
				lastReadInvoice
			};
			dispatch({ type: sagaActions.FETCH_POD_DETAILS, payload });

		}
	}, [dateClicked]);

	const handleBackClickOnSearch = () => {
		const payload = {
			pageSize: 20
		};
		sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, {})
		dispatch({ type: sagaActions.FETCH_POD_DETAILS, payload });
		dispatch(setSearchParams({ clicked: false, text: '' }))
		setDateClicked(false);
	};

	const handleDateApplyClicked = () => {
		dispatch(setSearchParams({ clicked: false, text: '' }))
		if (toDate && fromDate) {
			//if (dayjs(toDate).isBefore(dayjs(fromDate))) {
			//	const dialogPayload = {
			//		title: 'Something went wrong',
			//		content: 'please check your internet connection and try again.',
			//	};
			//	dispatch(setDialogOpen(dialogPayload));
			//	return;
			//}
			setDateClicked(true);
			const payload = {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				dateClicked: true,
			};
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
			});
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS,
				payload,
			});
		}
	};

	const fetchData = () => {

		let payload = {
			lastReadInvoice,
			startTime: (dateClicked && fromDate && !podError) ? dayjs(fromDate).startOf('day').valueOf() : null,
			endTime: (dateClicked && toDate && !podError) ? dayjs(toDate).endOf('day').valueOf() : null,
		};
		if (podError) {
			setFromDate(null);
			setToDate(null);
			setDateClicked(false);
		} else {
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS,
				payload,
			});
		}
	};

	const handleScroll = () => {
		const scrollTop = window.pageYOffset;
		const screenTop = window.innerHeight;
		if (scrollTop > screenTop) {
			setIsBttVisible(true);
		} else {
			setIsBttVisible(false);
		}
	};

	const handleBackToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
							podError={podError}
							podLoading={podLoading}
						/>

				}

				<div className="select-date-hr" ></div>

				<div className="pod-data-container">
					<p className="date-range-text">
						{searchClicked && `${t('pod.showingdfi')} ${searchText}`}
						{(dateClicked && !podError && !podLoading) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')} 
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
						{(!dateClicked && !searchClicked && getDefaultDates?.startTime) && `${t('pod.showingdf')} 
						${dayjs(getDefaultDates?.startTime).format('DD/MM/YYYY')} 
						${t('pod.to')}  
						${dayjs(getDefaultDates?.endTime).format('DD/MM/YYYY')}`}
					</p>

					{
						(isInvoiceLoading && invoiceList.length < 1) ?
							<h1 style={{ textAlign: 'center' }}> <CircularProgress /></h1>
							:

							<PodTable
								lastReadInvoice={lastReadInvoice}
								invoiceList={invoiceList}
								fetchData={fetchData}
							/>

					}
					{
						isBttVisible &&
						<div className="btt-container">
							<p className="btt-text" onClick={handleBackToTop}>{t('pod.backtotop')}  <ExpandLessIcon className="btt-icon" /></p>
						</div>
					}


				</div>

			</div>
		</LocalizationProvider>
	);
};

export default ProofOfDelivery;