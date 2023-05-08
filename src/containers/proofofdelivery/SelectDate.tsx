import React, { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { BrowserView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

interface IPros {
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	setFromDate: Dispatch<SetStateAction<Dayjs | null>>;
	setToDate: Dispatch<SetStateAction<Dayjs | null>>;
	handleDateApplyClicked: () => void;
	dateClicked: boolean;
	setDateClicked: Dispatch<SetStateAction<boolean>>;
	error: string | null;
	loading: boolean;
	minFromDate?: Dayjs | null;
}

const SelectDate: React.FC<IPros> = (
	{
		fromDate,
		toDate,
		setFromDate,
		setToDate,
		handleDateApplyClicked,
		dateClicked,
		setDateClicked,
		error,
		loading,
		minFromDate
	}) => {

	const [dateChanged, setDateChanged] = useState(false);
	const { t } = useTranslation();

	const handleDateChanged = (val: Dayjs | null, type: string) => {
		type === 'to' ? setToDate(val) : setFromDate(val);

		if (dateClicked && !error && !loading) {
			setDateChanged(true);
		} else {
			setDateChanged(false);
		}
	};

	const handleApplyClick = () => {
		setDateChanged(false);
		handleDateApplyClicked();
	};

	const dateClassName = ((!toDate || !fromDate)) ? 'disabled-btn' : '';


	return (

		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div
				className='datepicker-container'
			>
				<BrowserView>
					{t('pod.filterdatafrom')}:
				</BrowserView>
				<div>
					<DatePicker
						className='date-picker'
						format="DD-MM-YYYY"
						sx={{
							'.MuiInputBase-input': { md: { padding: '15.5px 7px', width: '60%', height: '1.435em' }, xs: { height: '1em', padding: '10px 7px' } },
							'.MuiInputBase-formControl': { md: { paddingRight: '0', fontSize: '16px' }, xs: { borderRadius: '4px', fontSize: '12px' } },
							'.MuiOutlinedInput-notchedOutline': { md: { width: '92%' } }
						}}
						value={fromDate}
						onChange={(newValue) => handleDateChanged(newValue, 'from')}
						disableFuture={true}
						minDate={minFromDate}
					/>
				</div>

				to
				<div>
					<DatePicker
						className='date-picker'
						format="DD-MM-YYYY"
						sx={{
							'.MuiInputBase-input': { md: { padding: '15.5px 7px', width: '60%', height: '1.435em' }, xs: { height: '1em', padding: '10px 7px' } },
							'.MuiInputBase-formControl': { md: { paddingRight: '0', fontSize: '16px' }, xs: { borderRadius: '4px', fontSize: '12px' } },
							'.MuiOutlinedInput-notchedOutline': { md: { width: '92%' } }
						}}
						value={toDate}
						onChange={(newValue) => handleDateChanged(newValue, 'to')}
					/>
				</div>

				<div>
					{
						((dateClicked && !error && !loading && !dateChanged)) ?

							<Button
								variant="outlined"
								className="date-apply-btn"
								onClick={() => setDateClicked(false)}
								startIcon={<CloseIcon />}
							>
								{t('pod.remove')}
							</Button>

							:

							<Button
								variant="outlined"
								className={`date-apply-btn ${dateClassName}`}
								onClick={handleApplyClick}
							>
								{t('pod.apply')}
							</Button>
					}
				</div>

			</div>
		</LocalizationProvider>

	);
};

export default React.memo(SelectDate);