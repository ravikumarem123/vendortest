import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function createData(
	title: string,
	credit: string,
	debit: string,
	netamount: string,
) {
	return { title, credit, debit, netamount };
}

const rows = [
	createData('Invoice', '₹ 25,02,640.92', '-', '₹ 25,02,640.92'),
	createData('Debit Notes', '-', '₹ 30,000', '-₹ 30,000'),
	createData('CCOG Debit Notes', '-', '₹0', '-₹ 0'),
	createData('TDS', '-', '₹ 14,000', '-₹ 14,000'),
	createData('Total Amount', '', '', '₹ 24,58,640.92'),
];


const PaymentAdviceTable = () => {
	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className='p-table-head-text'>TITLE</TableCell>
						<TableCell className='p-table-head-text' align="center">CREDIT</TableCell>
						<TableCell className='p-table-head-text' align="center">DEBIT</TableCell>
						<TableCell className='p-table-head-text' align="right">NET AMOUNT</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.title}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row" className='p-table-cell-title'>
								{row.title}
							</TableCell>
							<TableCell align="center">{row.credit}</TableCell>
							<TableCell align="center">{row.debit}</TableCell>
							<TableCell align="right">{row.netamount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PaymentAdviceTable;