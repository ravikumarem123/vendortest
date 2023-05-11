import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from "react-i18next";
import SelectDate from "./SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import PodTable from "./PodTable";
import { setSearchParams } from "../../common/commonSlice";
import { getDefaultTime, getPodList, getIsPodLoading, getLastReadPod, getPodError } from "./podSelector";
import { isSearchClicked, getSearchedText } from "../../common/commonSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import { events, sendEvents } from "../../appEvents";
import useSmoothScroll from "../../customHooks/useSmoothScroll";
import BackToTop from "../../common/backToTop";
import { formatDateRange } from "../../utils/dateUtils";
import './pod.css';


const ProofOfDelivery = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false);
	const lastReadInvoice = useAppSelector(getLastReadPod);
	const isInvoiceLoading = useAppSelector(getIsPodLoading);
	const invoiceList = useAppSelector(getPodList);
	const podError = useAppSelector(getPodError);
	const podLoading = useAppSelector(getIsPodLoading);
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

	useEffect(() => {
		if (!dateClicked && !searchClicked) {
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
		sendEvents(events.ON_CLICK_BACK_FROM_SEARCH, { screen: 'POD' })
		dispatch({ type: sagaActions.FETCH_POD_DETAILS, payload });
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
			sendEvents(events.ON_CLICK_DATE_APPLY, {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).endOf('day').valueOf(),
				screen: 'POD'
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

	const dateRangeText = () => {
		if (searchClicked) {
			return `${t('pod.showingdfi')} ${searchText}`;
		}
		const { start, end } = formatDateRange(getDefaultDates?.startTime, getDefaultDates?.endTime);
		if (dateClicked && !podError && !podLoading) { // date filter applied
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
						error={podError}
						loading={podLoading}
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

						<PodTable
							lastReadInvoice={lastReadInvoice}
							invoiceList={invoiceList}
							fetchData={fetchData}
						/>

				}
				{showBackToTop && <BackToTop />}

			</div>

		</div>
	);
};

export default ProofOfDelivery;