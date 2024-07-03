import React, { useState, useEffect } from 'react';
// Importing Bar component from react-chartjs-2 for bar charts
import { Bar } from 'react-chartjs-2';
// Importing Chart.js and its components
import Chart from 'chart.js/auto';
// Importing Grid, Paper, Typography components from MUI for layout and styling
import { Grid, Paper, Typography } from '@mui/material';
// Importing ChartDataLabels plugin for displaying data labels on the chart
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Importing custom functions to fetch and process data
import { getPlacedStudents, processPlacedStudentsData, getDistinctBatches } from './dataService';
// Importing Select, MenuItem, FormControl, and InputLabel components from MUI for dropdown menu
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// Importing custom stylesheet for chart
import './chart.scss';

// Registering ChartDataLabels plugin
Chart.register(ChartDataLabels);

const PlacedStudentsChart = () => {
    const [batch, setBatch] = useState(''); // State to store selected batch
    const [data, setData] = useState([]); // State to store processed data
    const [batches, setBatches] = useState([]); // State to store distinct batches

    // Fetching distinct batches on component mount
    useEffect(() => {
        const fetchBatches = async () => {
            const distinctBatches = await getDistinctBatches(); // Fetch distinct batches
            setBatches(distinctBatches);
            if (distinctBatches.length > 0) {
                setBatch(distinctBatches[0]); // Set default batch to the first one
            }
        };

        fetchBatches();
    }, []);

    // Fetching placed students data whenever the selected batch changes
    useEffect(() => {
        const fetchData = async () => {
            if (batch) {
                const placedStudents = await getPlacedStudents(); // Fetch placed students data
                const processedData = processPlacedStudentsData(placedStudents, batch); // Process data for the selected batch
                setData(processedData);
            }
        };

        fetchData();
    }, [batch]);

    // Handling batch change from dropdown menu
    const handleBatchChange = (event) => {
        setBatch(event.target.value);
    };

    // Preparing data for the chart
    const chartData = {
        labels: data.map((item) => item.department), // X-axis labels (departments)
        datasets: [
            {
                label: 'Percentage of Placed Students',
                data: data.map((item) => item.percentage), // Y-axis data (placement percentage)
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart configuration options
    const options = {
        plugins: {
            datalabels: {
                display: true,
                align: 'end', // Aligning data labels at the end of the bars
                anchor: 'start', // Anchoring data labels at the start of the bars
                formatter: (value) => `${value}%`, // Formatting data labels to show percentage
                font: {
                    weight: 'bold',
                },
                color: 'black', // Color of the data labels
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Starting the y-axis at zero
                ticks: {
                    callback: (value) => `${value}%`, // Formatting y-axis ticks to show percentage
                },
            },
        },
    };

    return (
        <div>
            <Grid className="placement-result-container">
                <Grid className="placement-result-item">
                    <Paper className="placement-result-paper-batch">
                        <Typography variant="h6" gutterBottom align="center">
                            Batch wise Placement % on Department
                        </Typography>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="batch-select-label">Batch</InputLabel>
                            <Select
                                labelId="batch-select-label"
                                id="batch-select"
                                value={batch}
                                onChange={handleBatchChange}
                                label="Batch"
                            >
                                {batches.map((batchValue) => (
                                    <MenuItem key={batchValue} value={batchValue}>
                                        {batchValue}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Bar data={chartData} options={options} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default PlacedStudentsChart;
