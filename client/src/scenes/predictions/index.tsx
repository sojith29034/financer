import { Box, Button, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { useGetKpisQuery } from '../../state/api';
import DashboardBox from '../../components/DashboardBox';
import FlexBetween from '../../components/FlexBetween';
import regression, { DataPoint } from 'regression'

import { 
    ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Legend, Line, Tooltip, Label 
} from 'recharts';


const Predictions = () => {
    const { palette } = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);

    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if(!kpiData) return [];

        const monthData = kpiData[0].monthlyData;

        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue]
            }
        );
        const regressionLine = regression.linear(formatted);

        return monthData.map(({ month, revenue }, i: number) => {
            return{
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i+12)[1],
            }
        })
    }, [kpiData])


    return (
        <DashboardBox width='100%' height='100%' p='1rem' overflow='hidden'>
            <FlexBetween m='1rem 2.5rem' gap='0.3rem'>
                <Box>
                    <Typography variant='h3'>Revenue and Predictions</Typography>
                    <Typography variant='h6'>Simple Linear Regression Model - Revenue and Predictions</Typography>
                </Box>
                <Button onClick={() => setIsPredictions(!isPredictions)} 
                        sx={{color: palette.grey[100], bgcolor: palette.grey[900], boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)'}}>
                    Show Predicted Revenue for next year
                </Button>
            </FlexBetween>
            
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}
                        margin={{ top: 20, right: 75, left: 20, bottom: 80 }}>
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} >
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[12000, 26000]} tickFormatter={(v) => `₹${v}`} style={{ fontSize: "10px" }} axisLine={{strokeWidth: '0'}} >
                        <Label value="Revenue" angle={-90} offset={-5} position="insideLeft" />
                    </YAxis>
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign='top' />
                    <Line type="monotone" dot={{ strokeWidth: 5 }} dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} />
                    <Line type="monotone" dot={false} dataKey="Regression Line" stroke="#8884d8" />

                    { isPredictions && (
                        <Line strokeDasharray='5 5' dataKey="Predicted Revenue" stroke={palette.secondary[500]} />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predictions