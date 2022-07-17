import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
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
import './productTable.scss';

const ProductTable = () => {

    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [productName, setProductName] = useState();
    const [originalPrice, setOriginalPrice] = useState();
    const [productIdState, setProductIdState] = useState();
    
    const handleClose = () => setShow(false);

    const handleShow = (products) => {
        console.log("Product Id", products.productId)
        setProductIdState(products.productId);
        setShow(true);
    }

    useEffect(() => {
        getProduct();
    }, [])

    async function getProduct() {
     
        try {
            const getProductFromFirebase = [];
            db.collection('Products').get().then(snapshot => {
                snapshot.forEach(product => {
                    getProductFromFirebase.push({ ...product.data() })
                })
                setProduct(getProductFromFirebase)
            })
        }
        catch (error) {
            toast.error("Error");
        }
    }

    const deleteHandler = async (products) => {
       
        try {
            db.collection("Products").doc(products.productId).delete({
            })
            toast.success("Product deleted Successfully!")
            getProduct()
        } catch (error) {
            toast.error("Product deletion Failed!");
        };
    }

    const editHandler = async () => {
        try {
            db.collection("Products").doc(productIdState).update({
                productName: productName,
                originalPrice: originalPrice,
                productPrice: price,
                productDescription: description,
                productQuantity: quantity,

            }).then(() => {
                setPrice("");
                setDescription("");
                setQuantity("");
                setProductName("");
                setOriginalPrice("");
                toast.success("Product Updated Successfully");
                getProduct();
            })
            
        } catch (error) {
            toast.error("Product Update Failed!");
        };
    }

    useEffect(() => {
        getProduct();
    }, [editHandler])

    return (

        <div className='productTable'>
            <div className="productTableTitle">
                Add New Product
                <Link to="/products/newProduct" className='linkToNewProduct' style={{ textDecoration: "none" }}>
                    Add New
                </Link>
            </div>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Id</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Image</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Name</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Quantity</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Original Price</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Product Price</TableCell>
                            <TableCell sx={{ minWidth: 100 }} className='tableData'>Profit</TableCell>
                            <TableCell sx={{ minWidth: 150 }} className='tableData'>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    {product.map((products) => (
                        <TableBody>
                            <TableRow key={products.productsId}>
                                <TableCell className='tableData'>{products.productId}</TableCell>
                                <TableCell className='tableData'>
                                    <div className="productImageCell">
                                        <img src={products.productImg} alt="user Img" className="productImage" />
                                    </div>
                                </TableCell>

                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{products.productName}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{products.productQuantity}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{products.originalPrice}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{products.productPrice}</TableCell>
                                <TableCell className='tableData' style={{ textAlign: 'center' }} >{products.profit}</TableCell>
                                <TableCell className='tableData'>{products.productDescription}</TableCell>
                                <TableCell className='view-delete'>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='edit' onClick={() => handleShow(products)}>Edit</div>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={() => deleteHandler(products)}>Delete</div>
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
                                                type="text"
                                                label="Product Name"
                                                placeholder="Enter Product Name"
                                                onChange={(e) => setProductName(e.target.value) }
                                                value={productName}
                                                fullWidth
                                                required />
                                        </div>

                                    <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type="number"
                                                label="Original Price"
                                                placeholder="Enter Original Price"
                                                onChange={(e) => setOriginalPrice(e.target.value) }
                                                value={originalPrice}
                                                fullWidth
                                                required />
                                        </div>

                                        <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type="number"
                                                label="Product Price"
                                                placeholder="Enter Product Price"
                                                onChange={(e) => setPrice(e.target.value) }
                                                value={price}
                                                fullWidth
                                                required />
                                        </div>


                                        <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type="text"
                                                label="Description"
                                                placeholder="Enter Product Description"
                                                onChange={(e) => setDescription(e.target.value) }
                                                value={description}
                                                fullWidth
                                                required />
                                        </div>
                                        <div className="formInput">
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type="number"
                                                label="Quantity"
                                                placeholder="Enter Product Quantity"
                                                onChange={(e) => setQuantity(e.target.value) }
                                                value={quantity}
                                                fullWidth
                                                required />
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>Close</Button>
                                    <Button onClick={() => editHandler(products)}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductTable;