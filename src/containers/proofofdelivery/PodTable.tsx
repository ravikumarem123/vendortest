import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface DeliveryAddr {
	title: string;
	subtitle: string;
}

function createData(
	name: string,
	invoice: string,
	deliveryDate: string,
	deliveryAddress: DeliveryAddr,
	invoiceAmount: string,
) {
	return { name, invoice, deliveryDate, deliveryAddress, invoiceAmount };
}

const rows = [
	createData('Frozen yoghurt', '#1234567890', '30/01/23', {
		title: 'Bangalore FC: Sutlej/ Gomti',
		subtitle: 'jhgdjhwdlhwndlhw kjhdjkahd jhgdjhwdlhwndlhw jgbgwbsdjkugw'
	}, '1,00,200'),
	createData('Ice cream sandwich', '#9876543210', '23/01/23', {
		title: 'Jumbotail Tech. Pvt. Ltd.',
		subtitle: 'jhgdjhwdlhwndlhw kjhdjkahd jhgdjhwdlhwndlhw jgbgwbsdjkugw'
	}, '2,50,250'),
	createData('Eclair', '#7654321098', '23/01/23', {
		title: 'Jumbotail Tech. Pvt. Ltd.',
		subtitle: 'Bangalore FC: Sutlej/ Gomti jhgdjhwdlhwndlhw jgbgwbsdjkugw'
	}, '1,50,250'),
];

const PodTable = () => {


	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table"  >
				<TableHead>
					<TableRow>
						<TableCell>S.NO.</TableCell>
						<TableCell align="center">INVOICE NO.</TableCell>
						<TableCell align="center">INVOICE AMOUNT</TableCell>
						<TableCell align="center">DELIVERY DATE</TableCell>
						<TableCell align="center">PROOF OF DELIVERY</TableCell>
						<TableCell align="center">GOODS DELIVERED AT</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{index}
							</TableCell>
							<TableCell align="center">{row.invoice}</TableCell>
							<TableCell align="center">&#8377;{row.invoiceAmount}</TableCell>
							<TableCell align="center">{row.deliveryDate}</TableCell>
							<TableCell align="center" className='address-cell'>
								<h4>{row.deliveryAddress.title}</h4>
								{/*<p>{row.deliveryAddress.subtitle}</p>*/}
							</TableCell>
							<TableCell align="center">{row.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>

	);
};

export default PodTable;