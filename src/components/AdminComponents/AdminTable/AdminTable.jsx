import React, { useState, useEffect } from 'react';
import './adminTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userRows, userColumns } from './AdminTable';
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

const AdminTable = () => {

    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    async function getUser() {
        try {
            //setLoadig
            const getUserFromFirebase = [];
            db.collection('admins').get().then(snapshot => {
                snapshot.forEach(admin => {
                    getUserFromFirebase.push({ ...admin.data() })
                    //setLoading
                })
                setAdmin(getUserFromFirebase)
            })
        }
        catch (error) {
            //setLoading
            console.log("Error");
        }
    }

    
    const deleteHandler = async (admins) => {
        try {
            db.collection("admins").doc(admins.adminId).delete({
            })
            toast.success("Admin deleted successfully!")
            getUser()
        } catch (error) {
            toast.error("Admin deletion failed!");
        };
    }

    return (

        <div className='adminTable'>
            <div className="adminTableTitle">
                Add New Admin
                <Link to="/admins/newAdmin" className='linkToNewAdmin' style={{ textDecoration: "none" }}>
                    Add New
                </Link>
            </div>


            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Admin Id</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Image</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Admin Name</TableCell>
                            {/* <TableCell sx={{ minWidth: 50 }} className='tableData'>UserName</TableCell> */}
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Password</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Address</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admin.map((admins, index) => (
                            <TableRow key={index}>
                                <TableCell className='tableData'>{admins.adminId}</TableCell>
                                <TableCell className='tableData'>
                                    <div className="adminImageCell">
                                        <img src={admins.adminImg} alt="Admin Image" className="adminImage" />
                                        {admins.admin}
                                    </div>
                                </TableCell>
                                <TableCell className='tableData'>{admins.adminName}</TableCell>
                                {/* <TableCell className='tableData'>{admins.userName}</TableCell> */}
                                <TableCell className='tableData'>{admins.email}</TableCell>
                                <TableCell className='tableData'>{admins.phone}</TableCell>
                                <TableCell className='tableData'>{admins.password}</TableCell>
                                <TableCell className='tableData'>{admins.address}</TableCell>
                                <TableCell className='tableData'>{admins.country}</TableCell>

                                <TableCell className='view-delete'>
                                        <div className='edit'>
                                            Edit
                                        </div>
                                </TableCell>
                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={() => deleteHandler(admins)}>Delete</div>
                                </TableCell>
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

export default AdminTable;