import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {


    const [order, setOrder] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

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


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <NotificationsNoneOutlinedIcon className='navIcon'
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Options
            </NotificationsNoneOutlinedIcon>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >

                <MenuItem style={{ color: '#555', justifyContent: 'center', cursor: 'default', fontWeight: 'bold', fontSize: '20px' }} disableRipple>
                    Orders
                </MenuItem>

                {order.map((orders, index) => (
                    <Link to="/orders" style={{ textDecoration: "none" }}>
                        <li style={{ color: 'green', cursor: 'default' }}>
                            <span>{orders.OrderInfo.orderDate}</span>
                        </li>
                        <MenuItem style={{ color: '#502d2e' }} key={index} onClick={handleClose} disableRipple className='orderDetailsNotification'>
                            <LabelImportantIcon style={{ color: '#502d2e' }} className='icon' />You have a new order from &nbsp;<span style={{ color: '#2196f3', fontWeight: 'bold' }}>{orders.OrderInfo.AddressInfo.firstName} {orders.OrderInfo.AddressInfo.lastName}.</span>
                        </MenuItem>
                        <Divider sx={{ backgroundColor: '#502d2e' }} />

                    </Link>
                ))}
            </StyledMenu>
        </div>
    );
}
