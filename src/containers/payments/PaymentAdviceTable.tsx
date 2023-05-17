import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { IUTRItem } from './paymentTypes';

interface IProps {
    items: Array<IUTRItem>;
    amount: number;
}

const PaymentAdviceTable: React.FC<IProps> = ({ items, amount }) => {
    const { t } = useTranslation('');

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="p-table-head-text">
                            {t('payment.title')}
                        </TableCell>
                        <TableCell className="p-table-head-text" align="center">
                            {t('payment.credit')}
                        </TableCell>
                        <TableCell className="p-table-head-text" align="center">
                            {t('payment.debit')}
                        </TableCell>
                        <TableCell className="p-table-head-text" align="right">
                            {t('payment.netamount')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell scope="row">{row.title}</TableCell>
                            <TableCell align="center">{row.credit}</TableCell>
                            <TableCell align="center">{row.debit}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="p-table-cell-row">
                        <TableCell
                            component="th"
                            scope="row"
                            className="p-table-cell-title"
                        >
                            {t('payment.totalamount')}
                        </TableCell>
                        <TableCell align="center" />
                        <TableCell align="center" />
                        <TableCell align="right" style={{ fontWeight: 500 }}>
                            {amount}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PaymentAdviceTable;
