import React, { useState, useEffect } from 'react';
import { auth } from '../../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, FormControlLabel, Grid, Paper, TextField, Checkbox, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './Login.css';

const WebLogin = () => {
  const { loggedIn } = useSelector(state => state.cartReducer);
  const [admin, setAdmin] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // function adminStateChange() {
  //   auth.onAuthStateChanged(function (admin) {
  //     setAdmin(admin)
  //     dispatch({
  //       type: "adminHome",
  //       payload: admin,
  //     });
  //   });
  // }
  // useEffect(() => {
  //   adminStateChange()
  // }, [admin]);


  // function authChecker(user, component, path = "/") {
  //   return user ? component : <Navigate to={path} />;
  // }
  const LoginApp = async (e) => {
    e.preventDefault()
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      localStorage.setItem('currentUser', JSON.stringify(result))
      toast.success('Login Successfull', {
        position: 'bottom-left'
      })
      setEmail('');
      setPassword('')
      if (email === "awais20@gmail.com") {
        dispatch({
          type: 'setAdmin',
          adminStatus: true,
        })
        dispatch({
          type: 'setLoggedIn',
          loggedIn: false,
        })
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
        navigate('/')

      }
    }
    catch (error) {
      toast.error('Login Failed!')
    }

  }
  return (
    <Layout>
      <Grid>
        <Paper elevation={10}
          style={{
            width: 280,
            margin: '20px auto',
            padding: 20,
            height: '70vh',
            marginTop: 120
          }}>
          <form onSubmit={LoginApp}>
            <Grid align='center'>
              <Avatar className="avatarStyle"><LogoutOutlinedIcon /></Avatar>
              <h2 >SIGN IN</h2>
            </Grid>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  type='email'
                  name={email}
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
            <Button
              className='btnStyle'
              type='submit'
              variant='contained'
              fullWidth>Sign In
            </Button>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Do you have an account? &nbsp;
              {/* <Link as={Link} to={"/signup"} >
                Sign Up
              </Link> */}
              <Link to="/signup">
                Sign Up?
              </Link>
            </Typography>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Forgot Password? &nbsp;
              <Link to="/forgetpassword">
                Reset Password?
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default WebLogin;