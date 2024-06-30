import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Grid, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.scss';

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const PieChart = ({ dataByCompany }) => {
  const chartDataByCompany = {
    labels: Object.keys(dataByCompany),
    datasets: [
      {
        label: 'Students Placed',
        data: Object.values(dataByCompany),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Students Placed by Company',
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: 'black',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
        },
      },
    },
  };

  return ( 
    <Grid  className="placement-result-item-pie">
    <Paper className="placement-result-paper-pie">
      <Typography variant="h6" gutterBottom align="center" className="placement-result-typography-pie">
        Pie Chart Example
      </Typography>
      <Pie data={chartDataByCompany} options={options} />
    </Paper>
  </Grid>
   
  );
};

export default PieChart;
