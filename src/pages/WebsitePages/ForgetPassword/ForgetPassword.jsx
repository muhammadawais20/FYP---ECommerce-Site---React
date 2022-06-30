import React,{useState} from 'react';
import { toast } from 'react-toastify';
import {Grid,TextField } from '@mui/material'
import { auth } from '../../../config/firebase';

const ForgetPassword = () => {
    const email = "omamagoldstar@gmail.com"

    auth.sendPasswordResetEmail(email).then(
        toast.success("Email send successfully")
    )
    return (
        <div>
            <Grid item>
                <TextField
                    label="Forget Password"
                    placeholder='Enter Password'
                    variant="outlined"
                    fullWidth required />
            </Grid>
        </div>
    )
}

export default ForgetPassword
