import React, { useState } from 'react';
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import { Button, Avatar, Grid, Card, TextField, Typography } from '@mui/material';
import ContactPageSharpIcon from '@mui/icons-material/ContactPageSharp';
import './Contact.css';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('contacts').add({
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message
        }).then(() => {
            toast.success('Message has been submitted');
            setName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }).catch(() => {
            toast.error('Faild');
        });
    }

    return (
        <Layout>

        <div className='contactWrapper'>
            <Card variant="outlined" sx={{ width: '50%' }} className='paperStyle'>
                <Grid align='center'>
                    <Avatar className='avatarStyle'><ContactPageSharpIcon /></Avatar>
                    <h2 className='headerStyle'>CONTACT-US</h2>
                    <Typography variant='caption' gutterBottom>fill up the from and our team will get back to you within 24 hours</Typography>
                </Grid>
                <form onSubmit={handleSubmit} style={{ padding: '15px' }}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField
                                onChange={e => setName(e.target.value)}
                                name="name"
                                label="First Name"
                                placeholder='Enter first name'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField
                                onChange={e => setLastName(e.target.value)}
                                name='last_name'
                                label="Last Name"
                                placeholder='Enter last name'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setEmail(e.target.value)}
                                name="user_email"
                                type="email"
                                label="Email"
                                placeholder='Enter email'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setPhone(e.target.value)}
                                name='user_number'
                                type="number"
                                label="Phone"
                                placeholder='Enter phone-number'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                onChange={e => setMessage(e.target.value)}
                                name="message"
                                label="Message"
                                multiline rows={5}
                                placeholder='Type your message here'
                                variant='outlined'
                                fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                type="submit"
                                className='btnStyle'
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
