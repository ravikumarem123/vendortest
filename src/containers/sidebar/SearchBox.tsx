import { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import { sagaActions } from '../../reduxInit/sagaActions';
import { isSearchClicked } from '../../common/commonSelector';
import { sendEvents, events } from '../../appEvents';
import { useTranslation } from 'react-i18next';

const SearchBox = () => {

	const [searchText, setSearchText] = useState<string>('');
	const dispatch = useAppDispatch();
	const searchClicked = useAppSelector(isSearchClicked);
	const { t } = useTranslation();
	const { pathname } = useLocation();

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

	const getSearchPlaceholder = (): string => {
		if (pathname === '/pod' || pathname === '/') {
			return 'pod.searchbyinvoiceno';
		} else if (pathname === '/payment') {
			return 'payment.searchbyutr';
		}
		return 'pod.searchbyinvoiceno';
	}

	return (
		<form
			className='search-box-div'
			onSubmit={handleFormSubmit}
		>
			<input
				type="text"
				className="search-inp"
				placeholder={t(getSearchPlaceholder())}
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