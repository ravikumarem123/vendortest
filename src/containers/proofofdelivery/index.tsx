import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectDate from "./SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import PodTable from "./PodTable";
import { setSearchParams } from "./podSlice";
import { getInvoiceList, getIsInvoiceLoading, getLastReadInvoice, getSearchedText, isSearchClicked } from "./podSelector";
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

	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch({ type: sagaActions.FETCH_POD_DETAILS });
	}, []);

	useEffect(() => {
		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
			setDateClicked(false);
		}
	}, [searchClicked]);

	const handleBackClickOnSearch = () => {
		dispatch({ type: sagaActions.FETCH_POD_DETAILS });
		dispatch(setSearchParams({ clicked: false, text: '' }))
		setDateClicked(false);
	};

	const handleDateApplyClicked = () => {
		dispatch(setSearchParams({ clicked: false, text: '' }))
		if (toDate && fromDate) {
			setDateClicked(true);
			console.log(`toDate is changed fromDate is: ${fromDate} and toDate is: ${toDate}`);
			console.log(dayjs(fromDate).startOf('day').valueOf());
			const payload = {
				startTime: dayjs(fromDate).startOf('day').valueOf(),
				endTime: dayjs(toDate).startOf('day').valueOf()
			}
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS,
				payload,
			});
		}
	};

	const fetchData = () => {
		const payload = {
			lastReadInvoice
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
					}{dateClicked && `Showing Data from ${dayjs(fromDate).format('DD/MM/YYYY')} to ${dayjs(toDate).format('DD/MM/YYYY')}`}</p>

					{
						isInvoiceLoading ? <h1 style={{ textAlign: 'center' }}>Loading.....</h1> :

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