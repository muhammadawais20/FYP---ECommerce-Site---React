import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './ProductInfo.css'


const ProductInfo = () => {

  const { cartitems, loggedIn } = useSelector(state => state.cartReducer);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
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
    localStorage.setItem('cartitems', JSON.stringify(cartitems))
  }, [cartitems])
  const addToCart = (product) => {
    if (loggedIn == true) {
      var arry = {
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        productQuntity: quantity,
      }
      { product.productQuantity == 0 ? alert("Product is out of Stock") : dispatch({ type: 'ADD_TO_CART', payload: product }, toast.success(`${product.productName} added to cart`)); }
    } else {
      navigate('/weblogin')
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDec = () => {
    setQuantity(quantity - 1)
  }
  const handleInc = () => {
    setQuantity(quantity + 1)
  }
  return (
    <Layout>
      <Container fluid="md">
        <div className='productInfo-container'>
          {loading && (<Loader />)}
          {
            product.map((product, index) => {
              return (
                <>
                  <div className="container my-5" key={index}>
                    <div className="card row flex-row">
                      <img className="col-lg-4 card-img-start img-fluid p-0 pro-img" src={product.productImg} />
                      <div className="col-lg-8 card-body">
                        <h1 className="card-title">{product.productName}</h1>
                        <p className='card-price'>Rs: {product.productPrice}</p>
                        <p className="card-text">{product.productDescription}</p>

                        <div className="free-shipping">
                          <span>Free Home Delivery in Pakistan</span>
                        </div>

                        <ul>
                          <li>Product Code 240736</li>
                          <li>
                            Availability In Stock</li>
                          <li>Delivery Time 3-5 Days</li>
                        </ul>
                        <div className='item-counter-container'>
                          <div onClick={() => handleDec()} className='item-counter-child1'>-</div>
                          <div className='item-counter-child2' style={{ alignSelf: 'center' }}>{quantity}</div>
                          <div onClick={() => handleInc()} className='item-counter-child3'>+</div>
                        </div>
                        <div className="btnWrapper">
                          <button
                            type="submit"
                            className="buyBtn"
                            variant="contained"
                          >
                            BuyNow
                          </button>
                          <button
                            type="submit"
                            className='addBtn'
                            variant="contained"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div>
                          <a href='' className='provider-service'>Ask question</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </Container>
    </Layout>
  )
}

export default ProductInfo

