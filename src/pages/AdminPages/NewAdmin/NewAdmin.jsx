import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const AdminImgHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setAdminImage(selectedFile)
            setError('')
        }
        else {
            setAdminImage(null)
            toast.error('Please select a valid image type png or jpeg format!', {
                position: 'top-center',
                autoClose: 5000
            })
        }
    }
    const addNewAdmin = (e) => {
        e.preventDefault();
        // Storing the Image
        if (password.length < 7) {
            toast.error("Password should be more than 7 characters");
        }
        else if (password.search(/[a-zA-Z]/) == -1) {
            toast.error("Password should contain alphabets");
        }
        else if (password.search(/[0-9]/) == -1) {
            toast.error("Password should contain numbers");
        }
        else if (password.search(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/) == -1) {
            toast.error("Password should contain special characters");
        }
        else if (phone.length > 11 || phone.length < 11) {
            toast.error("Phone should have 11 digits");
        }
        else if (Number(!phone.startsWith("03"))) {
            toast.error("Phone should be of Pakistani Network, Starts with 03.");
        }

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
                    .then(() => {
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
                            toast.success('Admin Data Submission Successfully!');
                            setAdminName('');
                            setUsername('');
                            setEmail('');
                            setAddress('');
                            setCountry('');
                            setPhone('');;
                            setAdminImage('');
                            navigate('/admins');
                            document.getElementById('fileUpload').value = ('');
                        }).catch(() => {
                            toast.error('Admin Data Submission Failed!')
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
                                <input type="text" onChange={event => setAdminName(event.target.value)} value={adminName} placeholder="Enter Admin Name" required />
                            </div>

                            <div className="formInput">
                                <label>Admin UserName</label>
                                <input type="text" onChange={event => setUsername(event.target.value)} value={userName} placeholder="Enter UserName" required />
                            </div>

                            <div className="formInput">
                                <label>Email</label>
                                <input type="email" onChange={event => setEmail(event.target.value)} value={email} placeholder="Enter Email" required />
                            </div>

                            <div className="formInput">
                                <label>Phone</label>
                                <input type="text" onChange={event => setPhone(event.target.value)} value={phone} placeholder="Enter Number" required />
                            </div>

                            <div className="formInput">
                                <label>Password</label>
                                <input type="password" onChange={event => setPassword(event.target.value)} value={password} required />
                            </div>

                            <div className="formInput">
                                <label>Address</label>
                                <input type="text" onChange={event => setAddress(event.target.value)} value={address} placeholder="Enter Address" required />
                            </div>

                            <div className="formInput">
                                <label>Country</label>
                                <input type="text" onChange={event => setCountry(event.target.value)} value={country} placeholder="Enter Country" required />
                            </div>


                            <div>
                                <button type="submit" className="sendButton">Send</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAdmin;