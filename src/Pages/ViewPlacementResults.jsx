import Sidebar from '../Components/sidebar/Stu_Sidebar'; /* Sidebar component import */
import Navbar from '../Components/navbar/Navbar'; /* Navbar component import */
import Table from '../Components/tables/ViewResults'; /* Table component import for displaying results */
import '../SassyCSS/placementresults.scss'; /* Custom CSS styles for placement results page */

const ViewPlacementResults = () => {
  return (
    <div className='result'>
      <Sidebar /> {/* Sidebar component */}
      <div className="placementresultcontainer">
        <Navbar /> {/* Navbar component */}
        <div className="listcontainer">
          <div className="list-title">Results, Here you go..!</div> {/* Title for results section */}
          <Table /> {/* Table component for displaying results */}
        </div>
      </div>
    </div>
  );
};

export default ViewPlacementResults;
