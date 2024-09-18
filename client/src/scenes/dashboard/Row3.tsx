import { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeader from '../../components/BoxHeader';
import FlexBetween from '../../components/FlexBetween';
import { PieChart, Pie, Cell } from 'recharts';


const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData && kpiData[0] && kpiData[0].expensesByCategory){
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            }
          ]
        }
      )
    }
    return []
  }, [kpiData])


  return (
    <>
        <DashboardBox gridArea="g">
          <BoxHeader title='List of Products' sideText={`${productData?.length} products`} />
          <Box mt='0.5rem' p='0 0.5rem' height='75%' 
                sx={{ 
                  "& .MuiDataGrid-root": { color: palette.grey[300], border: 'none' }, 
                  "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[900]} !important`}, 
                  "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[900]} !important`}, 
                  "& .MuiDataGrid-columnSeparator": { visibility: 'hidden'}, 
                }} 
          >
            <DataGrid  
              columnHeaderHeight={25}
              rowHeight={25}
              hideFooter={true}
              rows={productData || []}
              columns={
                [
                  { field: '_id', headerName: 'ID', flex: 1 },
                  { field: 'expense', headerName: 'Expense', flex: 0.5, renderCell: (params: GridCellParams) => `₹${params.value}` },
                  { field: 'price', headerName: 'Price', flex: 0.5, renderCell: (params: GridCellParams) => `₹${params.value}` }
                ]
              }
            />
          </Box>
        </DashboardBox>

        <DashboardBox gridArea="h">
          <BoxHeader title='List of Latest Transactions' sideText={`${transactionData?.length} latest transactions`} />
          <Box mt='0.5rem' p='0 0.5rem' height='75%' 
                sx={{ 
                  "& .MuiDataGrid-root": { color: palette.grey[300], border: 'none' }, 
                  "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[900]} !important`}, 
                  "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[900]} !important`}, 
                  "& .MuiDataGrid-columnSeparator": { visibility: 'hidden'}, 
                }} 
          >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={25}
              hideFooter={true}
              rows={transactionData || []}
              columns={
                [
                  { field: '_id', headerName: 'ID', flex: 1 },
                  { field: 'buyer', headerName: 'Buyer', flex: 0.7},
                  { field: 'amount', headerName: 'Amount', flex: 0.4, renderCell: (params: GridCellParams) => `₹${params.value}` },
                  { field: 'productIds', headerName: 'Count', flex: 0.2, renderCell: (params: GridCellParams) => (params.value as Array<string>).length },
                ]
              }
            />
          </Box>
        </DashboardBox>

        <DashboardBox gridArea="i">
          <BoxHeader title='Expense Breakdown by Category' sideText='+4%' />
          <FlexBetween mt="0.7rem" p='0 1rem' gap='0.5rem' textAlign='center'>
            {pieChartData.map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={90} height={70}>
                  <Pie data={data} dataKey="value" innerRadius={15} outerRadius={30} stroke='none' paddingAngle={2}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${entry}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant='h5'>{data[0].name}</Typography>
              </Box>
            ))}
          </FlexBetween>
        </DashboardBox>

        <DashboardBox gridArea="j">
          <BoxHeader title='Overall Summary and Explanation Data' sideText='+15%' />
          <Box height='15px' margin='1.25rem 1rem 0.4rem 1rem' bgcolor={palette.primary[800]} borderRadius='1rem'>
            <Box height='15px' width='40%' bgcolor={palette.primary[600]} borderRadius='1rem'></Box>
          </Box>
          <Typography variant='h6' margin='0 1rem'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus vitae illo quibusdam expedita quaerat repellendus vel. 
            Vero sint nostrum commodi! Et at placeat assumenda. Ducimus.
          </Typography>
        </DashboardBox>
    </>
  )
}

export default Row3