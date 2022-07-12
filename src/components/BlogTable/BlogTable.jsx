import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import './blogTable.scss';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const BlogTable = () => {

    const [blogData, setBlogData] = useState([]);
    const [show, setShow] = useState(false);

    const [productName, setProductName] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productDescription, setProductDescription] = useState("");
    ///to start from here 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getBlogData();
    }, [])

    async function getBlogData(e) {
        //  e.preventDefault()
        try {
            //setLoadig
            const getBlogDataFromFirebase = [];
            db.collection('blogs').get().then(snapshot => {
                snapshot.forEach(blogData => {
                    getBlogDataFromFirebase.push({ ...blogData.data() })
                    //setLoadig
                })
                setBlogData(getBlogDataFromFirebase)
            })
        }
        catch (error) {
            //setLoadig
            toast.error("Error!");
        }
    }

    const deleteHandler = async (data) => {
        try {
            db.collection("blogs").doc(data.blogId).delete({
            })
            toast.success("Blog deleted Successfully!")
            getBlogData()
        } catch (error) {
            toast.error("Blog deletion Failed!");
        };
    }

    const editHandler = async (data) => {
        try {
            db.collection("blogs").doc(data.blogId).update({
                productName: productName,
                productIntro: productIntro,
                productDescription: productDescription,
            })
            toast.success("Blog Updated Successfully");
            getBlogData()
        } catch (error) {
            toast.error("Blog Update Failed!");
        };
    }

    return (

        <div className='blogTable'>
            <div className="blogTableTitle">
                Add New Blog
                <Link to="/blogs/newBlogs" className='linkToNewBlog' style={{ textDecoration: "none" }}>
                    Add New
                </Link>
            </div>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Date</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Image</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Name</TableCell>
                            <TableCell sx={{ minWidth: 300 }} className='tableData'>Intro</TableCell>
                            <TableCell sx={{ minWidth: 400 }} className='tableData'>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    {blogData.map((data) => (
                        <TableBody>

                            <TableRow key={data.productsId}>
                                <TableCell className='tableData'>{data.blogDate}</TableCell>
                                <TableCell className='tableData'>
                                    <div className="blogImageCell">
                                        <img src={data.blogImg} alt="blog Img" className="blogImage" />
                                    </div>
                                </TableCell>

                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{data.productName}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{data.productIntro}</TableCell>
                                <TableCell className='tableData'>{data.productDescription}</TableCell>
                                <TableCell className='view-delete'>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='edit' onClick={handleShow}>Edit</div>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={() => deleteHandler(data)}>Delete</div>
                                </TableCell>

                            </TableRow>
                            <Modal className='modal' show={show} onHide={handleClose}>
                                <Modal.Header closeButton >
                                    <Modal.Title className="modal-title w-100 ">Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form className='formModal'>

                                        <div className="formInput">
                                            <label>Product Name</label>
                                            <input type="text" onChange={event => setProductName(event.target.value)} placeholder="Enter Product Name" required />
                                        </div>

                                        <div className="formInput">
                                            <label>Intro</label>
                                            <input type="text" onChange={event => setProductIntro(event.target.value)} placeholder="Enter Product Intro" required />
                                        </div>

                                        <div className="formInput">
                                            <label>Description</label>
                                            <input type="email" onChange={event => setProductDescription(event.target.value)} placeholder="Enter Product Description" required />
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>Close</Button>
                                    <Button onClick={() => editHandler(data)}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>

        </div>

    );
};

export default BlogTable;