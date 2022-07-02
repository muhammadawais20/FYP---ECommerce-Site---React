import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './messageTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';


const ProductTable = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, [])

    async function getContacts(e) {
        //  e.preventDefault()
        try {
            const getContactsFromFirebase = [];
            db.collection('contacts').get().then(snapshot => {
                snapshot.forEach(contacts => {
                    getContactsFromFirebase.push({ ...contacts.data() })
                })
                setContacts(getContactsFromFirebase)
            })
        }
        catch (error) {
            toast.error("Error!");
        }
    }

    return (

        <div className='messageTable'>
            <div className="messageTableTitle">
                Messages/Complaints
            </div>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Message Date</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Full Name</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    {contacts.map((contact) => (
                        <TableBody>

                            <TableRow key={contact.messageDate}>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.messageDate}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.firstName} {contact.lastName}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.phone}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.email}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.message}</TableCell>
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

export default ProductTable;