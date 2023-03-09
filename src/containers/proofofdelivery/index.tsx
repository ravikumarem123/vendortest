import { useEffect, useState } from "react";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SelectDate from "./SelectDate";
import { useAppDispatch, useAppSelector } from "../../reduxInit/hooks";
import PodTable from "./PodTable";
import { isSearchClicked } from "./podSelector";
import { sagaActions } from "../../reduxInit/sagaActions";
import './pod.css';




const ProofOfDelivery = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);
	const [page, setPage] = useState<number>(1);
	const searchClicked = useAppSelector(isSearchClicked);

	const dispatch = useAppDispatch();


	useEffect(() => {
		if (toDate && fromDate) {
			console.log(`toDate is changed fromDate is: ${fromDate} and toDate is: ${toDate}`);
		}
	}, [toDate]);

	useEffect(() => {
		dispatch({ type: sagaActions.FETCH_POD_DETAILS });
	}, []);

	useEffect(() => {
		if (searchClicked) {
			setToDate(null);
			setFromDate(null);
		}
	}, [searchClicked]);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="pod-container">
				<SelectDate
					fromDate={fromDate}
					toDate={toDate}
					setFromDate={setFromDate}
					setToDate={setToDate}
				/>
				<div className="select-date-hr" ></div>

				<div className="pod-data-container">

					<p className="date-range-text">Showing Data from 26/01/2023 to 10/02/2023</p>

					<PodTable />
				</div>

			</div>
		</LocalizationProvider>
	);
};

export default ProofOfDelivery;