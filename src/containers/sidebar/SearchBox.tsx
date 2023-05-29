import { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../reduxInit/hooks';
import { isSearchClicked } from '../../common/commonSelector';
import searchFunctionsMap from './searchFunctions';

enum SearchIndex {
    POD = 'POD',
    UTR = 'UTR',
    INVOICE = 'INVOICE',
}

const SearchBox = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchPlaceholder, setSearchPlaceholder] = useState(
        'pod.searchbyinvoiceno'
    );
    const [searchType, setSearchType] = useState<SearchIndex>(SearchIndex.POD);
    const searchClicked = useAppSelector(isSearchClicked);
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const handleFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        searchFunctionsMap[searchType](searchText);
    };

    useEffect(() => {
        if (!searchClicked) {
            setSearchText('');
        }
    }, [searchClicked]);

    useEffect(() => {
        if (pathname === '/pod' || pathname === '/') {
            setSearchType(SearchIndex.POD);
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
        <form className="search-box-div" onSubmit={handleFormSubmit}>
            <input
                type="text"
                className="search-inp"
                placeholder={t(searchPlaceholder)}
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn" type="submit">
                <SearchIcon className="search-icon" />
            </button>
        </form>
    );
};

export default SearchBox;
