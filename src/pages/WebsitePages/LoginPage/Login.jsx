import React, { useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Avatar, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './Login.css';

const WebLogin = () => {
  const { loggedIn } = useSelector(state => state.cartReducer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginApp = async (e) => {
    e.preventDefault()

    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      localStorage.setItem('currentUser', JSON.stringify(result))
      dispatch({
        type: "currentUser",
        payload: result.user,
      });
      toast.success('Login Successfull', {
        position: 'top-right'
      })

      setEmail('');
      setPassword('')
      let status = getUserFromFirebase.filter((e) => e.email === email)
      if (status.length > 0) {
        dispatch({
          type: 'setAdmin',
          adminStatus: true,
        })
        dispatch({
          type: 'setLoggedIn',
          loggedIn: false,
        })
      localStorage.setItem('AdminStatus', true)
      localStorage.setItem('LoggedIn', false)
        // adminStateChange()
        navigate('/adminHome')
      } else {
        dispatch({
          type: 'setLoggedIn',
          loggedIn: true,
        })
        dispatch({
          type: 'setAdmin',
          adminStatus: false,
        })
        localStorage.setItem('LoggedIn', true )
        localStorage.setItem('AdminStatus', false)
        navigate('/')

      }
    }
    catch (error) {
      toast.error('Login Failed!')
    }
  }

  const getUserFromFirebase = [];
  db.collection('admins').get().then(snapshot => {
    snapshot.forEach(admin => {
      getUserFromFirebase.push({ ...admin.data() })
    })
  }
  )
  return (
    <Layout>
      <Grid>
        <Paper elevation={10}
          style={{
            width: 320,
            margin: '20px auto',
            marginTop: '100px',
            padding: 20,
            height: '60vh',
          }}>
          <form onSubmit={LoginApp}>
            <Grid align='center'>
              <Avatar className="avatarStyle"><LogoutOutlinedIcon /></Avatar>
              <h2 >SIGN-IN</h2>
            </Grid>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  type='email'
                  name={email}
                  onChange={e => setEmail(e.target.value)}
                  label="Email"
                  placeholder='Enter email'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  type='password'
                  onChange={e => setPassword(e.target.value)}
                  label="Password"
                  placeholder='Enter password'
                  variant="outlined"
                  fullWidth required
                />
              </Grid>
            </Grid>
         
            <Button
              className='sign-in-Btn'
              type='submit'
              variant='contained'
              style={{marginTop: '15px', marginBottom: '15px'}}
              fullWidth>Sign in</Button>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Do you have an account?&nbsp;
              <NavLink as={Link} to="/signup">
                Sign-Up
              </NavLink>
            </Typography>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Forget Password?&nbsp;
              <NavLink as={Link} to="/forgetpassword">
                Reset Password
              </NavLink>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default WebLogin;