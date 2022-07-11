import { React, useState, useEffect, Fragment } from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './balanceList.scss';
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const BalanceList = () => {

    const [cash, setCash] = useState('');
    const [profit, setProfit] = useState([]);
    const [balance, setBalance] = useState([]);
    
    const getDate = () => {
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

    const [transactionDate, setTransactionDate] = useState(getDate);

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
                setProfit(getProfitFromFirebase);
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
            return (parseInt(firstOrderProfit1) + parseInt(firstOrderProfit2));
        }, 0)
    }).reduce(function (remainingOrderProfit1, remainingOrderProfit2) {
        return (parseInt(remainingOrderProfit1) + parseInt(remainingOrderProfit2));
    }, 0)


    const transactionsAmount = balance.map((amount) => {
        return amount.transaction;
    }).reduce(function (transactionAmount1, transactionAmount2) {
        return (parseInt(transactionAmount1) + parseInt(transactionAmount2));
    }, 0)

    const availableBalance = profitFromOrders - transactionsAmount;

    const getAmountId = () => {
        let date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const id = `${day}${month}${year}`;
        return (id.concat(Math.floor(Math.random() * 100)));
    }

    const [amountId, setAmountId] = useState(getAmountId);

    const cashHandler = (e) => {
        let balance = profitFromOrders - cash - transactionsAmount;
        e.preventDefault();

        if (cash < balance && cash > 0) {
            try {
                db.collection('balanceAmount').doc(amountId).set({
                    transactionDate: transactionDate,
                    profit: profitFromOrders,
                    balance: balance,
                    transaction: cash
                }).then(() => {
                    setCash("");
                    toast.success('Transaction Successful!');
                    getBalance();
                    getProfit();
                })
            }
            catch (error) {
                toast.error('Transaction Failed!');
            };  
        }

        else if (cash < 0) {
            toast.error('Please Enter Correct Amount!');
        }

        else {
            toast.error('You Do Not Have RequiredAmount!');
        }
        
    }

    return (

        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Balance List</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form onSubmit={cashHandler}>
                            <div className="formInput">
                                <label>Available Amount</label>
                                <input type="number" value={availableBalance} disabled />
                            </div>

                            <div className="formInput">
                                <label>Amount Required</label>
                                <input type="number" placeholder="Enter amount" value={cash} onChange={e => setCash(e.target.value)} required />
                            </div>

                            <div>
                                <button type="submit" className="sendButton">Get Amount</button>
                            </div>
                        </form>
                    </div>
                    <div className="right">


                        <TableContainer component={Paper} className='orderTableTitle'>
                            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 100 }} className='tableData'>Transaction Date</TableCell>
                                        <TableCell sx={{ minWidth: 100, order: 1 }} className='tableData'>Transaction Amount</TableCell>
                                        <TableCell sx={{ minWidth: 100 }} className='tableData'>Balance</TableCell>
                                        <TableCell sx={{ minWidth: 100 }} className='tableData'>Current Profit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {balance.map((getDetails, index) => (
                                        <Fragment key={index}>
                                            <TableRow key={index}>
                                                <TableCell className='tableData'>{getDetails.transactionDate}</TableCell>
                                                <TableCell className='tableData'>Rs. {getDetails.transaction}</TableCell>
                                                <TableCell className='tableData'>Rs. {getDetails.balance}</TableCell>
                                                <TableCell className='tableData'>Rs. {getDetails.profit}</TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceList;