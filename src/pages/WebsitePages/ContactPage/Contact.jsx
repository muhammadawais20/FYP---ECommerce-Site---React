import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import { Button, Avatar, Grid, Card, TextField, Typography } from '@mui/material';
import ContactPageSharpIcon from '@mui/icons-material/ContactPageSharp';
import './Contact.css';

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const messageDateTime = () => {
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

    
    const getMessageId = () => {
        let date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const messageId = `${day}${month}${year}`;
        return messageId;
    }

    const messageId = `${getMessageId()}_${(Math.floor(Math.random() * 1000))}`

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phone.length > 11 || phone.length < 11) {
            toast.error("Phone should have 11 digits");
          }
          else if (Number(!phone.startsWith("03"))) {
            toast.error("Phone should be of Pakistani Network, Starts with 03.");
          } 
          
        db.collection('contacts').doc(messageId).set({
            messageId: messageId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            messageDate: messageDateTime(),
            message: message
        }).then(() => {
            toast.success('Message Delivered Successfully!');
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }).catch(() => {
            toast.error('Submission Failed!');
        });
    }
    
    return (
        <Layout>

        <div className='contactWrapper'>
            <Card variant="outlined"  className='paperStyle col-10 col-md-6'>
                <Grid align='center'>
                    <Avatar className='avatarStyle'><ContactPageSharpIcon /></Avatar>
                    <h2 className='headerStyle'>CONTACT US</h2>
                    <Typography variant='caption' gutterBottom>Fill up the from and our team will get back to you within 24 hours</Typography>
                </Grid>
                <form onSubmit={handleSubmit} style={{ padding: '15px' }}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                name="name"
                                type="text"
                                label="First Name"
                                placeholder='Enter first name.'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                name='last_name'
                                type="text"
                                label="Last Name"
                                placeholder='Enter last name.'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                name="user_email"
                                type="email"
                                label="Email"
                                placeholder='Enter email.'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                name='user_number'
                                type="number"
                                label="Phone"
                                placeholder='Enter phone number.'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setMessage(e.target.value)}
                                value={message}
                                name="message"
                                type="text"
                                label="Message"
                                multiline rows={5}
                                placeholder='Type your message/complaints.'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                type="submit"
                                className='btnmessage'
                                variant="contained"
                                fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
        </Layout>
    )
}
export default ContactUs;