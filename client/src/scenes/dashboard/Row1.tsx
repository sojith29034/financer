import { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import BoxHeader from '../../components/BoxHeader'
import { useGetKpisQuery } from '../../state/api'
import { useTheme } from '@mui/material'

import { 
    AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, Line, Legend, LineChart, Bar, BarChart
} from 'recharts'

const Row1 = () => {
    const { palette } = useTheme();

    const { data } = useGetKpisQuery();
    console.log('data:', data);

    const revenueExpenses = useMemo(() => {
        return(
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                Revenue: revenue,
                Expenses: expenses,
            }))
        )
    }, [data])

    const revenueProfit = useMemo(() => {
        return(
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                Revenue: revenue,
                Profit: (revenue - expenses).toFixed(2),
            }))
        )
    }, [data])

    const revenue = useMemo(() => {
        return(
            data &&
            data[0].monthlyData.map(({ month, revenue }) => ({
                name: month.substring(0, 3),
                Revenue: revenue,
            }))
        )
    }, [data])


    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader title='Profit and Revenue' subtitle='Monthly Overview' sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={730} height={250} data={revenueExpenses}
                                margin={{ top: 20, right: 20, left: -10, bottom: 55 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis tickLine={false} style={{ fontSize: "10px" }} axisLine={{ strokeWidth: "0" }} domain={[8000, 23000]} />
                        <Tooltip />
                        <Area type="monotone" dot={true} dataKey="Revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dot={true} dataKey="Expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>


            <DashboardBox gridArea="b">
                <BoxHeader title='Revenue and Expenses' subtitle='Monthly Overview' sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueProfit}
                            margin={{ top: 15, right: 25, left: -10, bottom: 60 }}>
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" tickLine={false} style={{ fontSize: "10px" }} axisLine={false} />
                        <YAxis yAxisId="right" orientation='right' tickLine={false} style={{ fontSize: "10px" }} axisLine={false} />
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />
                        <Tooltip />
                        {/* <Legend height={20} wrapperStyle={{margin: '0 0 10px 0'}} /> */}
                        <Legend />
                        <Line yAxisId="left" type="monotone" dot={true} dataKey="Profit" stroke={palette.tertiary[500]} />
                        <Line yAxisId="right" type="monotone" dot={true} dataKey="Revenue" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>


            <DashboardBox gridArea="c">
                <BoxHeader title='Monthly Revenue' subtitle='Monthly Overview' sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={730} height={250} data={revenue}
                                margin={{ top: 17, right: 15, left: -5, bottom: 58 }}>
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Bar dataKey="Revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row1