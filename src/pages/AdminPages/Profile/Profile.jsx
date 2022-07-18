import React, { useState, useEffect } from "react";
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import "./profile.scss";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {

  const [admin, setAdmin] = useState([]);
  const [show, setShow] = useState(false);
  const [adminIdState, setAdminIdState] = useState();
  const [adminName, setAdminName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

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

  const handleClose = () => setShow(false);

  const handleShow = (admins) => {
    setAdminIdState(admins.adminId);
    setShow(true);
  }

  useEffect(() => {
    getAdmin();
  }, [])

  async function getAdmin() {
    try {
      //setLoadig
      const getUserFromFirebase = [];
      db.collection('admins').get().then(snapshot => {
        snapshot.forEach(admin => {
          getUserFromFirebase.push({ ...admin.data() })
          //setLoading
        })
        setAdmin(getUserFromFirebase)
      })
    }
    catch (error) {
      //setLoading
      toast.error("Error");
    }
  }

  const editHandler = async () => {

    try {
      db.collection("admins").doc(adminIdState).update({
        adminName: adminName,
        email: email,
        password: values.password,
        phone: phone,
        address: address

      }).then(() => {
        setAdminName("");
        setEmail("");
        setPhone("");
        setValues("");
        setAddress("");
        toast.success("Admin Data Updated Successfully!");
        getAdmin();
      })

    } catch (error) {
      toast.error("Admin Data Update Failed!");
    };
  }

  useEffect(() => {
    getAdmin();
  }, [editHandler])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {admin.map((admins, index) => {
          return <div key={index} className="top">
            <div className="profile">
              <div className="editButton" onClick={() => handleShow(admins)}>Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={admins.adminImg}
                  alt="Admin Image"
                  className="itemImg"
                />
                <div className="details">
                  <h3 className="itemTitle">{admins.adminName}</h3>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{admins.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{admins.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {admins.address}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{admins.country}</span>
                  </div>
                </div>
              </div>
            </div>

            <Modal className='modal' show={show} onHide={handleClose}>
              <Modal.Header closeButton >
                <Modal.Title className="modal-title w-100 ">Product Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className='formModal'>
                  <div className="formInput">
                    <TextField
                      style={{ marginBottom: '10px' }}
                      onChange={e => setAdminName(e.target.value)}
                      value={adminName}
                      type="text"
                      label="Admin Name"
                      placeholder="Enter Admin Name"
                      fullWidth
                      required />
                  </div>

                  <div className="formInput">
                    <TextField
                      style={{ marginBottom: '10px' }}
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      label="Email"
                      placeholder="Enter Email"
                      fullWidth
                      required />
                  </div>

                  <div className="formInput">
                    <TextField
                      style={{ marginBottom: '10px' }}
                      onChange={e => setPhone(e.target.value)}
                      value={phone}
                      type="number"
                      label="Phone"
                      placeholder="Enter Phone"
                      fullWidth
                      required />
                  </div>

                  <div className="formInput">
                    <TextField
                      style={{ marginBottom: '10px' }}
                      onChange={e => setAddress(e.target.value)}
                      value={address}
                      type="text"
                      label="Address"
                      placeholder="Enter Address"
                      fullWidth
                      required />
                  </div>

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
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={() => editHandler(admins)}>Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
        })}
      </div>
    </div>
  );
};

export default Profile;