import React from 'react';
import { Card, CardContent, Grid, Typography, Link } from '@mui/material';
import Layout from '../../../components/WebsiteComponents/Layout/Layout';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <Layout>
            <div className='contact-container'>
                <Grid className='header-Style'>
                    <Typography>Privacy Policy</Typography>
                </Grid>
                <Card variant="outlined" sx={{ width: '75%' }} className="cardStyle">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            KhaasDryFruits.com respects your privacy.
                            This privacy policy provides succinctly the manner your data is collected and used by KhaasDryFruits.com on the site.
                            As a visitor to the site/ customer you are advised to please read the privacy policy carefully.
                            By accessing the services provided by the site you agree to the collection and use of your data by KhaasDryFruits.com in the manner provided in this privacy policy
                        </Typography>
                        <Typography variant='h6'>
                            INFORMATION THAT WE GATHERED
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            We may gather different snippets of data on the off chance that you try to submit a request for an item with us on the Site.
                            <br />
                            We gather, store and procedure your information for preparing your purchase on the Site and any conceivable later claims, and to furnish you with the services we provided. We may gather individual data including, yet not constrained to, your title, name, gender, date of birth, email address, postal location, delivery address, mobile number, fax number.
                            <br />
                            We will utilize the data you give to enable us to process your requests and to give you the administrations and data offered through our site and which you demand. Further, we will utilize the data you furnish to control your record with us; check and do budgetary exchanges in connection to installments you make; review the downloading of information from our site; improve the format as well as substance of the pages of our site and redo them for clients; recognize visitors on our site; complete research on our clients’ demographics; send you data we figure you may discover helpful or which you have mentioned from us, including data about our items and administrations, if you have shown that you have not questioned being reached for these reasons. Subject to acquiring your assent we may reach you by email with detail of different services and products. On the off chance that you incline toward not to get any advertising correspondences from us, you can opt out at any time.
                            <br />
                            We may pass your name and address to the third party in order to deliver the product to the customers. You should just submit to us the Site data which is precise and not misdirecting and you should stay connected with us in order to have some changes.
                            <br />
                            Your order detail might be put away with us yet for security reasons can’t be recovered straightforwardly by us. Be that as it may, you may get to this data by signing into your record on the Site. We can’t accept any risk for abuse of passwords except if this abuse is our flaw.

                        </Typography>
                        <Typography variant='h6'>
                            WITH WHOM YOUR INFORMATION WILL BE SHARED?
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            KhaasDryFruits.com does not rent, sell or share your personal information and will not disclose any of your personally identifiable information to third parties.
                            In cases where it has your permission to provide products or services you’ve requested and such information is necessary to provide these products or services the information may be shared with KhaasDryFruits.com’s business associates and partners.
                            KhaasDryFruits.com may, however, share anonymize consumer information on an aggregate with its partners or third parties where it deems necessary. In addition KhaasDryFruits.com may use this information, to help investigate, prevent or take action regarding unlawful and illegal activities, suspected fraud, potential threat to the safety or security of any person, violations of the site’s terms of use or to defend against legal claims; special circumstances such as compliance with subpoenas, court orders, requests/order from legal authorities or law enforcement agencies requiring such disclosure.
                        </Typography>
                        <Typography variant='h6'>
                            POLICY UPDATES
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            KhaasDryFruits.com reserves the right to change or update this policy at any time. Such changes shall be effective immediately upon posting to the site.
                        </Typography>
                        <Typography variant='h6'>
                            CONTACT INFORMATION
                        </Typography>
                        <Link href="#" underline="none">
                            <Typography sx={{ fontSize: 14 }} color='black' gutterBottom>
                                <b>info@khaasDryFruits.com</b>
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
