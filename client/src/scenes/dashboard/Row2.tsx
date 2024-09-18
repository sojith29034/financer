import { useMemo }  from 'react'
import DashboardBox from '../../components/DashboardBox'
import BoxHeader from '../../components/BoxHeader'
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api'
import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'

import { 
  ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, PieChart, Pie, Cell,ScatterChart, ZAxis, Scatter
} from 'recharts'

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  // console.log('data:', data);

  const operationalExpenses = useMemo(() => {
    return(
        operationalData &&
        operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => ({
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non-operational Expenses": nonOperationalExpenses,
        }))
    )
  }, [operationalData])

  const productExpenseData = useMemo(() => {
    return(
        productData &&
        productData.map(({ _id, price, expense }) => ({
            id: _id,
            price: price,
            expense: expense,
        }))
    )
  }, [productData])


  
  return (
    <>
        <DashboardBox gridArea="d">          
          <BoxHeader title='Operational vs Non-operational Expenses' sideText='+4%' />
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={operationalExpenses}
                        margin={{ top: 15, right: 25, left: -10, bottom: 60 }}>
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                    <YAxis yAxisId="left" orientation='left' tickLine={false} style={{ fontSize: "10px" }} axisLine={false} />
                    <YAxis yAxisId="right" orientation='right' tickLine={false} style={{ fontSize: "10px" }} axisLine={false} />
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />
                    <Tooltip />
                    <Line yAxisId="left"  type="monotone" dot={true} dataKey="Non-operational Expenses" stroke={palette.tertiary[500]} />
                    <Line yAxisId="right"  type="monotone" dot={true} dataKey="Operational Expenses" stroke={palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="e">
          <BoxHeader title='Campaigns and Targets' sideText='+4%' />
          <FlexBetween mt="0.2rem" pr='1rem' gap='1.5rem'>
            <PieChart width={110} height={100}
                      margin={{ top: 0, right: -10, left: 10, bottom: 0 }}>
              <Pie data={pieData} dataKey="value" innerRadius={18} outerRadius={38} stroke='none' paddingAngle={2}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
            <Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
              <Typography variant="h5">Target Sales</Typography>
              <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
              <Typography variant='h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
            </Box>
            <Box flexBasis='40%'>
              <Typography variant="h5">Loss in Revenue</Typography>
              <Typography variant='h6'>Lorem ipsum dolor sit amet adipisicing elit.</Typography>
              <Typography variant="h5" mt='0.4rem'>Profit Margins</Typography>
              <Typography variant='h6'>Lorem ipsum adipisicing elit.</Typography>
            </Box>
          </FlexBetween>
        </DashboardBox>

        <DashboardBox gridArea="f">
          <BoxHeader title='Product Prices vs Expenses' sideText='+4%' />
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              width={730}
              height={250}
              margin={{
                top: 15,
                right: 30,
                bottom: 40,
                left: -10,
              }}
            >
              <CartesianGrid stroke={palette.grey[800]} />
              <XAxis dataKey="price" type="number" name="Price" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} tickFormatter={(v) => `₹${v}`} />
              <YAxis dataKey="expense" type="number" name="Expense" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} tickFormatter={(v) => `₹${v}`} />
              <ZAxis type='number' range={[20]} />
              <Tooltip formatter={(v) => `₹${v}`} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
            </ScatterChart>
          </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}

export default Row2