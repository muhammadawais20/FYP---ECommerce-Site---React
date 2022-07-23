import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './navbar.scss';
import LanguageIcon from '@mui/icons-material/Language';
import Loader from '../../WebsiteComponents/Loader/Loader';
import { toast } from 'react-toastify';
import SwitchModes from '../SwitchModes/SwitchModes'
import OrderNotifications from '../OrderNotifications/OrderNotifications';
import MessageNotification from '../MessageNotification/MessageNotification';

const Navbar = () => {

    const [admin, setAdmin] = useState([]);
    const [order, setOrder] = useState([]);
    const [complaint, setComplaint] = useState([]);

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
            toast.error("Error!");
        }
    }

    useEffect(() => {
        getComplaint();
    }, [])

    async function getComplaint() {
        try {
            //setLoadig
            const getComplaintFromFirebase = [];
            db.collection('contacts').get().then(snapshot => {
                snapshot.forEach(complaint => {
                    getComplaintFromFirebase.push({ ...complaint.data() })
                    //setLoading
                })
                setComplaint(getComplaintFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            toast.error("Error!");
        }
    }


    useEffect(() => {
        getAdmin();
    }, [])

    async function getAdmin() {
        try {

            const getAdminFromFirebase = [];
            db.collection('admins').get().then(snapshot => {
                snapshot.forEach(admin => {
                    getAdminFromFirebase.push({ ...admin.data() })
                    //setLoading
                })
                setAdmin(getAdminFromFirebase);
            })
        }
        catch (error) {
            //setLoading
            toast.error("Error!");
        }
    }

    let ordersQuantity = order.length;
    let complaintsQuantity = complaint.length;


    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="items">
                    <div className="item">
                        <LanguageIcon className='navIcon' />
                        English
                    </div>

                    <div className="item1">
                        <SwitchModes
                            className="navIcon"
                        />
                    </div>

                    <div className="item">
                        <OrderNotifications className='navIcon' />
                        {/* <NotificationsNoneOutlinedIcon className='navIcon' /> */}
                        <div className="counter">{ordersQuantity}</div>
                    </div>

                    <div className="item">
                        <MessageNotification className='navIcon' />
                        {/* <ChatIcon className='navIcon' /> */}
                        <div className="counter">{complaintsQuantity}</div>
                    </div>

                    <div className="item">
                        <img src={admin.map(e => e.adminImg)} alt='Avatar' className='avatar' />
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Navbar;