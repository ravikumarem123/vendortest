import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Invoice } from './podTypes';
import dayjs from 'dayjs';

interface PodTablePros {
	lastReadInvoice: string;
	invoiceList: Array<Invoice>;
	fetchData: () => void;
}

const PodTable: React.FC<PodTablePros> = ({ lastReadInvoice, invoiceList, fetchData }) => {

	return (
		<TableContainer component={Paper}>

			{
				invoiceList && invoiceList?.length > 0 ? (
					<InfiniteScroll
						dataLength={invoiceList?.length} //This is important field to render the next data
						next={fetchData}
						hasMore={lastReadInvoice ? true : false}
						loader={<h1>Loading more data....</h1>}
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
						<Table sx={{ minWidth: 650 }} aria-label="simple table"  >
							<TableHead>
								<TableRow>
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
										{/*<TableCell component="th" scope="row">
											{index}
										</TableCell>*/}
										<TableCell align="center">{invoice.number}</TableCell>
										<TableCell align="center">&#8377;{invoice.amount}</TableCell>
										<TableCell align="center">{dayjs(invoice.deliveryDate).format('DD/MM/YYYY')}</TableCell>
										<TableCell align="center" className='address-cell'>
											{invoice.shippedAddress.addressCity}
											{/*<p>{row.deliveryAddress.subtitle}</p>*/}
										</TableCell>
										<TableCell align="center" >
											<a href={invoice.podUrl} target="_blank">
												<PictureAsPdfOutlinedIcon />
											</a>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</InfiniteScroll>
				) : (
					<><h1 style={{ textAlign: 'center' }}>No Data....</h1></>
				)
			}


		</TableContainer>

	);
};

export default React.memo(PodTable);