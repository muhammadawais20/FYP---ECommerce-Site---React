import React, { useState, useEffect, Fragment } from 'react';
import './customers.scss';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Customers = () => {

    const [ordersCompleted, setOrdersCompleted] = useState([]);

    useEffect(() => {
        getOrdersCompleted();
    }, [])

    async function getOrdersCompleted() {
        try {
            //setLoadig
            const getOrdersCompletedFromFirebase = [];
            db.collection('ordersCompleted').get().then(snapshot => {
                snapshot.forEach(ordersCompleted => {
                    getOrdersCompletedFromFirebase.push({ ...ordersCompleted.data() })
                    //setLoading
                })
                setOrdersCompleted(getOrdersCompletedFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    return (

        <div className='customers'>

<div className="customersTableTitle">
                Customers
            </div>

            <TableContainer component={Paper} className='customersTableTitle'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Order Id</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Customer Name</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>City</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Order Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersCompleted.map((order, index) => (
                            <Fragment>
                                <TableRow key={index}>

                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.orderId}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.firstName} {order.ordersOnDelivery.orders.OrderInfo.AddressInfo.lastName}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.phonenumber}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.city}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.email}</TableCell>


                                    <TableCell key={index} className='totalAmount'>
                                        <div className='amount'>Total Amount: Rs. {order.ordersOnDelivery.orders.OrderInfo.AddressInfo.totalAmount}</div>
                                    </TableCell>

                                </TableRow>
                            </Fragment>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Customers;