import React, { useState, useEffect, Fragment } from 'react';
import './delivery.scss';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';

const Delivery = () => {

    const [delivery, setDelivery] = useState([]);

    useEffect(() => {
        getDeliveryOrders();
    }, [])

    async function getDeliveryOrders() {
        try {
            //setLoadig
            const getDeliveryOrdersFromFirebase = [];
            db.collection('ordersOnDelivery').get().then(snapshot => {
                snapshot.forEach(delivery => {
                    getDeliveryOrdersFromFirebase.push({ ...delivery.data() })
                    //setLoading
                })
                setDelivery(getDeliveryOrdersFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    const orderHandlerForShip = async (ordersOnDelivery) => {

        // let shipmentId = ordersOnDelivery.shipmentId;
        // let shipmentTime = ordersOnDelivery.shipmentTime;

        try {
            db.collection("ordersCompleted").doc(ordersOnDelivery.orders.OrderInfo.orderId).set({
                ordersOnDelivery,
                // shipmentId,
                // shipmentTime
            })
            toast.success("Order Shipped Successfully!")
        } catch (error) {
            toast.error("Order Shipped Failed!");
        };
    }

    const deleteHandler = async (ordersOnDelivery) => {
        console.log(ordersOnDelivery)
        try {
            db.collection("ordersOnDelivery").doc(ordersOnDelivery.orders.OrderInfo.orderId).delete({
            })
            toast.success("Delivery Order deleted Successfully!")
            getDeliveryOrders();

        } catch (error) {
            toast.error("Delivery Order  deletion Failed!");
        };
    }

    const shipAndDelete = (orders) => {
        orderHandlerForShip(orders);

        setTimeout(deleteHandler(orders), 50000);
    }



    return (
        <div className='delivery'>

            <div className="deliveryTableTitle">
                Delivery
            </div>

            <TableContainer component={Paper} className='orderTable'>
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
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Product Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {delivery.map((ordersOnDelivery, index) => (
                            <Fragment>
                                <TableRow key={index}>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.orderDate}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.orderId}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.shipmentTime}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.shipmentId}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.AddressInfo.firstName} {ordersOnDelivery.orders.OrderInfo.AddressInfo.lastName}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.AddressInfo.phonenumber}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.AddressInfo.city}</TableCell>
                                    <TableCell className='tableData'>{ordersOnDelivery.orders.OrderInfo.email}</TableCell>

                                    {
                                        ordersOnDelivery.orders.OrderInfo.cartitems.map((item, index) => (

                                            <Fragment key={index}>
                                                <div className='productDetails'>
                                                    <TableCell sx={{ minWidth: 100 }} className='tableData1'>{item.productId}</TableCell>
                                                    {/* <TableCell sx={{ minWidth: 25 }} className='tableData1'>{item.productName}</TableCell> */}
                                                    <TableCell sx={{ minWidth: 100 }} className='tableData1'>Rs. {item.originalPrice}</TableCell>
                                                    <TableCell sx={{ minWidth: 100 }} className='tableData1'>Rs. {item.productPrice}</TableCell>
                                                    <TableCell sx={{ minWidth: 100 }} className='tableData1'>Rs. {item.profit}</TableCell>
                                                    <TableCell sx={{ minWidth: 25 }} className='tableData1'>
                                                        <div className="orderImageCell">
                                                            <img src={item.productImg} alt="Product" className="orderImage" />
                                                        </div>
                                                    </TableCell>

                                                </div>

                                            </Fragment>
                                        ))
                                    }

                                    <TableCell key={index} className='pendingOrder'>
                                        <button className='pending' id="deliver" type='submit' onClick={() => shipAndDelete(ordersOnDelivery)}>Delivered?</button>
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

export default Delivery;