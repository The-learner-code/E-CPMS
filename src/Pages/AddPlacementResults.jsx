// Importing the styles for the placement results component
import '../SassyCSS/placementresults.scss';

// Importing the useNavigate hook from react-router-dom to handle navigation
import { useNavigate } from 'react-router-dom';

// Importing the Sidebar component which likely contains navigation links or other sidebar content
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing the Navbar component which likely contains the top navigation bar content
import Navbar from '../Components/navbar/Navbar';

// Importing the Table component to display the placement results
import Table from '../Components/tables/PlacementResults';

const AddPlacementResults = () => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    <div className='result'>
      {/* Sidebar component for the navigation sidebar */}
      <Sidebar />
      
      <div className="placementresultcontainer">
        {/* Navbar component for the top navigation bar */}
        <Navbar />
        
        {/* Button to navigate to the batch entry form */}
        <div className="addresult">
          <button onClick={() => navigate('/BatchEntryForm')}>Update Results</button>
        </div>
        
        {/* Container for the list of placement results */}
        <div className="listcontainer">
          <div className="list-title">Placement Results...!</div>
          {/* Table component to display the placement results */}
          <Table />
        </div>
      </div>
    </div>
  )
}

export default AddPlacementResults;
