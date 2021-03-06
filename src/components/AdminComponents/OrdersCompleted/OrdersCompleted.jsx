import React, { useState, useEffect, Fragment } from 'react';
import './ordersCompleted.scss';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrdersCompleted = () => {

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

        <div className="ordersTable">

            <div className="ordersCompletedTableTitle">
                Orders Completed
            </div>

            <TableContainer component={Paper} className='orderTableTitle table'>
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
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Product Details (In Rs.)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersCompleted.map((order, index) => (
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

                                    {
                                        order.ordersOnDelivery.orders.OrderInfo.cartitems.map((item, index) => (
                                            <Fragment key={index}>
                                                <div className='productDetails'>
                                                    
                                                    <TableCell sx={{ minWidth: 50 }} className='tableData1'>RP: {item.originalPrice}</TableCell>
                                                    <TableCell sx={{ minWidth: 50 }} className='tableData1'>SP: {item.productPrice}</TableCell>
                                                    <TableCell sx={{ minWidth: 25 }} className='tableData1'>Qty: {item.productQuantity}</TableCell>
                                                    <TableCell sx={{ minWidth: 50 }} className='tableData1'>Profit: {`${item.profit}` * `${item.productQuantity}`}</TableCell>
                                                    <TableCell sx={{ minWidth: 25 }} className='tableData1'>
                                                        <div className="orderImageCell">
                                                            <img src={item.productImg} alt="Product" className="orderImage" />
                                                        </div>
                                                    </TableCell>
                                                </div>
                                            </Fragment>
                                        ))
                                    }
                                  
                                    <TableCell key={index} className='totalAmount'>
                                        <div className='amount'>Total Order Amount: Rs. {order.ordersOnDelivery.orders.OrderInfo.AddressInfo.totalAmount}</div>
                                        <div className='profit'>Total Profit: Rs. {
                                            order.ordersOnDelivery.orders.OrderInfo.cartitems
                                            .map((e) => {
                                                return (parseInt(e.profit) * parseInt(e.productQuantity));
                                            })
                                            .reduce(function (orderProfit1, orderProfit2) {
                                                return orderProfit1 + orderProfit2;
                                            }, 0)
                                        }
                                        </div> 
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

export default OrdersCompleted;