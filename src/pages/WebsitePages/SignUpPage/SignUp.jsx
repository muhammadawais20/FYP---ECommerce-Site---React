import React, { useState, useEffect } from 'react'
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import { db, auth } from '../../../config/firebase';
import { Avatar, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './SignUp.css';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');

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

  const SignInApp = async (e) => {
    e.preventDefault();

    if (values.password.length < 7) {
      toast.error("Password should be more than 7 characters");
    } else if (values.password.search(/[a-zA-Z]/) == -1) {
      toast.error("Password should contain alphabets");
    } else if (values.password.search(/[0-9]/) == -1) {
      toast.error("Password should contain numbers");
    } else if (values.password.search(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/) == -1) {
      toast.error("Password should contain special characters");
    }
    else if (phone.length > 11 || phone.length < 11) {
      toast.error("Phone should have 11 digits");
    }
    else if (Number(!phone.startsWith("03"))) {
      toast.error("Phone should be of Pakistani Network, Starts with 03.");
    }

    else {
      const userIdPath = `${userName}_${(Math.random().toFixed(2)) * 100}`;

      auth.createUserWithEmailAndPassword(email, values.password)
        .then((userAuth) => {
          db.collection('users').doc(userIdPath).set({
            fullName: fullName,
            userName: userName,
            userId: userIdPath,
            phone: phone,
            country: country,
            email: email,
            password: values.password,
          }).then(() => {
            <Loader />
            toast.success('Registeration Successfull!')
            setFullName('');
            setUserName('');
            setPhone('');
            setCountry('');
            setEmail('');
            setValues("");

            navigate('/weblogin');
          }).catch(() => {
            toast.error('Registeration Failed!')
          });
        })
        .catch(() => {
          toast.error('Registeration Failed')
        });
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
    });
  }, [SignInApp]);


  return (
    <Layout>
      <Grid>
        <Paper elevation={10}
          style={{
            width: 320,
            margin: '20px auto',
            padding: '20px 30px',
            height: '100vh',
            marginTop: '110px'
          }}>
          <form onSubmit={SignInApp}>
            <Grid align='center'>
              <Avatar className='avatarStyle'><AccountCircleSharpIcon /></Avatar>
              <h2 className='headerStyle'>Sign Up</h2>
              <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
            </Grid>
            <Grid container direction={"column"} spacing={1}>
              <Grid item>
                <TextField
                  onChange={e => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder='Enter full name'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => setUserName(e.target.value)}
                  label="User Name"
                  placeholder='Enter username'
                  variant="outlined"
                  fullWidth required />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => setPhone(e.target.value)}
                  type="number"
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
            <Grid style={{ margin: '10px' }}>
              <Typography gutterBottom color="textSecondary" variant='body2' component="p">
                By creating an acount, you agree to the&nbsp;
                <NavLink as={Link} to="/privacypage" className="linkSignup">
                  Privacy Policy.
                </NavLink>
              </Typography>
            </Grid>
            <Grid>
              <Button
                className='btnstyle'
                type='submit'
                variant='contained'
                fullWidth
                style={{ backgroundColor: "#502d2e" }}
              >
                create an account
              </Button>
            </Grid>
            <Grid style={{ margin: '10px' }}>
              <Typography gutterBottom color="textSecondary" variant='body2' component="p">Have an account?&nbsp;
                <NavLink as={Link} to="/weblogin" className="linkSignup">
                  Sign-In
                </NavLink>
              </Typography>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default SignUp;