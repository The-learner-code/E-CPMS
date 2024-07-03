import React from 'react';
// Importing Bar component from react-chartjs-2 for bar charts
import { Bar } from 'react-chartjs-2';
// Importing Grid, Paper, Typography components from MUI for layout and styling
import { Grid, Paper, Typography } from '@mui/material';
// Importing necessary components from chart.js
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Importing ChartDataLabels plugin for displaying data labels on the chart
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Importing custom stylesheet for chart
import './chart.scss';

// Registering chart.js components and plugins
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart1 = ({ dataByBatch }) => {
  // Preparing data for the chart
  const chartDataByBatch = {
    // X-axis labels (batches)
    labels: Object.keys(dataByBatch),
    // Y-axis data (number of students placed)
    datasets: [
      {
        label: 'Students Placed',
        data: Object.values(dataByBatch),
        // Bar color settings
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart configuration options
  const options = {
    indexAxis: 'x', // Use 'x' for categorical labels on x-axis
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Positioning the legend at the top
      },
      datalabels: {
        // Formatting data labels to show percentage
        formatter: (value, context) => {
          const chartData = context.dataset.data;
          const total = chartData.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: 'black', // Color of the data labels
        align: 'end', // Aligning data labels at the end of the bars
        anchor: 'start', // Anchoring data labels at the start of the bars
        labels: {
          title: {
            font: {
              weight: 'bold', // Making the data label text bold
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Starting the y-axis at zero
        title: {
          display: true,
          text: 'Number of Students', // Title for the y-axis
        },
      },
    },
  };

  return (
    // Using Grid container for layout
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
