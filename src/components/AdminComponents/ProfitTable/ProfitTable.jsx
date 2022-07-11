import React, { useState, useEffect, Fragment } from 'react';
import './profitTable.scss';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Profit = () => {

    const [profit, setProfit] = useState([]);

    useEffect(() => {
        getProfit();
    }, [])

    async function getProfit() {
        try {
            //setLoadig
            const getProfitFromFirebase = [];
            db.collection('ordersCompleted').get().then(snapshot => {
                snapshot.forEach(profit => {
                    getProfitFromFirebase.push({ ...profit.data() })
                    //setLoading
                })
                setProfit(getProfitFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    return (

        <div className="ordersTable">

            <div className="ordersCompletedTableTitle">
                Profit Earned Against Orders
            </div>

            <TableContainer component={Paper} className='orderTableTitle'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Order Date</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Order Id</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Shipment Time</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Shipment Id</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>User Name</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>City</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Profit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profit.map((order, index) => (
                            <Fragment>
                                <TableRow key={index}>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.orderDate}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.orderId}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.shipmentTime}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.shipmentId}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.firstName} {order.ordersOnDelivery.orders.OrderInfo.AddressInfo.lastName}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.phonenumber}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.AddressInfo.city}</TableCell>
                                    <TableCell className='tableData'>{order.ordersOnDelivery.orders.OrderInfo.email}</TableCell>

                                    <TableCell key={index} className='totalProfit'>
                                    <Fragment key={index}>
                                        <div className='profit'>Total Profit: Rs. {
                                            order.ordersOnDelivery.orders.OrderInfo.cartitems
                                            .map((e) => {
                                                return (parseInt(e.profit) * parseInt(e.productQuantity));
                                            })
                                            .reduce(function (firstOrderProfit1, firstOrderProfit2) {
                                                return firstOrderProfit1 + firstOrderProfit2;
                                            }, 0)
                                        }</div>
                                          </Fragment>
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

export default Profit;