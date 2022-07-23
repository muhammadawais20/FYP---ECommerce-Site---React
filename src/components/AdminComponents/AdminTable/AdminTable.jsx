import React, { useState, useEffect } from 'react';
import './adminTable.scss';
import { Link } from 'react-router-dom';
import { db } from '../../../config/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AdminTable = () => {

    const [admin, setAdmin] = useState([]);
    const [show, setShow] = useState(false);
    const [adminIdState, setAdminIdState] = useState();
    const [adminName, setAdminName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [showMod, setShowMod] = useState(false);

    const closeModal = () => setShowMod(false);
    const showModal = () => setShowMod(true);

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
                phone: phone
            }).then(() => {
                setAdminName("");
                setEmail("");
                setPhone("");
                setValues("");

                toast.success("Admin Created Successfully!");
                getAdmin()
            })

        } catch (error) {
            toast.error("Admin Data Update Failed!");
        };
    }

    useEffect(() => {
        getAdmin();
    }, [editHandler])


    const deleteHandler = async (admins) => {
        setShowMod(false);
        try {
            db.collection("admins").doc(admins.adminId).delete({
            })
            toast.success("Admin deleted successfully!")
            getAdmin()
        } catch (error) {
            toast.error("Admin deletion failed!");
        };
        
    }

    return (

        <div className='adminTable'>
            <div className="adminTableTitle">
                Add New Admin
                <Link to="/admins/newAdmin" className='linkToNewAdmin' style={{ textDecoration: "none" }}>
                    Add New
                </Link>
            </div>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Admin Id</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Image</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Admin Name</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Email</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Phone</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Password</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Address</TableCell>
                            <TableCell sx={{ minWidth: 50 }} className='tableData'>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    {admin.map((admins, index) => (
                        <TableBody key={index + 1}>
                            <TableRow key={index}>
                                <TableCell className='tableData'>{admins.adminId}</TableCell>
                                <TableCell className='tableData'>
                                    <div className="adminImageCell">
                                        <img src={admins.adminImg} alt="Admin Image" className="adminImage" />
                                    </div>
                                </TableCell>
                                <TableCell className='tableData'>{admins.adminName}</TableCell>
                                <TableCell className='tableData'>{admins.email}</TableCell>
                                <TableCell className='tableData'>{admins.phone}</TableCell>
                                <TableCell className='tableData'>{admins.password}</TableCell>
                                <TableCell className='tableData'>{admins.address}</TableCell>
                                <TableCell className='tableData'>{admins.country}</TableCell>

                                <TableCell className='view-delete'>
                                    <div className='edit' onClick={() => handleShow(admins)}>
                                        Edit
                                    </div>
                                </TableCell>
                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={showModal}>Delete</div>
                                </TableCell>
                            </TableRow>
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

                            <Modal show={showMod} centered>
                                <div className="modal-header text-center">
                                    <h3 className="modal-title w-100">Confirmation</h3>
                                </div>
                                <Modal.Body>
                                    <p className='text-center'>Do You Really Want to Delete Admin?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={closeModal}>No</Button>
                                    <Button onClick={() => deleteHandler(admins)} className="btn btn-danger">Yes</Button>
                                </Modal.Footer>
                            </Modal>

                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>

    );
};

export default AdminTable;