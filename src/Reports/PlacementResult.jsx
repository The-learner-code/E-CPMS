// Importing the styles for the notification component
import '../SassyCSS/placementresult.scss';

import React, { useEffect, useState } from 'react';

// Importing the Sidebar component which likely contains navigation links or other sidebar content
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing the Navbar component which likely contains the top navigation bar content
import Navbar from '../Components/navbar/Navbar';

import BarChart1 from '../Reports/BarChart1';
import PlacedStudentsChart from '../Reports/PlacedStudentsChart';
import { fetchPlacedStudents, generateReports } from '../Reports/dataService';

const PlacementResult = () => {
  const [dataByBatch, setDataByBatch] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placedStudents = await fetchPlacedStudents();
        const reports = generateReports(placedStudents);
        setDataByBatch(reports.byBatch);
      } catch (error) {
        console.error('Error fetching data:', error.message || error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="PlacementResult">
      <Sidebar />
      <div className="PlacementResultContainer">
        <Navbar />
        <div className="GraphContainer">
            <div className="left">
              <BarChart1 dataByBatch={dataByBatch} />
              <PlacedStudentsChart />
            </div>
          </div>
      </div>
    </div>
  );
};

export default PlacementResult;


/*<div className="Left">
          <PieChart dataByCompany={dataByCompany} />
        </div>*/