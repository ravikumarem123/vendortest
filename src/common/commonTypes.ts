import { Dayjs } from 'dayjs';

interface ICommonState {
    dialogOpen: boolean;
    dialogTitle: string;
    dialogContent: string;
    dialogLogout: boolean;
    searchText: string;
    searchClicked: boolean;
    fromDate: Dayjs | null;
    toDate: Dayjs | null;
    dateClicked: boolean;
}

interface ICommonDummy {
    test: string;
}

export type { ICommonState, ICommonDummy };
