import React, { Dispatch, SetStateAction } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

interface IPros {
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	setFromDate: Dispatch<SetStateAction<Dayjs | null>>;
	setToDate: Dispatch<SetStateAction<Dayjs | null>>;
	handleDateApplyClicked: () => void;
	dateClicked: boolean;
	setDateClicked: Dispatch<SetStateAction<boolean>>;
	podError: string | null;
	podLoading: boolean;
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
		podError,
		podLoading,
	}) => {


	return (

		<div
			className='datepicker-container'
		>
			<BrowserView>
				Filter Data from:
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
					onChange={(newValue) => setFromDate(newValue)}
					disableFuture={true}
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
					onChange={(newValue) => setToDate(newValue)}
				/>
			</div>

			<div>
				{
					(dateClicked && !podError && !podLoading) ?

						<Button
							variant="outlined"
							className="date-apply-btn"
							onClick={() => setDateClicked(false)}
							startIcon={<CloseIcon />}
						>
							Remove
						</Button>

						:

						<Button
							variant="outlined"
							className={`date-apply-btn ${(toDate && fromDate) ? '' : 'disabled-btn'}`}
							onClick={handleDateApplyClicked}
						>
							Apply
						</Button>
				}
			</div>

		</div>

	);
};

export default React.memo(SelectDate);