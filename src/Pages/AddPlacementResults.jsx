import '../SassyCSS/placementresults.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components//sidebar/Staff_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import Table from '../Components/tables/PlacementResults';

const AddPlacementResults = () => {
  const navigate = useNavigate();
  return (
    <div className='result'>
      <Sidebar />
      <div className="placementresultcontainer">
        <Navbar />
        <div className="addresult">
          <button onClick={() => navigate('/BatchEntryForm')}>Update Results</button>
        </div>
        <div className="listcontainer">
          <div className="list-title">Placement Results...!</div>
          <Table />
        </div>
      </div>
    </div>

  )
}

export default AddPlacementResults