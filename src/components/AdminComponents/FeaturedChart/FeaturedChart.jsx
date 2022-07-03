import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../../config/firebase';
import './featuredChart.scss';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

const FeaturedChart = () => {

    const [totalAmt, setTotalAmount] = useState([]);

    const getTotalRevenue = () => {
        let result = totalAmt.map((amount) => {
            return amount.ordersOnDelivery.orders.OrderInfo.AddressInfo;
        })

        let revenue = result.map((value) => {
            return parseInt(value.totalAmount);
        })


        return revenue.reduce((previousValue, currentValue) => {
            return (parseInt(previousValue) + parseInt(currentValue));
        }, 0)
    }


    const currentTarget = () => {
        let target = parseInt(getTotalRevenue() * 30)/100;
        return (parseInt(target) + parseInt(getTotalRevenue()));
    }

    useEffect(() => {
        gettotalAmount();
    }, [])

    async function gettotalAmount() {
        try {
            //setLoadig
            const getTotalAmountFromFirebase = [];
            db.collection('ordersCompleted').get().then(snapshot => {
                snapshot.forEach(totalAmt => {
                    getTotalAmountFromFirebase.push({ ...totalAmt.data() })
                    //setLoading
                })
                setTotalAmount(getTotalAmountFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    const currentTargetPercent = parseInt(getTotalRevenue())/parseInt(currentTarget());
   const currentTargetPercentage =  parseInt(currentTargetPercent * 100);

    return (

        <div className='featuredChart'>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertRoundedIcon className='icon' />
            </div>

            <div className="bottom">
                <div className="featuredbar">
                    <CircularProgressbar value={50} text={`${currentTargetPercentage}%`} strokeWidth={5} />
                </div>
                <p className="title">Total Sale</p>

                <p className='amount'>Rs. {getTotalRevenue()}</p>

                <p className="description">Last transactions may not be included!</p>

                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Current Target</div>
                        <div className="itemResult">
                            <ArrowDropUpOutlinedIcon />
                            <div className="itemResultAmount">Rs. {currentTarget()}</div>
                        </div>
                    </div>
                    {/* <div className="item">
                        <div className="itemTitle">Last Week Achieved</div>
                        <div className="itemResult positive">
                            <ArrowDropUpOutlinedIcon />
                            <div className="itemResultAmount">Rs. 2000</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month Achieved</div>
                        <div className="itemResult negative">
                            <ArrowDropDownOutlinedIcon />
                            <div className="itemResultAmount">Rs. 2000</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default FeaturedChart;

