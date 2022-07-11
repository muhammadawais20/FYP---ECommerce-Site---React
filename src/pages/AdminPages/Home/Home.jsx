import { React, useEffect, useState } from "react";
import { db } from '../../../config/firebase';
import FeaturedChart from "../../../components/AdminComponents/FeaturedChart/FeaturedChart";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import NormalChart from "../../../components/AdminComponents/NormalChart/NormalChart";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import DetailsTable from "../../../components/AdminComponents/DetailsTable/DetailsTable";
import Widgets from "../../../components/AdminComponents/Widgets/Widgets";
import './home.scss';
import { Grid } from "@mui/material";
import { toast } from 'react-toastify';


const Home = () => {


    const [profit, setProfit] = useState([]);
    const [balance, setBalance] = useState([]);

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
            toast.error("Error!");
        }
    }

    useEffect(() => {
        getBalance();
    }, [])

    async function getBalance() {
        try {
            //setLoadig
            const getBalanceFromFirebase = [];
            db.collection('balanceAmount').get().then(snapshot => {
                snapshot.forEach(balance => {
                    getBalanceFromFirebase.push({ ...balance.data() })
                    //setLoading
                })
                setBalance(getBalanceFromFirebase);
            })
        }
        catch (error) {
            //setLoading
            toast.error("Error!");
        }
    }

    const profitFromOrders = profit.map((get) => {
        return get.ordersOnDelivery.orders.OrderInfo.cartitems.map((e) => {
            return (parseInt(e.profit) * parseInt(e.productQuantity));
        }).reduce(function (firstOrderProfit1, firstOrderProfit2) {
            return firstOrderProfit1 + firstOrderProfit2;
        }, 0)
    }).reduce(function (remainingOrderProfit1, remainingOrderProfit2) {
        return remainingOrderProfit1 + remainingOrderProfit2;
    }, 0)

    const transactionsAmount = balance.map((amount) => {
        return amount.transaction;
    }).reduce(function (transactionAmount1, transactionAmount2) {
        return (parseInt(transactionAmount1) + parseInt(transactionAmount2));
    }, 0)

const getBal = parseInt(profitFromOrders) - parseInt(transactionsAmount);

    //  aspect={2 / 1} title="Revenue of Last 6 Months" />
    return (
        <Grid>
            <div className="home">
                <Sidebar />

                <div className="homeContainer">
                    <Navbar />

                    <div className="widgets">
                        <Widgets type="customers" path="/customers" />
                        <Widgets type="orders" path="/orders" />
                        <Widgets type="earnings" path="/profit" profit={profitFromOrders} />
                        <Widgets type="balance" path="/balance" balance = {getBal}/>
                    </div>

                    <div className="charts">
                        <FeaturedChart />
                        <NormalChart profit={profitFromOrders} aspect={2 / 1} title="Revenue of Last 6 Months" />
                    </div>

                    <div className="listContainer">
                        <div className="listTitle">Previous Transactions</div>
                        <DetailsTable />
                    </div>
                </div>
            </div>
        </Grid>
    );
}

export default Home;