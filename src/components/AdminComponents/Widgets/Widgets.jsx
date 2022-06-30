import React, { useState, useEffect } from "react";
import './widgets.scss';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { db } from '../../../config/firebase';
import { Link } from 'react-router-dom';

const Widgets = ({ type }) => {

    const [order, setOrder] = useState([]);

//to do 
    let ordersQuantity = order.length;
    // let ordersDate = order.map (orderDetails => orderDetails.OrderInfo.orderDate);
    
    // console.log("date", ordersDate);

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

    let categoryDetails;
    let amount = 100;
    let diff = 50;

    switch (type) {
        case "users":
            categoryDetails = {
                categoryTitle: "USERS",
                isAmount: false,
                linkToAll: "See all users",
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
                isAmount: ordersQuantity,
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
                isAmount: true,
                linkToAll: "View net earnings",
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
                isAmount: true,
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
                <span className="categoryCount">{categoryDetails.isAmount}</span>
                <Link to="/orders" style={{ textDecoration: "none" }}>
                    <span className="seeAllUsers">{categoryDetails.linkToAll}</span>
                </Link>

            </div>
            <div className="rightSideOfWidget">
                <span className="percentageOfUsers positive"><ArrowDropUpOutlinedIcon className="arrowIcon" />{diff}%</span>
                <span className="icon">{categoryDetails.icon}</span>
            </div>
        </div>
    )
}

export default Widgets;