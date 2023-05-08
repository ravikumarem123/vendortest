import React, { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../reduxInit/hooks';
import Button from '@mui/material/Button';
import { BrowserView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { setToDate, setFromDate } from '../commonSlice';
import { getToDate, getFromDate } from '../commonSelector';


const DateSelector = () => {

	const { t } = useTranslation();
	const fromDate = useAppSelector(getFromDate);
	const toDate = useAppSelector(getToDate);


	const handleApplyClick = () => {

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
					<Button
						variant="outlined"
						className={`date-apply-btn ${dateClassName}`}
						onClick={handleApplyClick}
					>
						{t('pod.apply')}
					</Button>
					{/*{
					((dateClicked && !podError && !podLoading && !dateChanged)) ?

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
				}*/}
				</div>

			</div>
		</LocalizationProvider>

	);

};

export default React.memo(DateSelector);