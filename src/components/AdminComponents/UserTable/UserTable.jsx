import React, { useState, useEffect } from 'react';
import './userTable.scss';
import Loader from '../../WebsiteComponents/Loader/Loader';
import { Link } from 'react-router-dom';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';


const UserTable = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    async function getUser() {
        try {
            <Loader />
            const getUserFromFirebase = [];
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(user => {
                    getUserFromFirebase.push({ ...user.data() })
                    {<Loader />}
                })
                setUser(getUserFromFirebase)
            })
        }
        catch (error) {
            <Loader />
            toast.error("Error!");
        }
    }

    const deleteHandler = async (users) => {
        try {
            db.collection("users").doc(users.userId).delete({
            })
            toast.success("User Deleted Successfully!")
            getUser()
        } catch (error) {
            toast.error("User Deletion Failed!");
        };
    }

    return (

        <div className='userTable'>
            <div className="userTableTitle">
                Add New User
                <Link to="/users/NewUser" className='linkToNewUser' style={{ textDecoration: "none" }}>
                    Add New
                </Link>
            </div>


            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>User Id</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>User Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Full Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.map((users, index) => (
                            <TableRow key={index}>
                                <TableCell className='tableData'>{users.userId}</TableCell>
                                <TableCell className='tableData'>{users.userName}</TableCell>
                                <TableCell className='tableData'>{users.fullName}</TableCell>
                                <TableCell className='tableData'>{users.email}</TableCell>
                                <TableCell className='tableData'>{users.phone}</TableCell>
                                <TableCell className='tableData'>{users.country}</TableCell>

                                <TableCell className='view-delete'>
                                    <div onClick={() => {deleteHandler(users)}} className='delete'>Delete</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default UserTable;