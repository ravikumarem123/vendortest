import { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import { sagaActions } from '../../reduxInit/sagaActions';
import { isSearchClicked } from '../../common/commonSelector';
import { sendEvents, events } from '../../appEvents';
import { useTranslation } from 'react-i18next';

enum SearchIndex {
	INVOICE = 'INVOICE',
	UTR = 'UTR',
}

const SearchBox = () => {

	const [searchText, setSearchText] = useState<string>('');
	const [searchPlaceholder, setSearchPlaceholder] = useState('pod.searchbyinvoiceno');
	const [searchType, setSearchType] = useState<SearchIndex>(SearchIndex.INVOICE);
	const dispatch = useAppDispatch();
	const searchClicked = useAppSelector(isSearchClicked);
	const { t } = useTranslation();
	const { pathname } = useLocation();

	const handleSearchByInvoice = () => {
		if (searchText.length > 0) {
			sendEvents(events.ON_CLICK_SEARCH, {
				searchText: searchText,
				screen: 'POD',
			});
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS, payload: {
					searchText,
					searchClicked: true
				}
			});
		}
	};

	const handleSearchByUTR = () => {
		if (searchText.length > 0) {
			sendEvents(events.ON_CLICK_SEARCH, {
				searchText: searchText,
				screen: 'PAYMENTS',
			});
			dispatch({
				type: sagaActions.FETCH_PAYMENT_DETAILS, payload: {
					searchText,
					searchClicked: true
				}
			});
		}
	};

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (searchType === SearchIndex.UTR) {
			handleSearchByUTR();
		} else {
			handleSearchByInvoice();
		}
	};

	useEffect(() => {
		if (!searchClicked) {
			setSearchText('');
		}
	}, [searchClicked]);

	useEffect(() => {
		if (pathname === '/pod' || pathname === '/') {
			setSearchType(SearchIndex.INVOICE);
			setSearchPlaceholder('pod.searchbyinvoiceno');
		} else if (pathname === '/payment') {
			setSearchType(SearchIndex.UTR);
			setSearchPlaceholder('payment.searchbyutr');
		} else if (pathname === '/invoices') {
			setSearchType(SearchIndex.INVOICE);
			setSearchPlaceholder('pod.searchbyinvoiceno');
		}
	}, [pathname]);

	return (
		<form
			className='search-box-div'
			onSubmit={handleFormSubmit}
		>
			<input
				type="text"
				className="search-inp"
				placeholder={t(searchPlaceholder)}
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