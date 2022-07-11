import React, { useState, useEffect } from "react";
import './widgets.scss';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { db } from '../../../config/firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Widgets = ({ type, path, profit, balance }) => {

    const [order, setOrder] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getOrder();
    }, [])

    async function getOrder() {
        try {
            //setLoadig
            const getOrderFromFirebase = [];
            db.collection('orders').get().then(snapshot => {
                snapshot.forEach(order => {
                    getOrderFromFirebase.push({ ...order.data() })
                    //setLoading
                })
                setOrder(getOrderFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    useEffect(() => {
        getCustomers();
    }, [])

    async function getCustomers() {
        try {
            //setLoadig
            const getCustomersFromFirebase = [];
            db.collection('ordersCompleted').get().then(snapshot => {
                snapshot.forEach(customers => {
                    getCustomersFromFirebase.push({ ...customers.data() })
                    //setLoading
                })
                setCustomers(getCustomersFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    let ordersQuantity = order.length;
    let ordersCompleted = customers.length;

    const customersEmail = customers.map((cus) => {
        return (cus.ordersOnDelivery.orders.OrderInfo.email);
    })

    let uniqueCustomersByEmail = [...new Set(customersEmail)]
    let customersQuantity = uniqueCustomersByEmail.length

    let categoryDetails;

    switch (type) {
        case "customers":
            categoryDetails = {
                categoryTitle: "CUSTOMERS",
                isAmount:  `Total: ${customersQuantity}`,
                linkToAll: "See all customers",
                icon: (
                    <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{
                            color: "red",
                            backgroundColor: "rgb(245, 185, 185, 0.5)"
                        }}
                    />
                )
            };
            break;

        case "orders":
            categoryDetails = {
                categoryTitle: "ORDERS",
                pendingIcon: <ShoppingCartOutlinedIcon
                    style={{
                        color: "goldenrod",
                        fontSize: "large"
                    }}
                />,
                isAmount: `${ordersQuantity}`,
                completedIcon: <DoneAllIcon
                    style={{
                        color: "green",
                        fontSize: "large"
                    }}
                   
                />,
                completedOrders: `${ordersCompleted}`,
                linkToAll: "View all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgb(236, 208, 135, 0.5)"
                        }}
                    />
                )
            };
            break;

        case "earnings":
            categoryDetails = {
                categoryTitle: "EARNINGS",
                isAmount: `Rs. ${profit}`,
                linkToAll: "View all earnings",
                icon: (
                    <CreditScoreOutlinedIcon
                        className="icon"
                        style={{
                            color: "green",
                            backgroundColor: "rgb(107, 243, 107, 0.5)"
                        }}
                    />
                )
            };
            break;


        case "balance":
            categoryDetails = {
                categoryTitle: "BALANCE",
                isAmount: `Rs. ${balance}`,
                linkToAll: "See available details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            color: "purple",
                            backgroundColor: "rgb(202, 50, 202, 0.5)"
                        }}
                    />
                )
            };
            break;

        case "default":
            break;
    }

    return (
        <div className="widget">
            <div className="leftSideOfWidget">
                <span className="categoryTitle">{categoryDetails.categoryTitle}</span>
                {/* <span className="categoryCount">{categoryDetails.isAmount && "Rs."} {amount}</span> */}
                <span className="categoryCount">{categoryDetails.pendingIcon}  {categoryDetails.isAmount}</span>
                <span className="categoryCount">{categoryDetails.completedIcon}  {categoryDetails.completedOrders}</span>

                <Link to={path} style={{ textDecoration: "none" }}>
                    <span className="seeAllUsers">{categoryDetails.linkToAll}</span>
                </Link>

            </div>
            <div className="rightSideOfWidget">
                <span className="percentageOfUsers positive"><ArrowDropUpOutlinedIcon className="arrowIcon" />{5}%</span>
                <span className="icon">{categoryDetails.icon}</span>
            </div>
        </div>
    )
}

export default Widgets;