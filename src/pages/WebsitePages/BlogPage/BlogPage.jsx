import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { Divider, Grid, Card, CardMedia, Typography } from '@mui/material';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';

import './blogPage.css'


const BlogPage = () => {

    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFirebaseData();
    }, [])

    // callIng data from dataBase
    async function getFirebaseData() {
        try {
            setLoading(true)
            const getBlogDataFromFirebase = [];
            db.collection('blogs').get().then(snapshot => {
                snapshot.forEach(blogData => {
                    getBlogDataFromFirebase.push({ ...blogData.data() })
                    setLoading(false)
                })
                setBlogData(getBlogDataFromFirebase);
            })
        }
        catch (error) {
            setLoading(false);
        }
    }


    return (
        <Layout>
            {blogData.map((data, index) => (
                <Grid className='main-grid'>
                    <Grid
                        key={index}
                        container
                        spacing={2}
                        columns={12}
                        className='grid-style'>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardMedia
                                    image={data.blogImg}
                                    style={{ height: '550px' }}
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Divider textAlign='center'>
                                <Typography variant='h6' gutterBottom component='div'>{data.productName}</Typography>
                            </Divider>
                            <p className='productDescription'>
                                {data.productDescription}
                            </p>
                        </Grid>
                    </Grid>
                </Grid>

            ))}
        </Layout>
    )
}

export default BlogPage;

