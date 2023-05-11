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

const InvoiceTable: React.FC<InvoiceTablePros> = ({ lastReadInvoice, invoiceList, fetchData }) => {

	const { t } = useTranslation();

	const handleInvoiceClick = () => {
		sendEvents(events.ON_CLICK_INVOICE_DOWNLOAD, {
			screen: 'INVOICE'
		});
	};

	return (

		<>
			{
				invoiceList && invoiceList?.length > 0 ? (
					<InfiniteScroll
						dataLength={invoiceList?.length} //This is important field to render the next data
						next={fetchData}
						hasMore={lastReadInvoice ? true : false}
						loader={<CenterLoader />}
						endMessage={<p style={{ textAlign: 'center' }}></p>}
						// below props only if you need pull down functionality
						refreshFunction={() => { }}
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
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table"  >
								<TableHead>
									<TableRow>
										<TableCell align="center">{t('invoice.table.sno')}</TableCell>
										<TableCell align="center">{t('invoice.table.idetails')}</TableCell>
										<TableCell align="center" className='horizontal-padd'>{t('invoice.table.iamount')}</TableCell>
										<TableCell align="center">{t('invoice.table.idate')}</TableCell>
										<TableCell align="center">{t('invoice.table.dnamount')}</TableCell>
										{/*<TableCell align="center">{t('invoice.table.expecteda')}</TableCell>
										<TableCell align="center">{t('invoice.table.paymentst')}</TableCell>*/}
										<TableCell align="center">{t('invoice.table.settlementd')}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{invoiceList.map((invoice, index) => (
										<TableRow
											key={invoice.documentUrl}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
											<TableCell
												align="center"
												style={{ fontWeight: 'bold' }}
												onClick={handleInvoiceClick}
											>
												<div className='invoice-details-column'>
													<a href={invoice.documentUrl} target="_blank" >
														<img alt='pod' src={InvoiceThumbnail} style={{ width: '45px' }} />
													</a>
													<span className='gray-text'>{invoice.invoiceNumber}</span>
												</div>

											</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>
												{invoice.invoiceAmount}
											</TableCell>
											<TableCell align="center" className='gray-text'>
												{invoice.invoiceDate}
											</TableCell>
											<TableCell align="center" className='debit-note-text'>
												{invoice.debitNoteAmount}
											</TableCell>
											{/*<TableCell align="center" style={{ fontWeight: 'bold' }}>
												{invoice.expectedAmount}
											</TableCell>
											<TableCell align="center" >
												{invoice?.paymentInfo?.paymentStatus}
											</TableCell>*/}
											<TableCell align="center" >
												{invoice?.paymentInfo?.settlementDetails}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</InfiniteScroll>
				) : (
					<div className='no-record-container'>
						<img src={NoInvoice} alt='no-invoice' className='no-invoice-img' />
						<p className='no-invoice-text'>{t('pod.noinvoicesfound')}</p>
					</div>
				)
			}
		</>




	);
};

export default React.memo(InvoiceTable);