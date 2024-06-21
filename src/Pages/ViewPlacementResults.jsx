import Sidebar from '../Components/sidebar/Stu_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import Table from '../Components/tables/ViewResults';
import '../SassyCSS/viewplacementresults.scss';

const StuPlacementRes = () => {
  return (
    <div className='result'>
      <Sidebar />
      <div className="placementresultcontainer">
        <Navbar />
        <div className="listcontainer">
          <div className="list-title">Results, Here you go..!</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default StuPlacementRes