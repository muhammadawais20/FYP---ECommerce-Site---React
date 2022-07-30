import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './blogTable.scss';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BlogTable = () => {

    const [blogData, setBlogData] = useState([]);
    const [show, setShow] = useState(false);
    const [blogIdState, setBlogIdState] = useState();
    const [productName, setProductName] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [showMod, setShowMod] = useState(false);

    const closeModal = () => setShowMod(false);

    const showModal = (data) => {
        setBlogIdState(data.blogId);
        setShowMod(true);
    }

    const handleClose = () => setShow(false);

    const handleShow = (data) => {
        setBlogIdState(data.blogId);
        setShow(true);
    }

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

    const deleteHandler = async () => {
        setShowMod(false);
        try {
            db.collection("blogs").doc(blogIdState).delete({
            })
            getBlogData();
            toast.success("Blog deleted Successfully!")
        } catch (error) {
            toast.error("Blog deletion Failed!");
        };
    }

    const editHandler = async () => {
        try {
            db.collection("blogs").doc(blogIdState).update({
                productName: productName,
                productIntro: productIntro,
                productDescription: productDescription,
            }).then(() => {
                setProductName("");
                setProductIntro("");
                setProductDescription("");
                toast.success("Blog Updated Successfully");
                getBlogData();
            })
            
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
                                    <div className='edit' onClick={() => handleShow(data)}>Edit</div>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={() => showModal(data)}>Delete</div>
                                </TableCell>

                            </TableRow>
                            <Modal className='modal' show={show} onHide={handleClose}>
                                <Modal.Header closeButton >
                                    <Modal.Title className="modal-title w-100 ">Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form className='formModal'>

                                    <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                onChange={e => setProductName(e.target.value)}
                                                value={productName}
                                                type="text"
                                                label="Product Name"
                                                placeholder="Enter Product Name"
                                                fullWidth
                                                required />
                                        </div>

                                        <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                onChange={e => setProductIntro(e.target.value)}
                                                value={productIntro}
                                                type="text"
                                                label="Product Intro"
                                                placeholder="Enter Product Intro"
                                                fullWidth
                                                required />
                                        </div>
                
                                        <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                onChange={e => setProductDescription(e.target.value)}
                                                value={productDescription}
                                                type="text"
                                                label="Description"
                                                placeholder="Enter Product Description"
                                                fullWidth
                                                required />
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>Close</Button>
                                    <Button onClick={() => editHandler(data)}>Save</Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={showMod} centered>
                                <div className="modal-header text-center">
                                    <h3 className="modal-title w-100">Confirmation</h3>
                                </div>
                                <Modal.Body>
                                    <p className='text-center'>Do You Really Want to Delete Blog?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={closeModal}>No</Button>
                                    <Button onClick={() => deleteHandler(data)} className="btn btn-danger">Yes</Button>
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