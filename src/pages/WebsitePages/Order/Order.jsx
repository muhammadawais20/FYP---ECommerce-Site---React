import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './Order.css';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [ordersCompleted, setOrdersCompleted] = useState([]);
    const [loading, setLoading] = useState(false);
    const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid

    useEffect(() => {
        getFirebaseData();
    }, [])
    // callIng data from dataBase
    async function getFirebaseData() {
        try {
            setLoading(true)
            const getOrdersFromFirebase = []
            db.collection('orders').get().then(snapshot => {
                snapshot.forEach(product => {
                    getOrdersFromFirebase.push({ ...product.data() })
                    setLoading(false)
                })
                setOrders(getOrdersFromFirebase)
            })
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getFirebaseDeliveryData();
    }, [])
    // callIng data from dataBase
    async function getFirebaseDeliveryData() {
        try {
            setLoading(true)
            const getOrdersDeliveryFromFirebase = []
            db.collection('ordersOnDelivery').get().then(snapshot => {
                snapshot.forEach(delivery => {
                    getOrdersDeliveryFromFirebase.push({ ...delivery.data() })
                    setLoading(false)
                })
                setDelivery(getOrdersDeliveryFromFirebase)
            })
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

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

    let ordersPending = orders.filter(obj => obj.OrderInfo.userid == userid);
    let deliveryPending = delivery.filter(obj => obj.orders.OrderInfo.userid == userid);
    let ordersComplete = ordersCompleted.filter(obj => obj.ordersOnDelivery.orders.OrderInfo.userid == userid);

    return (
        <Layout>
            <div className='container-md order-wrapper'>
                {loading && (<Loader />)}

                <div className='text-center'>
                    <h1>Welcome to Order Page!</h1>
                </div>

                <div className='orderList'>
                    <h3>Pending Orders</h3>
                    {ordersPending.length > 0 ?
                        orders.filter(obj => obj.OrderInfo.userid == userid).map(order => {
                            return (
                                <table className='table mt-3'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.OrderInfo.cartitems.map((item, index) => {
                                                return <tr key={index}>
                                                    <td><img src={item.productImg} height="80" width="80" /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{`${item.productQuantity} Kg`}</td>
                                                    <td>Rs. {`${item.productPrice}`}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            )
                        }) : <p>You don't have any pending order!</p>}
                </div>

                <div className='orderList'>
                    <h3>Orders On Delivery</h3>
                    {deliveryPending.length > 0 ?
                        delivery.filter(obj => obj.orders.OrderInfo.userid == userid).map(del => {
                            return (
                                <table className='table mt-3'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            del.orders.OrderInfo.cartitems.map((item, index) => {
                                                return <tr key={index}>
                                                    <td><img src={item.productImg} height="80" width="80" /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{`${item.productQuantity} Kg`}</td>
                                                    <td>Rs. {item.productPrice}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            )
                        }) : <p>You don't have any order on delivery!</p>}
                </div>

                <div className='orderList'>
                    <h3>Orders Completed</h3>
                    {ordersComplete.length > 0 ?
                        ordersCompleted.filter(obj => obj.ordersOnDelivery.orders.OrderInfo.userid == userid).map(del => {
                            return (
                                <table className='table mt-3'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            del.ordersOnDelivery.orders.OrderInfo.cartitems.map((item, index) => {
                                                return <tr key={index}>
                                                    <td><img src={item.productImg} height="80" width="80" /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{`${item.productQuantity} Kg`}</td>
                                                    <td>Rs. {item.productPrice}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            )
                        }) : <p>You don't have orders completed history!</p>}
                </div>
            </div>
        </Layout>
    )
}

export default OrderPage
