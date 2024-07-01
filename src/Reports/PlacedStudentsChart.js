import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Grid, Paper, Typography } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getPlacedStudents, processPlacedStudentsData, getDistinctBatches } from './dataService';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './chart.scss';

Chart.register(ChartDataLabels);

const PlacedStudentsChart = () => {
    const [batch, setBatch] = useState('');
    const [data, setData] = useState([]);
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        const fetchBatches = async () => {
            const distinctBatches = await getDistinctBatches();
            setBatches(distinctBatches);
            if (distinctBatches.length > 0) {
                setBatch(distinctBatches[0]);
            }
        };

        fetchBatches();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (batch) {
                const placedStudents = await getPlacedStudents();
                const processedData = processPlacedStudentsData(placedStudents, batch);
                setData(processedData);
            }
        };

        fetchData();
    }, [batch]);

    const handleBatchChange = (event) => {
        setBatch(event.target.value);
    };

    const chartData = {
        labels: data.map((item) => item.department),
        datasets: [
            {
                label: 'Percentage of Placed Students',
                data: data.map((item) => item.percentage),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                display: true,
                align: 'end',
                anchor: 'start',
                formatter: (value) => `${value}%`,
                font: {
                    weight: 'bold',
                },
                color: 'black',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value}%`,
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
          <FormControl variant="outlined" fullWidth margin="normal" >
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
