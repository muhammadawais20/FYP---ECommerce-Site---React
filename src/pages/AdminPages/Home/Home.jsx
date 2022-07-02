import React from "react";
import FeaturedChart from "../../../components/AdminComponents/FeaturedChart/FeaturedChart";
import Navbar from "../../../components/AdminComponents/Navbar/Navbar";
import NormalChart from "../../../components/AdminComponents/NormalChart/NormalChart";
import Sidebar from "../../../components/AdminComponents/Sidebar/Sidebar";
import DetailsTable from "../../../components/AdminComponents/DetailsTable/DetailsTable";
import Widgets from "../../../components/AdminComponents/Widgets/Widgets";
import './home.scss';
import { Grid } from "@mui/material";


const Home = () => {
    return (
        <Grid>
            <div className="home">
                <Sidebar />

                <div className="homeContainer">
                    <Navbar />

                    <div className="widgets">
                        <Widgets type="customers" path="/customers" />
                        <Widgets type="orders" path="/orders" />
                        <Widgets type="earnings" path="/" />
                        <Widgets type="balance" path="/" />
                    </div>

                    <div className="charts">
                        <FeaturedChart />
                        <NormalChart
                         aspect={2 / 1} title="Revenue of Last 6 Months" />
                    </div>

                    <div className="listContainer">
                        <div className="listTitle">Previous Transactions</div>
                        <DetailsTable />
                    </div>
                </div>
            </div>
        </Grid>
    );
}

export default Home;