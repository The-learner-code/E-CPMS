import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.scss';

ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart1 = ({ dataByBatch }) => {

  const chartDataByBatch = {
    labels: Object.keys(dataByBatch),
    datasets: [
      {
        label: 'Students Placed',
        data: Object.values(dataByBatch),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x', // Use 'x' for categorical labels on x-axis
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        formatter: (value, context) => {
          const chartData = context.dataset.data;
          const total = chartData.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: 'black',
        align: 'end',
        anchor: 'start',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
    },
  };

  return (
    <Grid container className="placement-result-grid">
        <Paper className="placement-result-paper">
          <Typography variant="h6" gutterBottom align="center" paddingBottom={'5px'} paddingTop={'25px'}>
            Batch wise Student Placed %
          </Typography>
          <Bar data={chartDataByBatch} options={options} />
        </Paper>
    </Grid>
  );
};

export default BarChart1;
