import React, { useState } from 'react'
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import { db, auth } from '../../../config/firebase';
import { Avatar, FormControlLabel, Grid, Paper, TextField, Checkbox, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const SignInApp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      alert("Please Enter First Name and Last Name.")
    }

    const userIdPath = `${username}_${(Math.floor(Math.random() * 1000))}`;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        db.collection('users').doc(userAuth.userIdPath).set({
          FullName: fullName,
          userName: username,
          Phone: phone,
          Country: country,
          Email: email,
          Password: password,
          userId: userIdPath
        }).then(() => {
          toast.success('Signup Successfull. You will now automatically get redirected to Register')
          setFullName('');
          setUsername('');
          setPhone('');
          setCountry('');
          setEmail('');
          setPassword('');
          navigate('/weblogin');
        }).catch(() => {
          toast.error('Registeration Failed')
        });
      }).catch(() => {
        toast.error('Registeration Failed')
      });
  }

  return (
    <Layout>
      <Grid>
        <Paper elevation={10}
          style={{
            width: 320,
            margin: '20px auto',
            padding: '20px 30px',
            height: '90vh',
            marginTop: 120
          }}>
          <form onSubmit={SignInApp}>
            <Grid align='center'>
              <Avatar className='avatarStyle'><AccountCircleSharpIcon /></Avatar>
              <h2 className='headerStyle'>SIGN UP</h2>
              <Typography variant='caption' gutterBottom>Please fill this form to create an account.</Typography>
            </Grid>
            <Grid container direction={"column"} spacing={1}>
              <Grid item>
                <TextField
                  onChange={e => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder='Enter Full Name'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => setUsername(e.target.value)}
                  label="User Name"
                  placeholder='Enter User Name'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => setPhone(e.target.value)}
                  label="Phone"
                  placeholder='Enter Phone-Number'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => setCountry(e.target.value)}
                  label="Country"
                  placeholder='Enter Country'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  type='email'
                  onChange={e => setEmail(e.target.value)}
                  label="Email"
                  placeholder='Enter Email'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  type='password'
                  onChange={e => setPassword(e.target.value)}
                  label="Password"
                  placeholder='Enter Password'
                  variant="outlined"
                  fullWidth required />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  name='checkedB'
                  color='primary'
                  required
                />
              }
              label="I accept terms & conditions."
            />
            <Button
              className='btnStyle'
              type='submit'
              variant='contained'
              fullWidth>
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default SignUp;