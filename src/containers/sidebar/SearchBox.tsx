import { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import { sagaActions } from '../../reduxInit/sagaActions';
import { isSearchClicked } from '../proofofdelivery/podSelector';
import { sendEvents, events } from '../../appEvents';
import { useTranslation } from 'react-i18next';

const SearchBox = () => {

	const [searchText, setSearchText] = useState<string>('');
	const dispatch = useAppDispatch();
	const searchClicked = useAppSelector(isSearchClicked);
	const { t } = useTranslation();

	const handleSearchByInvoice = () => {
		if (searchText.length > 0) {
			sendEvents(events.ON_CLICK_SEARCH, {
				searchText: searchText
			});
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS, payload: {
					searchText,
					searchClicked: true
				}
			});
		} else {
			//toast.error("Invalid Invoice number", {
			//	position: "top-right",
			//	autoClose: 3000,
			//	hideProgressBar: false,
			//	closeOnClick: true,
			//	pauseOnHover: true,
			//	draggable: true,
			//	progress: undefined,
			//	theme: "light",
			//});
		}
	};

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		handleSearchByInvoice();
	};

	useEffect(() => {
		if (!searchClicked) {
			setSearchText('');
		}
	}, [searchClicked]);

	return (
		<form
			className='search-box-div'
			onSubmit={handleFormSubmit}
		>
			<input
				type="text"
				className="search-inp"
				placeholder={t('pod.searchbyinvoiceno')}
				name="search"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<button
				className="search-btn"
				type="submit"
			>
				<SearchIcon className='search-icon' />
			</button>

		</form>
	);
};

export default SearchBox;