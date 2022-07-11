import { React, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../config/firebase';
import "./normalChart.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {name: "January", total: 1200},
    {name: "February", total: 900},
    {name: "March", total: 1400},
    {name: "April", total: 700},
    {name: "May", total: 1100},
    {name: "June", total: 400},
]
const NormalChart = ({aspect, title}) => {
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
                <CartesianGrid strokeDasharray="3 3" className='grid' />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
            </AreaChart>
            </ResponsiveContainer>

        </div>
    );
}

export default NormalChart;



// const NormalChart = ({ profit }) => {

//     const [cash, setCash] = useState(0);

//     const getAmountId = () => {
//         let date = new Date();
//         const day = date.getDate();
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();

//         const id = `${day}${month}${year}`;
//         return (id.concat(Math.floor(Math.random() * 100)));
//     }

//     const [amountId, setAmountId] = useState(getAmountId);

//     const cashHandler = (e) => {
//             const getBalance = profit - cash;
//         e.preventDefault();

//         try {
//             db.collection('balanceAmount').doc(amountId).set({
//                 getBalance
//             }).then(() => {
//                 setCash("");
//                 toast.success('Successfully Cash Received!');
//             })
//         }
//         catch (error) {
//             toast.error('Failed!');
//         };
//     }

//     return (
//         <form onSubmit={cashHandler}>
//             <div>
//                 <div>
//                     <label>Profit</label>
//                     <input type="number" value={profit} disabled />
//                 </div>

//                 <div>
//                     <label>Balance</label>
//                     <input type="number" placeholder="Balance" value={cash} onChange={e => setCash(e.target.value)} />
//                 </div>

//                 <button type="submit">Click</button>
//             </div>
//         </form>
//     );
// }

// export default NormalChart;