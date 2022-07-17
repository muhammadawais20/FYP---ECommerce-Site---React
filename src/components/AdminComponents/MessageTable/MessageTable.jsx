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


const MessageTable = () => {

    const [contactss, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, [])

    async function getContacts(e) {
        //  e.preventDefault()
        try {
            const getContactsFromFirebase = [];
            db.collection('contacts').get().then(snapshot => {
                snapshot.forEach(contactss => {
                    getContactsFromFirebase.push({ ...contactss.data() })
                })
                setContacts(getContactsFromFirebase)
            })
        }
        catch (error) {
            toast.error("Error!");
        }
    }


    const complaintsHandler = async (contacts) => {

        try {
            db.collection("resolvedComplaints").doc(contacts.messageId).set({
                contacts,
            })
            toast.success("Complaints Resolved Successfully!")
        } catch (error) {
            toast.error("Complaints Not Move!");
        };
    }

    const deleteHandler = async (contacts) => {
        try {
            db.collection("contacts").doc(contacts.messageId).delete({
            })
            getContacts();

        } catch (error) {
            toast.error("Failed!");
        };
    }

    const resolvedAndDelete = (complaints) => {
        complaintsHandler(complaints);

        setTimeout(deleteHandler(complaints), 5000);
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
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Id</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Message Date</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Full Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 200 }} className='tableData'>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    {contactss.map((contact) => (
                        <TableBody>
                            <TableRow key={contact.messageDate}>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.messageId}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.messageDate}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.firstName} {contact.lastName}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.phone}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.email}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{contact.message}</TableCell>
                                <TableCell className='view-delete'>
                                </TableCell>
                                <TableCell key={contact.messageId} className='resolve'>
                                    <button className='resolvebutton' id="deliver" type='submit' onClick={() => resolvedAndDelete(contact)}>Resolved?</button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );
};

export default MessageTable;