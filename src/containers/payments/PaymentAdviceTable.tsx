import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IUTRItem } from './paymentTypes';

interface IProps {
	items: Array<IUTRItem>;
	amount: number;
}

const PaymentAdviceTable: React.FC<IProps> = ({ items, amount }) => {

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
					{items.map((row) => (
						<TableRow
							key={row.title}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell scope="row">
								{row.title}
							</TableCell>
							<TableCell align="center">{row.credit}</TableCell>
							<TableCell align="center">{row.debit}</TableCell>
							<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}
					<TableRow className='p-table-cell-row'>
						<TableCell component="th" scope="row" className='p-table-cell-title'>
							Total Amount
						</TableCell>
						<TableCell align='center'></TableCell>
						<TableCell align='center'></TableCell>
						<TableCell align='right' style={{ fontWeight: 500 }}>{amount}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PaymentAdviceTable;