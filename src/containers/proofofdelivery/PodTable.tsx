import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import dayjs from 'dayjs';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Invoice } from './podTypes';
import { NoInvoice, PodIcon3 } from '../../assets';
import { events, sendEvents } from '../../appEvents';
import CenterLoader from '../../common/CenterLoader';

interface PodTablePros {
    lastReadInvoice: string | null;
    invoiceList: Array<Invoice>;
    fetchData: () => void;
}

const PodTable = ({
    lastReadInvoice,
    invoiceList,
    fetchData,
}: PodTablePros) => {
    const { t } = useTranslation();

    const handlePodClick = (invoice: string) => {
        sendEvents(events.ON_CLICK_POD_DOWNLOAD, {
            screen: 'POD',
            invoice,
        });
    };

    return invoiceList && invoiceList?.length > 0 ? (
        <InfiniteScroll
            dataLength={invoiceList?.length} // This is important field to render the next data
            next={fetchData}
            hasMore={!!lastReadInvoice}
            loader={<CenterLoader />}
            endMessage={<p style={{ textAlign: 'center' }} />}
            // below props only if you need pull down functionality
            refreshFunction={() => {}}
            pullDownToRefresh={false}
            pullDownToRefreshThreshold={10}
            pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>
                    &#8595; Pull down to refresh
                </h3>
            }
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>
                    &#8593; Release to refresh
                </h3>
            }
        >
            <TableContainer
                component={Paper}
                sx={{ height: `calc(100vh - 270px)` }}
            >
                <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                {t('pod.table.sno')}
                            </TableCell>
                            <TableCell align="center">
                                {t('pod.table.invoiceno')}
                            </TableCell>
                            <TableCell align="center">
                                {t('pod.table.invoiceamount')}
                            </TableCell>
                            <TableCell align="center">
                                {t('pod.table.deliverydate')}
                            </TableCell>
                            <TableCell align="center">
                                {t('pod.table.goodsda')}
                            </TableCell>
                            <TableCell align="center">
                                {t('pod.table.pod')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceList.map((invoice, index) => (
                            <TableRow
                                key={`${invoice.number + index}`}
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
                                >
                                    {invoice.number}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    &#8377;
                                    {new Intl.NumberFormat('en-IN', {
                                        minimumFractionDigits: 0,
                                    }).format(invoice.amount)}
                                </TableCell>
                                <TableCell align="center">
                                    {dayjs(invoice.deliveryDate).format(
                                        'DD/MM/YYYY'
                                    )}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="address-cell"
                                >
                                    <p style={{ fontWeight: '500' }}>
                                        {invoice.buyerInfo?.name ?? 'Buyer'}
                                    </p>
                                    {invoice.buyerInfo?.addressDetails ??
                                        'dummy address'}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() =>
                                        handlePodClick(invoice.number)
                                    }
                                >
                                    <a
                                        href={invoice.podUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            alt="pod"
                                            src={PodIcon3}
                                            style={{ width: '45px' }}
                                        />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </InfiniteScroll>
    ) : (
        <div className="no-record-container">
            <img src={NoInvoice} alt="no-invoice" className="no-invoice-img" />
            <p className="no-invoice-text">{t('pod.noinvoicesfound')}</p>
        </div>
    );
};

export default React.memo(PodTable);
