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
import ChatIcon from '@mui/icons-material/Chat';

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

    const [complaint, setComplaint] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

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


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ChatIcon className='navIcon'
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
            </ChatIcon>
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
                    Messages/Complaints
                </MenuItem>
                {complaint.map((complaints, index) => (

                    <Link to="/messages" style={{ textDecoration: "none" }}>
                        <li style={{ color: 'green', cursor: 'default' }}>
                            <span>{complaints.messageDate}</span>
                        </li>
                        <MenuItem style={{ color: '#502d2e' }} key={index} onClick={handleClose} disableRipple>
                            <LabelImportantIcon style={{ color: '#502d2e' }} className='icon' />You have a new message from &nbsp;<span style={{ color: '#2196f3', fontWeight: 'bold' }}>{complaints.firstName} {complaints.lastName}.</span>
                        </MenuItem>
                        <Divider sx={{ backgroundColor: '#502d2e' }} />

                    </Link>
                ))}
            </StyledMenu>
        </div>
    );
}
