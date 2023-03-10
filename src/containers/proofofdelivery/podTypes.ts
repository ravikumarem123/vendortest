import { Dayjs } from 'dayjs';

export interface VendorAddress {
    addressCity: null | string;
    addressLandmark: null | string;
    addressLine: null | string;
    addressLocality: null | string;
    addressPincode: null | string;
    buyerName: null | string;
}

export interface Invoice {
    number: string;
    podUrl: string;
    invoiceDate: Dayjs;
    deliveryDate: Dayjs;
    amount: number;
    shippedAddress: VendorAddress;
}

export interface PodInitialState {
    invoiceList: Array<Invoice>;
    loading: boolean;
    prevPageLastInvId: string;
    hasMore: boolean;
    error: null | string;
    searchText: string;
    searchClicked: boolean;
}
