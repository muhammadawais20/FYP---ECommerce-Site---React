import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './navbar.scss';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import { DarkModeContext } from '../../../context/darkModeContext';
import { useContext } from "react";

const Navbar = () => {

    const [admin, setAdmin] = useState([]);
    const { dispatch } = useContext(DarkModeContext);

    useEffect(() => {
        getAdmin();
    }, [])

    async function getAdmin() {
        try {
            //setLoadig
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
            console.log("Error");
        }
    }

    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="items">
                    <div className="item">
                        <LanguageIcon className='navIcon' />
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon
                            className="navIcon"
                            onClick={() => dispatch({ type: "TOGGLE" })}
                        />
                    </div>
                    {/* <div className="item">
                        <NotificationsNoneOutlinedIcon className='navIcon' />
                        <div className="counter">5</div>
                    </div>
                    <div className="item">
                        <ChatIcon className='navIcon' />
                        <div className="counter">10</div>
                    </div> */}

                    <div className="item">
                        <img src={admin.map(e => e.adminImg)} alt='Avatar' className='avatar' />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;