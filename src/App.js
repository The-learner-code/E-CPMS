import { toastContainer } from './toastservice'; // Correct import for ToastContainer
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Importing necessary components from react-router-dom
import Home from './Pages/HomePage';  // Importing the Home component
import LoginAndRegister from './Pages/Login_Register';  // Importing the LoginAndRegister component
import ViewProfile from './Pages/ViewProfile';  // Importing the ViewProfile component
import UpdateProfile from './Pages/UpdateProfile';  // Importing the UpdateProfile component
import ViewPlacementResults from './Pages/ViewPlacementResults';  // Importing the ViewPlacementResults component
import ViewNotificationMsg from './Pages/ViewNotificationMsg';  // Importing the ViewNotificationMsg component
import ListOfStudents from './Pages/ListOfStudents';  // Importing the ListOfStudents component
import BatchEntryForm from './Pages/BatchEntryForm';  // Importing the BatchEntryForm component
import AddPlacementResults from './Pages/AddPlacementResults';  // Importing the AddPlacementResults component
import MsgEntryForm from './Pages/MsgEntryForm';  // Importing the MsgEntryForm component
import AddNotification from './Pages/AddNotification';  // Importing the AddNotification component
import ListOfUsers from './Pages/ListOfUsers'; // Importing the ListOfUsers component
import TechSupport from './Pages/TechSupport'; // Importing the TechSupport component
import PlacementResult from './Reports/PlacementResult'; // Importing the PlacementResult component
import PlacementResultPie from './Reports/PlacementResultPie'; // Importing the PlacementResultPie component
import AddNotificationAdmin from './Pages/AddNotificationAdmin'; // Importing the AddNotificationAdmin component
import MsgEntryFormAdmin from './Pages/MsgEntryFormAdmin';  // Importing the MsgEntryForm component


const App = () => {
  return (
    <div>
      {toastContainer}
      {/* Using BrowserRouter for setting up routing */}
      <BrowserRouter>
        <Routes>
          {/* Define routes for different pages */}
          <Route path='/' element={<Home />} />  {/* Route for Home page */}
          <Route path='/LoginAndRegister' element={<LoginAndRegister />} />  {/* Route for LoginAndRegister page */}
          <Route path='/ViewProfile' element={<ViewProfile />} />  {/* Route for ViewProfile page */}
          <Route path='/UpdateProfile' element={<UpdateProfile />} />  {/* Route for UpdateProfile page */}
          <Route path='/ViewPlacementResults' element={<ViewPlacementResults />} />  {/* Route for ViewPlacementResults page */}
          <Route path='/ViewNotificationMsg' element={<ViewNotificationMsg />} />  {/* Route for ViewNotificationMsg page */}
          <Route path='/ListOfStudents' element={<ListOfStudents />} />  {/* Route for ListOfStudents page */}
          <Route path='/BatchEntryForm' element={<BatchEntryForm />} />  {/* Route for BatchEntryForm page */}
          <Route path='/AddPlacementResults' element={<AddPlacementResults />} />  {/* Route for AddPlacementResults page */}
          <Route path='/MsgEntryForm' element={<MsgEntryForm />} />  {/* Route for MsgEntryForm page */}
          <Route path='/AddNotification' element={<AddNotification />} />  {/* Route for AddNotification page */}
          <Route path='/ListOfUsers' element={<ListOfUsers />} /> {/* Route for ListOfUsers page */}
          <Route path='/TechSupport' element={<TechSupport />} /> {/* Route for TechSupport page */}
          <Route path='/Analysis' element={<PlacementResult />} /> {/* Route for PlacementResult page */}
          <Route path='/ComAnalysis' element={<PlacementResultPie />} /> {/* Route for PlacementResultPie page */}
          <Route path='/AddNotificationAdmin' element={<AddNotificationAdmin />} /> {/* Route for AddNotificationAdmin page */}
          <Route path='/MsgEntryFormAdmin' element={<MsgEntryFormAdmin />} />  {/* Route for MsgEntryForm page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
