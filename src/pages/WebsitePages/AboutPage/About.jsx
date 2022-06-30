import React from 'react'
import { Divider, Grid, Card,CardMedia, Typography } from '@mui/material';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './About.css'

const About = () => {

  return (
    <Layout>
    <div className='about-content'>
      <Grid container spacing={2} columns={12} className='gridStyle'>
        <Grid item xs={12} sm={6}>
          <Divider textAlign='left'>
            <Typography variant='h6' gutterBottom component='div'>About Khaas DryFruits</Typography>
          </Divider>
            <p className='stylePar'>Khaas DryFruits are Fresh Tasty and Best Quality to deliver all over Karachi. Our Dry Fruits are highly selected by QC staff.
            <br/>
            It's easy to order from Khaas Dry Fruits website, best in price, perfect in taste. We have best range of Dry Fruits avaiable in market.
            <br/>
            Khaas DryFruits is a best store to buy Dry Fruits in Karachi. Fast deliveries, top customer support, are the reason customers buy from <b>www.khaasdryfruits.com</b> 
            Buy Dry Fruits products in low prices in Karachi
            </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              image="https://www.khandryfruit.com/wp-content/uploads/2021/08/About-Us-Images-01.jpg"
              style={{ height: '550px' }}
            />
          </Card>

        </Grid>
      </Grid>
    </div>
    </Layout>
  )
}

export default About
