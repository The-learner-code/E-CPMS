import React from 'react';
// Importing Pie component from react-chartjs-2 for pie charts
import { Pie } from 'react-chartjs-2';
// Importing Grid and Paper components from MUI for layout and styling
import { Grid, Paper } from '@mui/material';
// Importing necessary components from chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// Importing ChartDataLabels plugin for displaying data labels on the chart
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Importing custom stylesheet for chart
import './chart.scss';

// Registering chart.js components and plugins
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const PieChart = ({ dataByCompany }) => {
  // Preparing data for the chart
  const chartDataByCompany = {
    // Labels for pie chart segments (company names)
    labels: Object.keys(dataByCompany),
    // Data for pie chart segments (number of students placed)
    datasets: [
      {
        label: 'Students Placed',
        data: Object.values(dataByCompany),
        // Background colors for each segment
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        // Border colors for each segment
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1, // Border width for segments
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true, // Make chart responsive
    plugins: {
      legend: {
        position: 'top', // Positioning the legend at the top
      },
      title: {
        display: true,
        text: 'Students Placed by Company', // Title of the chart
      },
      datalabels: {
        // Formatting data labels to show percentage
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: 'black', // Color of the data labels
        labels: {
          title: {
            font: {
              weight: 'bold', // Making the data label text bold
            },
          },
        },
      },
    },
  };

  return (
    // Using Grid container for layout
    <Grid className="placement-result-item-pie">
      <Paper className="placement-result-paper-pie">
        {/* Uncomment the following lines to add a title above the chart */}
        {/* <Typography variant="h6" gutterBottom align="center" className="placement-result-typography-pie">
          Pie Chart Example
        </Typography> */}
        <Pie data={chartDataByCompany} options={options} />
      </Paper>
    </Grid>
  );
};

export default PieChart;
