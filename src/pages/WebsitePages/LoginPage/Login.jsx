import React, { useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Avatar, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';

const WebLogin = () => {
  const { loggedIn } = useSelector(state => state.cartReducer);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LoginApp = async (e) => {
    e.preventDefault()

    try {
      const result = await auth.signInWithEmailAndPassword(email, values.password)
      localStorage.setItem('currentUser', JSON.stringify(result))
      dispatch({
        type: "currentUser",
        payload: result.user,
      });
      toast.success('Login Successfull!', {
        position: 'top-right'
      })

      setEmail('');
      setValues("");
  
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
        localStorage.setItem('LoggedIn', true)
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
            marginTop: '110px',
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
                  fullWidth 
                  required 
                  />
              </Grid>
              <Grid item>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Button
              className='sign-in-Btn'
              type='submit'
              variant='contained'
              style={{ marginTop: '15px', marginBottom: '15px', backgroundColor: "#502d2e" }}
              fullWidth>Sign in</Button>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Do you have an account?&nbsp;
              <NavLink as={Link} to="/signup" style={{color: "#100909"}}>
                Sign-Up
              </NavLink>
            </Typography>
            <Typography gutterBottom color="textSecondary" variant='body2' component="p"> Forget Password?&nbsp;
              <NavLink as={Link} to="/forgetpassword" style={{color: "#100909"}}>
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