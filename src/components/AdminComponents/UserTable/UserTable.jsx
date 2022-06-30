import React, { useState, useEffect } from 'react';
import './userTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userRows, userColumns } from '../../../components/AdminComponents/UserTable/UserTable';
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
            //setLoadig
            const getUserFromFirebase = [];
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(user => {
                    getUserFromFirebase.push({ ...user.data() })
                    //setLoading
                })
                setUser(getUserFromFirebase)
                console.log('User =>', getUserFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    const deleteHandler = async (users) => {
        console.log(users)
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
                            {/* <TableCell sx={{ minWidth: 50 }} className='tableData'>Image</TableCell> */}
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>User Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Full Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Password</TableCell>
                            {/* <TableCell sx={{ minWidth: 50 }} className='tableData'>Address</TableCell> */}
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.map((users, index) => (
                            <TableRow key={index}>
                                <TableCell className='tableData'>{users.userId}</TableCell>
                                {/* <TableCell className='tableData'>
                                    <div className="userImageCell">
                                        <img src={users.UserImg} alt="User Image" className="userImage" />
                                        {users.user}
                                    </div>
                                </TableCell> */}
                                <TableCell className='tableData'>{users.userName}</TableCell>
                                <TableCell className='tableData'>{users.fullName}</TableCell>
                                <TableCell className='tableData'>{users.email}</TableCell>
                                <TableCell className='tableData'>{users.phone}</TableCell>
                                <TableCell className='tableData'>{users.password}</TableCell>
                                {/* <TableCell className='tableData'>{users.address}</TableCell> */}
                                <TableCell className='tableData'>{users.country}</TableCell>

                                <TableCell className='view-delete'>
                                        <div className='edit'>Edit</div>
                                </TableCell>
                                <TableCell className='view-delete'>
                                    <div onClick={() => {deleteHandler(users)}} className='delete'>Delete</div>
                                </TableCell>
                                
                                {/* <TableCell className='tableData'>
                                    <div className={`status ${users.status}`}>{users.status}</div>
                                </TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionFields)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />  */}
        </div>

    );
};

export default UserTable;