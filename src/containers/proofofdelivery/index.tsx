import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectDate from "./SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import PodTable from "./PodTable";
import { setSearchParams } from "./podSlice";
import { getInvoiceList, getIsInvoiceLoading, getLastReadInvoice, getPodError, getSearchedText, isSearchClicked } from "./podSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import './pod.css';




const ProofOfDelivery = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const searchClicked = useAppSelector(isSearchClicked);
	const searchText = useAppSelector(getSearchedText);
	const [dateClicked, setDateClicked] = useState<boolean>(false);
	const lastReadInvoice = useAppSelector(getLastReadInvoice);
	const isInvoiceLoading = useAppSelector(getIsInvoiceLoading);
	const invoiceList = useAppSelector(getInvoiceList);
	const podError = useAppSelector(getPodError);

	const dispatch = useAppDispatch();


	useEffect(() => {
		const payload = {
			pageSize: 20
		};
		dispatch({ type: sagaActions.FETCH_POD_DETAILS, payload });
	}, []);

	useEffect(() => {
		console.log("Inside useEffect of searchclicked change");

		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
			setDateClicked(false);
		}
	}, [searchClicked]);

	console.log(`searchClicked is: ${searchClicked}`);

	const handleBackClickOnSearch = () => {
		const payload = {
		};
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
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS,
				payload,
			});
		}
	};

	const fetchData = () => {
		let payload = {
			lastReadInvoice,
			startTime: fromDate ? dayjs(fromDate).startOf('day').valueOf() : null,
			endTime: toDate ? dayjs(toDate).endOf('day').valueOf() : null,
		};
		dispatch({
			type: sagaActions.FETCH_POD_DETAILS,
			payload,
		});
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
						/>

				}

				<div className="select-date-hr" ></div>

				<div className="pod-data-container">
					<p className="date-range-text">{
						searchClicked && `Showing Data for Invoice ${searchText}`
					}{(dateClicked && !podError) && `Showing Data from ${dayjs(fromDate).format('DD/MM/YYYY')} to ${dayjs(toDate).format('DD/MM/YYYY')}`}</p>

					{
						isInvoiceLoading ? <h1 style={{ textAlign: 'center' }}> <CircularProgress /></h1> :

							<PodTable
								lastReadInvoice={lastReadInvoice}
								invoiceList={invoiceList}
								fetchData={fetchData}
							/>

					}

				</div>

			</div>
		</LocalizationProvider>
	);
};

export default ProofOfDelivery;