import '../SassyCSS/listofusers.scss';
import Sidebar from '../Components/sidebar/Admin_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import Table from '../Components/tables/UserCred';

const ListOfUsers = () => {
  return (
    <div className='usercred'>
      <Sidebar />
      <div className="usercredcontainer">
        <Navbar />
        <div className="listcontainer">
          <div className="list-title">Credentials...!</div>
          <Table />
        </div>
      </div>
    </div>

  )
}

export default ListOfUsers