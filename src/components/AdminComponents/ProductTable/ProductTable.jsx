import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import './productTable.scss';
// import { DataGrid } from '@mui/x-data-grid';
// import { userRows, userColumns } from '../AdminTable/UserTable';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Grid, TextField, Button } from '@mui/material'
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const ProductTable = () => {

    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProduct();
    }, [])

    async function getProduct(e) {
        //  e.preventDefault()
        try {
            //setLoadig
            const getProductFromFirebase = [];
            db.collection('Products').get().then(snapshot => {
                snapshot.forEach(product => {
                    getProductFromFirebase.push({ ...product.data() })
                    //setLoadig
                })
                setProduct(getProductFromFirebase)
                console.log('User =>', getProductFromFirebase)

            })
        }
        catch (error) {
            //setLoadig
            console.log("Error");
        }
    }

    const deleteHandler = async (products) => {
        console.log(products)
        try {
            db.collection("Products").doc(products.productId).delete({
            })
            toast.success("Product deleted Successfully!")
            getProduct()
        } catch (error) {
            toast.error("Product deletion Failed!");
        };
    }

    const editHandler = async (products) => {
        console.log(products)
        try {
            db.collection("Products").doc(products.productId).update({
                productPrice: price,
                productDescription: description,
                productQuantity: quantity
            })
            toast.success("Product Update Successfully");
            getProduct()
        } catch (error) {
            toast.error("Product Update Failed!");
        };
    }


    // const editHandler = async (products) => {

    //     var washingtonRef = db.collection("Products").doc(products.productId);

    //     // Set the "capital" field of the city 'DC'
    //     return washingtonRef.update({
    //         productsproductPrice: price,
    //         productDescription: description,
    //         productQuantity: quantity
    //     })
    //     .then(() => {
    //         console.log("Document successfully updated!");
    //     })
    //     .catch((error) => {
    //         // The document probably doesn't exist.
    //         console.error("Error updating document: ", error);
    //     });
    // }

    // try {
    //     firebase.database().ref("Products/products.productId").set({
    //         productsproductPrice: price,
    //         productDescription: description,
    //         productQuantity: quantity
    //     })

    // const actionFields = [
    //     {
    //         field: 'action', headerName: 'Action', width: 230,
    //         renderCell: () => {
    //             return (

    //                 <div className='actionFields'>
    //                     <Link to="/products/singleproduct" style={{ textDecoration: "none" }}>
    //                         <div className='view'>View</div>
    //                     </Link>

    //                     <div className='edit'>Edit</div>
    //                     <div className='delete'>Delete</div>
    //                 </div>

    //             )
    //         }
    //     },

    // ]

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
                                <TableCell className='tableData'>{products.productDescription}</TableCell>
                                <TableCell className='view-delete'>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='edit' onClick={handleShow}>Edit</div>
                                </TableCell>

                                <TableCell className='view-delete'>
                                    <div className='delete' onClick={() => deleteHandler(products)}>Delete</div>
                                </TableCell>

                                <TableCell className='tableData'>
                                    <div className={`status ${products.status}`}>{products.status}</div>
                                </TableCell>
                            </TableRow>
                            <Modal className='modal' show={show} onHide={handleClose}>
                                <Modal.Header closeButton >
                                    <Modal.Title className="modal-title w-100 ">Cashout Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form className='formModal'>

                                        {/* <div className="formInput">
                                        <label>Product Quantity</label>
                                        <input type="text" placeholder="Enter Product Quantity"  onChange={(e) => { setQuantity(e.target.value) }} required />
                                    </div> */}

                                        <div className="formInput">
                                            <label>Product Price</label>
                                            <input type="number" placeholder="Enter Product Price" onChange={(e) => { setPrice(e.target.value) }} required />
                                        </div>

                                        <div className="formInput">
                                            <label>Product Description</label>
                                            <input type="text" placeholder="Enter Product Description" onChange={(e) => { setDescription(e.target.value) }} required />
                                        </div>

                                        <div className="formInput">
                                            <label>Product Quantity</label>
                                            <input type="number" placeholder="Enter Product Quantity" onChange={(e) => { setQuantity(e.target.value) }} required />
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