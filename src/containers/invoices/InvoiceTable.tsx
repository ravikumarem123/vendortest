import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Invoice } from './invoicetypes';
import { NoInvoice, InvoiceThumbnail } from '../../assets';
import { events, sendEvents } from '../../appEvents';
import CenterLoader from '../../common/CenterLoader';

interface InvoiceTablePros {
    lastReadInvoice: string | null;
    invoiceList: Array<Invoice>;
    fetchData: () => void;
}

interface TableComponentProps {
    invoiceList: Array<Invoice>;
}

const TableComponent = ({ invoiceList }: TableComponentProps) => {
    const { t } = useTranslation();

    const handleInvoiceClick = () => {
        sendEvents(events.ON_CLICK_INVOICE_DOWNLOAD, {
            screen: 'INVOICE',
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            {t('invoice.table.sno')}
                        </TableCell>
                        <TableCell align="center">
                            {t('invoice.table.idetails')}
                        </TableCell>

                        <TableCell align="center">
                            {t('invoice.table.idate')}
                        </TableCell>
                        <TableCell align="center" className="horizontal-padd">
                            {t('invoice.table.iamount')}
                        </TableCell>
                        <TableCell align="center">
                            {t('invoice.table.dnamount')}
                        </TableCell>
                        <TableCell align="center">
                            {t('invoice.table.tds')}
                        </TableCell>
                        <TableCell align="center">
                            {t('invoice.table.settlementd')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoiceList.map((invoice, index) => {
                        const { debitNoteAmount, utr, settledAmount, tds } =
                            (invoice?.paymentInfo ||
                                invoice?.paymentErrorInfo) ??
                            {};

                        return (
                            <TableRow
                                key={invoice.documentUrl}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ fontWeight: 'bold' }}
                                    onClick={handleInvoiceClick}
                                >
                                    <div className="invoice-details-column">
                                        <a
                                            href={invoice.documentUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                alt="pod"
                                                src={InvoiceThumbnail}
                                                style={{ width: '45px' }}
                                            />
                                        </a>
                                        <span className="gray-text">
                                            {invoice.invoiceNumber}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="gray-text">
                                    {invoice.invoiceDate}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {invoice.invoiceAmount}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className={`${
                                        debitNoteAmount === 'NA'
                                            ? ''
                                            : 'debit-note-text'
                                    }`}
                                >
                                    {debitNoteAmount}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className={`${
                                        tds === 'NA' ? '' : 'debit-note-text'
                                    }`}
                                >
                                    {tds}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        <p
                                            className={`${
                                                settledAmount === 'NA'
                                                    ? ''
                                                    : 'settlement-amount'
                                            }`}
                                        >
                                            {settledAmount}
                                        </p>
                                        <p
                                            className={`${
                                                utr === 'NA' || utr === '-'
                                                    ? 'hide-utr'
                                                    : 'settlement-utr'
                                            }`}
                                        >
                                            {utr}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const InvoiceTable: React.FC<InvoiceTablePros> = ({
    lastReadInvoice,
    invoiceList,
    fetchData,
}) => {
    const { t } = useTranslation();

    return invoiceList && invoiceList?.length > 0 ? (
        <InfiniteScroll
            dataLength={invoiceList?.length} // This is important field to render the next data
            next={fetchData}
            hasMore={!!lastReadInvoice}
            loader={<CenterLoader />}
            pullDownToRefresh={false}
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>
                    &#8593; Release to refresh
                </h3>
            }
        >
            <TableComponent invoiceList={invoiceList} />
        </InfiniteScroll>
    ) : (
        <div className="no-record-container">
            <img src={NoInvoice} alt="no-invoice" className="no-invoice-img" />
            <p className="no-invoice-text">{t('pod.noinvoicesfound')}</p>
        </div>
    );
};

export default React.memo(InvoiceTable);
