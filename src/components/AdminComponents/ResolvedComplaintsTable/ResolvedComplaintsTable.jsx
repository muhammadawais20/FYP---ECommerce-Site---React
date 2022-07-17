import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './resolvedComplaintsTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';


const ResolvedComplaintsTable = () => {

    const [resolvedComplaints, setResolvedComplaints] = useState([]);

    useEffect(() => {
        getResolvedComplaints();
    }, [])

    async function getResolvedComplaints(e) {
        //  e.preventDefault()
        try {
            const getResolvedComplaintsFromFirebase = [];
            db.collection('resolvedComplaints').get().then(snapshot => {
                snapshot.forEach(resolvedComplaint => {
                    getResolvedComplaintsFromFirebase.push({ ...resolvedComplaint.data() })
                })
                setResolvedComplaints(getResolvedComplaintsFromFirebase)
            })
        }
        catch (error) {
            toast.error("Error!");
        }
    }


    return (

        <div className='messageTable'>
            <div className="messageTableTitle">
                Resolved Complaints
            </div>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Id</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Complaint Date</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Full Name</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    {resolvedComplaints.map((complaints) => (
                        <TableBody>

                            <TableRow key={complaints.messageDate}>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.messageId}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.messageDate}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.firstName} {complaints.contacts.lastName}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.phone}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.email}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{complaints.contacts.message}</TableCell>
                                <TableCell className='view-delete'>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );
};

export default ResolvedComplaintsTable;