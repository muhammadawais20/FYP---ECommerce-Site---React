import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './CartPage.css';
import { toast } from 'react-toastify';


const CartPages = () => {
  const { cartitems } = useSelector(state => state.cartReducer);
  console.log(cartitems)

  const [totalAmount, setTotalAmount] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  const handleclearCart = () => {
    dispatch({ type: 'CLEAR_ALL_CART', payload: [] });
  }

  useEffect(() => {
    let initialAmount = 0
    cartitems.forEach(cartitem => {
      initialAmount = (initialAmount) + (cartitem.productPrice * cartitem.productQuantity);
    });
    setTotalAmount(initialAmount)
  }, [cartitems])
  // to update local storage
  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems))
  }, [cartitems])

  const deleteItemCart = (product) => {
    // dispatch({ type: 'DELETE_FROM_CART', payload: product });
    let newArry = [...cartitems];
    console.log(newArry, "cartlist")
    const itemIndex = newArry.findIndex((e) => e.productName == product.productName)
    console.log(itemIndex)
    newArry.splice(itemIndex, 1)
    console.log(newArry)
    dispatch({ type: 'ADD_TO_CART', payload: newArry })
    toast.error(`${product.productName} remove from cart`)
  }

  return (
    <Layout>
      <>
        <div className="cart-container">
          <h2>Shopping Cart</h2>
          {cartitems.length == [] ? (
            <div className='cart-empty'>
              <p>Your cart is currently empty</p>
              <div className='start-shopping'>
                <Link to='/'>
                  <ArrowBackIcon style={{ fill: 'gray' }} />
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>

          ) : (
            <div>
              <div className='titles'>
                <h3>Product</h3>
                <h3>Name</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Action</h3>
              </div>
              <div className='cart-items'>
                {cartitems.map((cartitem, index) => {
                  return (
                    <div className='cart-item' key={index}>
                      <div className='cart-product'>
                        <img src={cartitem.productImg} alt='product_img' />
                      </div>
                      <div className='cart-product-name'>
                        {cartitem.productName}
                      </div>
                      <div className='cart-product-price'>
                        { `${cartitem.productPrice}`}
                      </div>
                      <div className='cart-product-price'>
                        {cartitem.productQuantity}
                      </div>
                      <div className='cart-product-action'>
                        <DeleteIcon onClick={() => deleteItemCart(cartitem)} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='cart-summary'>
                <button className='clear-cart' onClick={handleclearCart}>Clear Cart</button>
                <div className='cart-placeorder'>
                  <div className='totalitems'>
                    <span>TotalItems</span>
                    <span className='items'>{cartitems.length}</span>
                  </div>
                  <div className='subtotal'>
                    <span>Subtotal</span>
                    <span className='amount'>{totalAmount}</span>
                  </div>
                  <button onClick={() => { navigate('/checkOut') }}>CheckOut</button>
                  <div className='continue-shopping'>
                    <Link to='/'>
                      <ArrowBackIcon style={{ fill: 'gray' }} />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
      <div>
      </div>
    </Layout>
  )
}

export default CartPages
