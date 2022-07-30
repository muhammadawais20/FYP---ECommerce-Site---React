import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import './newBlog.scss';
import noimage from '../../../noimage.jpg';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { db, storage } from '../../../config/firebase';
import { toast } from 'react-toastify';


const NewBlog = ({title}) => {

    const [blogImage, setBlogImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const getDate = () => {
        let myDate = new Date();
        let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
        let date = myDate.getDate();
        let month = monthsList[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = daysList[myDate.getDay()];
        let today = `${date} ${month} ${year}, ${day}`;
        let amOrPm;
        let twelveHours = function () {
            if (myDate.getHours() > 12) {
                amOrPm = 'PM';
                let twentyFourHourTime = myDate.getHours();
                let conversion = twentyFourHourTime - 12;
                return `${conversion}`

            } else {
                amOrPm = 'AM';
                return `${myDate.getHours()}`
            }
        };

        let hours = twelveHours();
        let minutes = myDate.getMinutes();
        let currentTime = `${hours}:${minutes} ${amOrPm}`;

        return (today + ' ' + currentTime);

    }

    const [blogDate, setBlogDate] = useState(getDate);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const BlogImgHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setBlogImage(selectedFile)
            setError('')
        }
        else {
            setBlogImage(null)
            toast.error('Please select a valid image type png or jpeg format!', {
                position: 'top-center',
                autoClose: 5000
            })
        }
    }
    const addNewBlog = (e) => {
        e.preventDefault();
        // Storing the Image
        const uploadTask = storage.ref(`blog-images/${blogImage.name}`).put(blogImage)
        uploadTask.on('state_changed', snapshot => {
        //    return (snapshot.bytesTransferred / snapshot.totalBytes) * 10
            
        }, err => {
            setError(err.message)
        }, () => {

            const blogIdPath = `${productName}_${(Math.floor(Math.random() * 1000))}`;
            // getting user url and if success then storing the adminImage in db
            storage.ref('blog-images').child(blogImage.name).getDownloadURL().then(url => {
                db.collection('blogs').doc(blogIdPath).set({
                    blogId: blogIdPath,
                    productName: productName,
                    productIntro: productIntro,
                    productDescription: productDescription,
                    blogDate: blogDate,
                    blogImg: url
                }).then(() => {
                    toast.success('Blog Added Successfully!');
                    setProductName("");
                    setProductIntro("");
                    setProductDescription("");
                    setBlogImage("");
                    navigate('/blogs');
                    document.getElementById('fileUpload').value = ('');
                }).catch(() => {
                    toast.error('Blog Submission Failed!')
                });
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
                            src={blogImage ? URL.createObjectURL(blogImage) : noimage}
                            alt="No Image" />
                    </div>
                    <div className="right">

                        <form onSubmit={addNewBlog}>
                            <div className="formInput">
                                <label htmlFor="fileUpload">
                                    Image<DriveFolderUploadIcon className="icon" />
                                </label>
                                <input type="file" id="fileUpload" onChange={BlogImgHandler} style={{ display: "none" }} />
                            </div>

                            <div className="formInput">
                                <label>Product Name</label>
                                <input type="text" onChange={event => setProductName(event.target.value)} value={productName} placeholder="Enter Product Name" required />
                            </div>

                            <div className="formInput">
                                <label>Intro</label>
                                <input type="text" onChange={event => setProductIntro(event.target.value)} value={productIntro} placeholder="Enter Product Intro" required />
                            </div>

                            <div className="formInput">
                                <label>Description</label>
                                <textarea style={{height: "200px", width: "385px", overflowX: "hidden", overflowY: "scroll"}} type="text" onChange={event => setProductDescription(event.target.value)} value={productDescription} placeholder="Enter Product Description" required />
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

export default NewBlog;