import { sendEvents, events } from '../../appEvents';
import { store } from '../../reduxInit/store';
import sagaActions from '../../reduxInit/sagaActions';

enum SearchIndex {
    POD = 'POD',
    UTR = 'UTR',
    INVOICE = 'INVOICE',
}

const handleSearchByPOD = (searchText: string) => {
    if (searchText.length > 0) {
        sendEvents(events.ON_CLICK_SEARCH, {
            searchText,
            screen: 'POD',
        });
        store.dispatch({
            type: sagaActions.FETCH_POD_DETAILS,
            payload: {
                searchText,
                searchClicked: true,
            },
        });
    }
};

const handleSearchByUTR = (searchText: string) => {
    if (searchText.length > 0) {
        sendEvents(events.ON_CLICK_SEARCH, {
            searchText,
            screen: 'PAYMENTS',
        });
        store.dispatch({
            type: sagaActions.FETCH_PAYMENT_DETAILS,
            payload: {
                searchText,
                searchClicked: true,
            },
        });
    }
};

const handleSearchByInvoice = (searchText: string) => {
    if (searchText.length > 0) {
        sendEvents(events.ON_CLICK_SEARCH, {
            searchText,
            screen: 'INVOICE',
        });
        store.dispatch({
            type: sagaActions.FETCH_INVOICE_DETAILS,
            payload: {
                searchText,
                searchClicked: true,
            },
        });
    }
};

const searchFunctionsMap = {
    [SearchIndex.UTR]: handleSearchByUTR,
    [SearchIndex.POD]: handleSearchByPOD,
    [SearchIndex.INVOICE]: handleSearchByInvoice,
};

export default searchFunctionsMap;
