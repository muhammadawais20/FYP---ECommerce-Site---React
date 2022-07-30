import React, { useState, useEffect, Fragment } from 'react';
import './orderDetails.scss';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import Loader from '../../WebsiteComponents/Loader/Loader';


const OrderDetails = () => {

    const [order, setOrder] = useState([]);

    const shipmentDateTime = () => {
        let myDate = new Date();
        let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
        let date = myDate.getDate();
        let month = monthsList[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = daysList[myDate.getDay()];
        let today = `${date} ${month} ${year}, ${day}`;
        let amOrPm;
        let twelveHours = function () {
            if (myDate.getHours() > 12) {
                amOrPm = 'PM';
                let twentyFourHourTime = myDate.getHours();
                let conversion = twentyFourHourTime - 12;
                return `${conversion}`

            } else {
                amOrPm = 'AM';
                return `${myDate.getHours()}`
            }
        };

        let hours = twelveHours();
        let minutes = myDate.getMinutes();

        let currentTime = `${hours}:${minutes} ${amOrPm}`;

        return (today + ' ' + currentTime);

    }

    // const shipmentDate = shipmentDateTime();

    const getShipmentId = () => {
        let date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const shipmentId = `${day}${month}${year}`;
        return (shipmentId.concat('@123'));
    }
    
    // const shipmentId = getShipmentId();

    useEffect(() => {
        getOrder();
    }, [])

    async function getOrder() {
        try {
            <Loader />
            const getOrderFromFirebase = [];
            db.collection('orders').get().then(snapshot => {
                snapshot.forEach(order => {
                    getOrderFromFirebase.push({ ...order.data() })
                    {<Loader />}
                })
                setOrder(getOrderFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }


    const orderHandlerForDelivery = async (orders) => {

        try {
            db.collection("ordersOnDelivery").doc(orders.OrderInfo.orderId).set({
                orders,
                shipmentId: getShipmentId(),
                shipmentTime: shipmentDateTime()
            })
            toast.success("Product Shipped Successfully!")
        } catch (error) {
            toast.error("Product Shipped Failed!");
        };
    }

    const deleteHandler = async (orders) => {
        try {
            db.collection("orders").doc(orders.OrderInfo.orderId).delete({
            })
            getOrder();

        } catch (error) {
            toast.error("Failed!");
        };
    }

    const deliverAndDelete = (orders) => {
        orderHandlerForDelivery(orders);

        setTimeout(deleteHandler(orders), 50000);
    }

    return (
        <div className='orderTable'>
            <div className="orderTableTitle">
                Orders
            </div>
            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Order Date</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Order Id</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>User Name</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>City</TableCell>
                            <TableCell sx={{ minWidth: 25 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Product Details (In Rs.)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((orders, index) => (
                            <Fragment>
                                <TableRow key={index}>
                                    <TableCell className='tableData'>{orders.OrderInfo.orderDate}</TableCell>
                                    <TableCell className='tableData'>{orders.OrderInfo.orderId}</TableCell>
                                    <TableCell className='tableData'>{orders.OrderInfo.AddressInfo.firstName} {orders.OrderInfo.AddressInfo.lastName}</TableCell>
                                    <TableCell className='tableData'>{orders.OrderInfo.AddressInfo.phonenumber}</TableCell>
                                    <TableCell className='tableData'>{orders.OrderInfo.AddressInfo.city}</TableCell>
                                    <TableCell className='tableData'>{orders.OrderInfo.email}</TableCell>

                                    {
                                        orders.OrderInfo.cartitems.map((item, index) => (

                                            <Fragment key={index}>
                                                <div className='productDetails'>
                                                    <TableCell sx={{ minWidth: 50 }} className='tableData1'>{item.productName}</TableCell>
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
                                    <TableCell key={index} className='pendingOrder'>
                                        <button className='pending' id="deliver" type='submit' onClick={() => deliverAndDelete(orders)}>Ship Order?</button>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default OrderDetails;