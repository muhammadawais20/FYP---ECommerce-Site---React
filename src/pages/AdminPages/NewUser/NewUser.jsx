import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './newUser.scss';
import noimage from '../../../noimage.jpg';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { db, storage, auth } from '../../../config/firebase';
import { toast } from 'react-toastify';


const NewUser = ({ title }) => {

    const [userImage, setUserImage] = useState(null);
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    const types = ['image/png', 'image/jpeg'];

    const navigate = useNavigate();

    const UserImgHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setUserImage(selectedFile)
            setError('')
        }
        else {
            setUserImage(null)
            toast.error('Please select a valid image type png or jpeg format!' , {
                position: 'top-center',
                autoClose: 5000
            })
        }
    }
    const addNewUser = (e) => {
        e.preventDefault();
        // Storing the Image
        const uploadTask = storage.ref(`user-images/${userImage.name}`).put(userImage)
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, err => {
            setError(err.message)
        }, () => {

            const userIdPath = `${username}_${Math.floor(Math.random()) * 1000}`;

            // getting user url and if success then storing the userImage in db
            storage.ref('user-images').child(userImage.name).getDownloadURL().then(url => {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        db.collection('users').doc(userIdPath).set({
                            userId: userIdPath,
                            userName: username,
                            fullName: fullname,
                            email: email,
                            password: password,
                            address: address,
                            country: country,
                            phone: phone,
                            UserImg: url
                        }).then(() => {
                            toast.success('User Data Submission Successfully!');
                            setUsername('');
                            setFullname('');
                            setEmail('');
                            setAddress('');
                            setCountry('');
                            setPhone('');;
                            setUserImage('');
                            navigate('/users');
                            // document.getElementById('fileUpload').value = ('');
                        }).catch(() => {
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
                            src={userImage ? URL.createObjectURL(userImage) : noimage}
                            alt="No Image" />
                    </div>
                    <div className="right">

                        <form onSubmit={addNewUser}>
                            <div className="formInput">
                                <label htmlFor="fileUpload">
                                    Image<DriveFolderUploadIcon className="icon" />
                                </label>
                                <input type="file" id="fileUpload" onChange={UserImgHandler} style={{ display: "none" }} />
                            </div>

                            <div className="formInput">
                                <label>User Name</label>
                                <input type="text" onChange={event => setUsername(event.target.value)} placeholder="Enter Username" required />
                            </div>

                            <div className="formInput">
                                <label>Full Name</label>
                                <input type="text" onChange={event => setFullname(event.target.value)} placeholder="Enter Fullname" required />
                            </div>

                            <div className="formInput">
                                <label>Email</label>
                                <input type="email" onChange={event => setEmail(event.target.value)} placeholder="Enter Email" required />
                            </div>

                            <div className="formInput">
                                <label>Phone</label>
                                <input type="text" onChange={event => setPhone(event.target.value)} placeholder="Enter Phone" required />
                            </div>

                            <div className="formInput">
                                <label>Address</label>
                                <input type="text" onChange={event => setAddress(event.target.value)} placeholder="Enter Address" required />
                            </div>

                            <div className="formInput">
                                <label>Country</label>
                                <input type="text" onChange={event => setCountry(event.target.value)} placeholder="Enter Country" required />
                            </div>
                          
                            <div className="formInput">
                                <label>Password</label>
                                <input type="password" onChange={event => setPassword(event.target.value)} required />
                            </div>

                            <div>
                                <button className="sendButton">Send</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser;