import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { Invoice } from './podTypes';
import dayjs from 'dayjs';
import { PodIcon2, NoInvoice } from '../../assets';

interface PodTablePros {
	lastReadInvoice: string | null;
	invoiceList: Array<Invoice>;
	fetchData: () => void;
}

const PodTable: React.FC<PodTablePros> = ({ lastReadInvoice, invoiceList, fetchData }) => {

	return (

		<>
			{
				invoiceList && invoiceList?.length > 0 ? (
					<InfiniteScroll
						dataLength={invoiceList?.length} //This is important field to render the next data
						next={fetchData}
						hasMore={lastReadInvoice ? true : false}
						loader={<div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
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
										<TableCell align="center">S NO.</TableCell>
										<TableCell align="center">INVOICE NO.</TableCell>
										<TableCell align="center">INVOICE AMOUNT</TableCell>
										<TableCell align="center">DELIVERY DATE</TableCell>
										<TableCell align="center">GOODS DELIVERED AT</TableCell>
										<TableCell align="center">PROOF OF DELIVERY</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{invoiceList.map((invoice, index) => (
										<TableRow
											key={index}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>{invoice.number}</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>
												&#8377;{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(invoice.amount)}
											</TableCell>
											<TableCell align="center">
												{dayjs(invoice.deliveryDate).format('DD/MM/YYYY')}
											</TableCell>
											<TableCell align="center" className='address-cell'>
												<p style={{ fontWeight: '500' }}>{invoice.buyerInfo?.name ?? 'Buyer'}</p>
												{invoice.buyerInfo?.addressDetails ?? 'dummy address'}
											</TableCell>
											<TableCell align="center" >
												<a href={invoice.podUrl} target="_blank">
													{/*<SimCardDownloadOutlinedIcon style={{ fontSize: '40px', color: '#d32f2f' }} />*/}
													<img alt='pod' src={PodIcon2} style={{ width: '45px' }} />
												</a>
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
						<p className='no-invoice-text'>No Invoices Found</p>
					</div>
				)
			}
		</>




	);
};

export default React.memo(PodTable);