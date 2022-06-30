import React from 'react';
import './detailsTable.scss';
import date from '../../../resources/images/date-1.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DetailsTable = () => {

    const rows = [
        {
            id: 123456,
            product: "Dates",
            img: date,
            customer: "Awais",
            date: "10 May 2022",
            amount: 500,
            method: "Cash on Delivery",
            status: "Approved"
        },
        {
            id: 1234567,
            product: "Dates",
            img: date,
            customer: "Awais",
            date: "10 May 2022",
            amount: 500,
            method: "Cash on Delivery",
            status: "Pending"
        }
    ]

    return (
        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableData'>Tracking Id</TableCell>
                        <TableCell className='tableData'>Product</TableCell>
                        <TableCell className='tableData'>Customer</TableCell>
                        <TableCell className='tableData'>Date</TableCell>
                        <TableCell className='tableData'>Amount</TableCell>
                        <TableCell className='tableData'>Payment Method</TableCell>
                        <TableCell className='tableData'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className='tableData'>{row.id}</TableCell>
                            <TableCell className='tableData'>
                                <div className="imageCellData">
                                    <img src={row.img} alt="Product Img" className="productImage" />
                                    {row.product}
                                </div>
                            </TableCell>
                            <TableCell className='tableData'>{row.customer}</TableCell>
                            <TableCell className='tableData'>{row.date}</TableCell>
                            <TableCell className='tableData'>{row.amount}</TableCell>
                            <TableCell className='tableData'>{row.method}</TableCell>
                            <TableCell className='tableData'>
                                <div className={`status ${row.status}`}>{row.status}</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DetailsTable;