import React from 'react'
import { Divider, Grid, Card, CardMedia, Typography } from '@mui/material';
import honey from '../../../resources/collages/collage1.png'
import './About.css'

const About = () => {

  return (
    <div > 
        <Grid container spacing={2} columns={12} className='gridStyle'>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                image={honey}
                style={{ height: '550px' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Divider textAlign='center'>
              <Typography variant='h6' gutterBottom component='div'>About Us</Typography>
            </Divider>
            <p className='stylePar'>
              Quality has been our identity and key strength during from the starting of the business. We serve retailers throughout the Karachi. We now wish to bring the same level of quality to your doorsteps at an excellent price.
              <br></br><b>"It is our vision to bring this goodness of health at your doorstep!"</b>
            </p>
          </Grid>
        </Grid>
      </div>
  )
}

export default About;
