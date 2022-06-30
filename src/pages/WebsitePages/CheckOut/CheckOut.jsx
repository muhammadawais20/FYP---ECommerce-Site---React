import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { db } from '../../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './CheckOut.css';

const CheckOut = () => {

    const { cartitems } = useSelector(state => state.cartReducer);


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);


    const getOrderDate = () => {
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

    const [orderDate, setOrderData] = useState(getOrderDate);

    const getOrderId = () => {
        let date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const orderId = `${day}${month}${year}`;
        return (orderId.concat(Math.floor(Math.random() * 100)));
    }

    const [orderId, setOrderId] = useState(getOrderId);
    

    const placeorder = (e) => {
        e.preventDefault();
        const AddressInfo = {
            firstName,
            lastName,
            phonenumber,
            email,
            address,
            city,
            state,
            zipcode,
            totalAmount,
        }
        console.log(AddressInfo)

        const OrderInfo = {
            cartitems,
            AddressInfo,
            email: JSON.parse(localStorage.getItem('currentUser')).user.email,
            userid: JSON.parse(localStorage.getItem('currentUser')).user.uid,
            orderDate,
            orderId

        }; 
        
        
        try {
            db.collection('orders').doc(orderId).set({
                OrderInfo
            }).then(() => {
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setEmail("");
                setAddress("");
                setCity("");
                setState("");
                setZipCode("");
                toast.success('Order Placed Successfully');
                dispatch({ type: 'CLEAR_ALL_CART', payload: [] });
                navigate('/');
            })

           
        } catch (error) {
            toast.error('Order Failed')
        }
    }

    useEffect(() => {

        // let initialAmount = 0
        // cartitems.reduce((initialAmount, prodPrice = cartitems.productPrice) => {
        //     initialAmount = (parseInt(initialAmount) + parseInt(prodPrice));
        // }, 0)

        let initialAmount = 0
        cartitems.forEach(cartitem => {
            initialAmount = parseInt(initialAmount) + parseInt(cartitem.productPrice);
        });
        setTotalAmount(initialAmount)
    }, [cartitems])
    // to update local storage
    useEffect(() => {
        localStorage.setItem('cartitems', JSON.stringify(cartitems))
    }, [cartitems])

    return (
        <Layout>
            <div className='checkOutWrapper'>
                <Grid container spacing={2} className="gridWrapper">
                    <Grid item xs={12} md={8}>
                        <Paper variant="outlined" square className='gridLeft'>
                            <h1>CheckOut</h1>
                            <form onSubmit={placeorder}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            onChange={e => setFirstName(e.target.value)}
                                            name="name"
                                            label="First Name"
                                            placeholder='Enter first name'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            onChange={e => setLastName(e.target.value)}
                                            name='last_name'
                                            label="Last Name"
                                            placeholder='Enter last name'
                                            variant='outlined'
                                            style={{ width: "100%" }}

                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            onChange={e => setPhoneNumber(e.target.value)}
                                            name="phone_number"
                                            label="Phone Number"
                                            placeholder='Enter phone number'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            onChange={e => setEmail(e.target.value)}
                                            name='email'
                                            type="email"
                                            label="Email address"
                                            placeholder='Enter email address'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField
                                            onChange={e => setAddress(e.target.value)}
                                            name="address"
                                            label="Address"
                                            multiline rows={5}
                                            placeholder='Type your address here'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={4} item>
                                        <TextField
                                            onChange={e => setCity(e.target.value)}
                                            name="city"
                                            label="City"
                                            placeholder='Enter City'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={4} item>
                                        <TextField
                                            onChange={e => setState(e.target.value)}
                                            name='state'
                                            label="State"
                                            placeholder='Enter State'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} sm={4} item>
                                        <TextField
                                            onChange={e => setZipCode(e.target.value)}
                                            name='Postal Code'
                                            label="Postal Code"
                                            placeholder='Enter Postal Code'
                                            variant='outlined'
                                            style={{ width: "100%" }}
                                            required />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField
                                            value={totalAmount}
                                            variant="outlined"
                                            onChange={(e) => { setTotalAmount(e.target.value) }}
                                            style={{ width: "100%" }}
                                            inputProps={
                                                { readOnly: true, }
                                            } />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <button
                                            type="submit"
                                            className='btnStyle'
                                            variant="contained"
                                            style={{ width: "100%" }} >
                                            Place Order
                                        </button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} md={4} >
                        <Paper variant="outlined" square className='gridRight'>
                            <h1>Your Cart {cartitems.length}</h1>
                            <div className='Back-cart'>
                                {/* {cartitems.map((item, index) => {
                                    return (
                                        <div className='cart-item-final' key={index}>
                                            <div className='cart-product'>
                                                <span>{item.productName}</span>
                                                <span>{item.productPrice}</span>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })} */}
                                <Link to='/cartpage'>
                                    <ArrowBackIcon style={{ fill: 'gray' }} />
                                    <span>Back to  Shopping Cart</span>
                                </Link>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    )
}

export default CheckOut