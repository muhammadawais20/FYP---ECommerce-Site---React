import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import HomeContent from '../../../components/WebsiteComponents/HomeContent/HomeContent';
import HomeBackground from '../../../components/WebsiteComponents/HomeBackGround/HomeBackground';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';
import './HomePage.css'

const Homepages = ({ user }) => {
  const { cartitems, loggedIn } = useSelector(state => state.cartReducer);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { Meta } = Card;

  useEffect(() => {
    getFirebaseData();
  }, [])

  // callIng data from dataBase
  async function getFirebaseData() {
    try {
      setLoading(true)
      const getProductsFromFirebase = [];
      db.collection('Products').get().then(snapshot => {
        snapshot.forEach(product => {
          getProductsFromFirebase.push({ ...product.data() })
          setLoading(false)
        })
        setProducts(getProductsFromFirebase)
      })
    }
    catch (error) {
      setLoading(false)
    }
  }
  // to update local storage
  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems))
  }, [cartitems])

  const addToCart = (product) => {
    console.log("onClick Product => ", product.productQuantity)
    let newArry = [...cartitems]
    if (loggedIn == true) {
      var arry = {
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        productQuantity: 1,
        originalPrice: product.originalPrice,
        profit: product.profit
      }
      newArry.push(arry)
      { product.productQuantity == 0 ? alert("Product is out of Stock") : dispatch({ type: 'ADD_TO_CART', payload: newArry }, toast.success(`${product.productName} added to cart`)); }
    }
    else {
      navigate('/weblogin')
    }
  }
  return (
    <Layout>
      <>
        <HomeBackground />
        <div className='card-container'>
          <div className='cardwrapper'>
            {loading && (<Loader />)}
            {products.map((product, index) => {
              return <Card key={index}
                hoverable
                style={{ width: 240, marginTop: 20 }}
                cover={<img alt="example" src={product.productImg} />}
              >
                <Meta title={product.productName} description={product.productPrice} />
                <div className="additional">
                  <Button
                    style={{ width: '200px', marginTop: '15px' }}
                    variant="contained"
                    onClick={() => { navigate(`/productInfo/${product.productId}`) }}>
                    View
                  </Button>
                  <br />
                  <br />
                  <Button
                    style={{ width: '200px' }}
                    variant="contained"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>

            })
            }
            <HomeContent />
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Homepages
