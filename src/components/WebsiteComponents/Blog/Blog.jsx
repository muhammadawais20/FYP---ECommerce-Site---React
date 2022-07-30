import * as React from 'react';
import { db } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Loader from '../../../components/WebsiteComponents/Loader/Loader';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Blog() {
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
        <div className='card-container'>
            <div className='cardwrapper'>
                <div className="container section-title-container">
                    <h2 className="section-title section-title-center">
                        <b className='line'></b><span className="section-title-main" style={{ fontSize: '97%' }}><StarBorderIcon /> Blogs <StarBorderIcon /></span><b className='line'></b>
                    </h2>
                </div>

                {loading && (<Loader />)}

                {blogData.map((data, index) => (
                     <Card key={index}
                        onClick={() => { navigate("/blogs") }}
                        sx={{ maxWidth: 345, marginBottom: 2, border: '1px solid #4b2627', cursor: 'pointer' }}
                        hoverable
                    >
                        <CardHeader
                            title={data.productName}
                            subheader={data.blogDate}
                            sx={{ backgroundColor: '#994d4f' }}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={data.blogImg}
                            alt="blog Img"
                        />
                        <CardContent>
                            <Typography variant="body2" color={'#502d2e'}>
                                {data.productIntro}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
