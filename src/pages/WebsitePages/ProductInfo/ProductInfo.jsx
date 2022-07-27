import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import './ProductInfo.css'


const ProductInfo = () => {

  const { cartitems, loggedIn } = useSelector(state => state.cartReducer);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { productid } = useParams();

  async function getData() {
    try {
      setLoading(true)
      const getProductsFromFirebase = await []
      db.collection('Products').get().then(snapshot => {
        snapshot.forEach(product => {
          getProductsFromFirebase.push({ ...product.data() })
          if (getProductsFromFirebase != []) {
            var filterProd = getProductsFromFirebase.filter((val) => val.productId == productid);
            setProduct(filterProd)
          }
          setLoading(false)
        })
      })
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems))
  }, [cartitems])

  const addToCart = (product) => {
    var newArry = [...cartitems];
    if (loggedIn == true) {
      var arry = {
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        productQuantity: quantity,
        originalPrice: product.originalPrice,
        profit: product.profit,
        productId: product.productId
      }
      newArry.push(arry)
      { product.productQuantity == 0 || arry.productQuantity == 0 ? toast.warn("Please select the product quantity!") : dispatch({ type: 'ADD_TO_CART', payload: newArry }, toast.success(`${product.productName} added to cart`)); }
    } else {
      navigate('/weblogin')
    }
  }

  const handleBuyNow = () => {
    navigate('/checkOut')
  }

  const handleDec = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1, { setDisabled: true });

    }
  }
  const handleInc = () => {
    setQuantity(quantity + 1)
  }
  return (
    <Layout>
      <Container fluid="md">
        <div className='productInfo-container' >
          {loading && (<Loader />)}
          <div className='backward-link'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <ArrowBackIcon style={{ fill: 'gray' }} />
              <span className='backward-link-text'>Back to Home</span>
            </Link>
          </div>
          {
            product.map((product, index) => {
              return (
                <div key={index}>
                  <div className="container my-5">
                    <div className="card row flex-row">
                      <img className="col-lg-4 card-img-start img-fluid p-0 pro-img" src={product.productImg} />
                      <div className="col-lg-8 card-body">
                        <h1 className="card-title">{product.productName}</h1>
                        <p className='card-price' style={{ fontWeight: 'bold'}}>Rs. {product.productPrice}/Kg</p>
                        <p className="card-text">{product.productDescription}</p>

                        <div className="free-shipping">
                          <span>Free Home Delivery in Karachi</span>
                        </div>

                        <ul>
                          <li>Delivery Time 24 Hours.</li>
                        </ul>

                        <div className='product-quantity'>
                          <button onClick={() => handleDec()} style={{fontSize: '20px', fontWeight: 'bold'}}>-</button>
                          <div className='count' style={{fontSize: '20px', fontWeight: 'bold'}}>{quantity}</div>
                          <button onClick={() => handleInc()} style={{fontSize: '20px', fontWeight: 'bold'}}>+</button>
                        </div>
                        <div className='BtnWrapper'>
                          <div className="buyContainer"><Button variant="contained" onClick={handleBuyNow} className="buyBtn">Buy Now</Button></div>
                          <div className="addContainer"><Button variant="contained" onClick={() => addToCart(product)} className="addBtn">Add to Cart</Button></div>
                        </div>

                        <div className='service'>
                          <Link to='/contactpage' className='provider-service' style={{color: '#555'}}>Ask question?</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Container>
    </Layout>
  )
}

export default ProductInfo;