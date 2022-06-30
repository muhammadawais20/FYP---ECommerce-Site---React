import React, { useState } from "react";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './newAdmin.scss';
import noimage from '../../../noimage.jpg';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { db, storage, auth } from '../../../config/firebase';
import { toast } from 'react-toastify';


const NewAdmin = ({ title }) => {

    const [adminImage, setAdminImage] = useState(null);
    const [adminName, setAdminName] = useState("");
   const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    
    const [error, setError] = useState("");

    const types = ['image/png', 'image/jpeg'];

    const AdminImgHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setAdminImage(selectedFile)
            setError('')
        }
        else {
            setAdminImage(null)
            toast.error('Please select a valid image type png or jpeg format!' , {
                position: 'top-center',
                autoClose: 5000
            })
        }
    }
    const addNewAdmin = (e) => {
        // e.preventDefault();
        // Storing the Image
        const uploadTask = storage.ref(`admin-images/${adminImage.name}`).put(adminImage)
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 10
            console.log(progress)
        }, err => {
            setError(err.message)
        }, () => {

            const adminIdPath = `${adminName}_${(Math.floor(Math.random() * 1000))}`;
            // getting user url and if success then storing the adminImage in db
            storage.ref('admin-images').child(adminImage.name).getDownloadURL().then(url => {
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userAuth) => {
                        db.collection('admins').doc(adminIdPath).set({
                            adminId: adminIdPath,
                            adminName: adminName,
                            userName: userName,
                            email: email,
                            password: password,
                            address: address,
                            country: country,
                            phone: phone,

                            adminImg: url
                        }).then(() => {
                            toast.success('User Data Submission Successfully!');
                            setAdminName('');
                            setUsername('');
                            setEmail('');
                            setAddress('');
                            setCountry('');
                            setPhone('');;
                            setAdminImage('');

                        //    document.getElementById('fileUpload').value = ('');
                        }).catch((err) => {
                            console.log(err);
                            toast.error('User Data Submission Failed!')
                        });
                    })
            })
        })
    }

    return (

        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={adminImage ? URL.createObjectURL(adminImage) : noimage}
                            alt="No Image" />
                    </div>
                    <div className="right">

                        <form onSubmit={addNewAdmin}>
                            <div className="formInput">
                                <label htmlFor="fileUpload">
                                    Image<DriveFolderUploadIcon className="icon" />
                                </label>
                                <input type="file" id="fileUpload" onChange={AdminImgHandler} style={{ display: "none" }} />
                            </div>

                            <div className="formInput">
                                <label>Admin Name</label>
                                <input type="text" onChange={event => setAdminName(event.target.value)} placeholder="M.Awais" required />
                            </div>

                            <div className="formInput">
                                <label>Admin UserName</label>
                                <input type="text" onChange={event => setUsername(event.target.value)} placeholder="awais26" required />
                            </div>

                            <div className="formInput">
                                <label>Email</label>
                                <input type="email" onChange={event => setEmail(event.target.value)} placeholder="awais26@gmail.com" required />
                            </div>

                            <div className="formInput">
                                <label>Phone</label>
                                <input type="text" onChange={event => setPhone(event.target.value)} placeholder="03340268449" required />
                            </div>

                            <div className="formInput">
                                <label>Password</label>
                                <input type="password" onChange={event => setPassword(event.target.value)} required />
                            </div>

                            <div className="formInput">
                                <label>Address</label>
                                <input type="text" onChange={event => setAddress(event.target.value)} placeholder="Gulshan e Iqbal, Karachi" required />
                            </div>

                            <div className="formInput">
                                <label>Country</label>
                                <input type="text" onChange={event => setCountry(event.target.value)} placeholder="Pakistan" required />
                            </div>
                          

                            <div>
                                <button className="sendButton">Send</button>
                            </div>

                        </form>








                        {/* <Grid>
                        <DriveFolderUploadIcon />
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off">
                                    
                                        
                            

                                <TextField
                                    id="userName"
                                    label="User Name"
                                    type="text"
                                    autoComplete="userName"
                                    variant="standard"
                                />
                                <TextField
                                    id="fullName"
                                    label="Full Name"
                                    type="text"
                                    autoComplete="fullName"
                                    variant="standard"
                                />
                            </Box>

                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    variant="standard"
                                />
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    type="text"
                                    autoComplete="phone"
                                    variant="standard"
                                />
                            </Box>

                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="password"
                                    variant="standard"
                                />
                                <TextField
                                    id="country"
                                    label="Country"
                                    type="text"
                                    autoComplete="country"
                                    variant="standard"
                                />
                            </Box>

                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '52ch' },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    id="address"
                                    label="Address"
                                    type="text"
                                    autoComplete="address"
                                    variant="standard"
                                />

                            </Box>
                            <Button className="sendButton" variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                            
                        </Grid> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAdmin;