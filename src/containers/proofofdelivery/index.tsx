import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SelectDate from "./SelectDate";
import PodTable from "./PodTable";
import './pod.css';



const ProofOfDelivery = () => {

	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);


	useEffect(() => {
		if (toDate && fromDate) {
			console.log(`toDate is changed fromDate is: ${fromDate} and toDate is: ${toDate}`);
		}
	}, [toDate]);

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