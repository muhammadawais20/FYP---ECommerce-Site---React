import React, { useState } from "react";
import { db, storage } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import noimage from '../../../noimage.jpg';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './newproducts.scss';


const NewProducts = ({ title }) => {

    const [productImg, setProductImg] = useState();
    const [productName, setProductName] = useState();
    const [originalProductPrice, setOriginalProductPrice] = useState();
    const [productPrice, setProductPrice] = useState();
    const [profit, setProfit] = useState();
    const [productDescription, setProductDescription] = useState()
    const [productQuantity, setProductQuantity] = useState()

    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const navigate = useNavigate();

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile)
            setError('')
        }
        else {
            setProductImg(null)
            toast.error('Please select a valid image type png or jpeg format!', {
                position: 'top-center',
                autoClose: 5000
            })
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        console.log(productName, productPrice, productImg)
        // Storing the Image
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg)
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, err => {
            setError(err.message)
        }, () => {


            const productIdPath = `${productName}_${(Math.floor(Math.random() * 1000))}`
            // getting product url and if success then storing the product in db
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                db.collection('Products').doc(productIdPath).set({
                    productId: productIdPath,
                    productName: productName,
                    productDescription: productDescription,
                    originalPrice: Number(originalProductPrice),
                    productPrice: Number(productPrice),
                    profit: Number(productPrice) - Number(originalProductPrice),
                    productQuantity: Number(productQuantity),
                    productImg: url
                }).then(() => {
                    setProductName('');
                    setProductDescription('');
                    setOriginalProductPrice('');
                    setProductPrice('');
                    setProfit('');
                    navigate('/products');
                    toast.success('Product Data Submission Successfully!');
                    document.getElementById('fileUpload').value = ('');

                }).catch(() => {
                    toast.error('Product Data Submission Failed!')
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
                            src={productImg ? URL.createObjectURL(productImg) : noimage}
                            alt="No Image" />
                    </div>
                    <div className="right">

                        <form onSubmit={addProduct}>
                            <div className="formInput">
                                <label htmlFor="fileUpload">
                                    Product Image<DriveFolderUploadIcon className="icon" />
                                </label>
                                <input type="file" id="fileUpload" onChange={productImgHandler} style={{ display: "none" }} />
                            </div>

                            <div className="formInput">
                                <label>Product Name</label>
                                <input type="text" onChange={event => setProductName(event.target.value)} value={productName} placeholder="Enter Product Name" required />
                            </div>

                            <div className="formInput">
                                <label>Original Price</label>
                                <input type="number" onChange={event => setOriginalProductPrice(event.target.value)} value={originalProductPrice} placeholder="Enter Product Price" required />
                            </div>

                            <div className="formInput">
                                <label>Product Price</label>
                                <input type="number" onChange={event => setProductPrice(event.target.value)} value={productPrice} placeholder="Enter Product Price" required />
                            </div>

                            <div className="formInput">
                                <label>Profit</label>
                                <input type="number" onChange={event => setProfit(event.target.value)} value={profit} placeholder="Enter Profit" required />
                            </div>

                            <div className="formInput">
                                <label>Product Description</label>
                                <input type="text" onChange={event => setProductDescription(event.target.value)} value={productDescription} placeholder="Enter Product Description" required />
                            </div>

                            <div className="formInput">
                                <label>Quantity</label>
                                <input type="number" onChange={event => setProductQuantity(event.target.value)} value={productQuantity} placeholder="Enter Product Quantity" required />
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

export default NewProducts;