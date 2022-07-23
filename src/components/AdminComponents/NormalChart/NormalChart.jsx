import { React, useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import "./normalChart.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NormalChart = ({aspect, title, total1}) => {

    const data = [
    {total: total1[0]},
    {total: total1[1]},
    {total: total1[2]},
    {total: total1[3]},
    {total: total1[4]},
    {total: total1[5]},
    {total: total1[6]},
    {total: total1[7]},
    {total: total1[8]},
    {total: total1[9]},
    {total: total1[10]},
]

    return (
        <div className='normalChart'>
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke='gray' />
                <YAxis dataKey="total" stroke='gray' />
                <CartesianGrid strokeDasharray="3 3" className='grid' />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default NormalChart;