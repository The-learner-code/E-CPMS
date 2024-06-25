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
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <div>
      <AuthProvider>
        {/* Using BrowserRouter for setting up routing */}
        <BrowserRouter>
          <Routes>
            {/* Define routes for different pages */}
            <Route path='/' element={<Home />} />  {/* Route for Home page */}
            <Route path='/LoginAndRegister' element={<LoginAndRegister />} />  {/* Route for LoginAndRegister page */}
            <Route path='/ViewProfile' element={<PrivateRoute element={<ViewProfile />} />} />  {/* Route for ViewProfile page */}
            <Route path='/UpdateProfile' element={<PrivateRoute element={<UpdateProfile />} />} />  {/* Route for UpdateProfile page */}
            <Route path='/ViewPlacementResults' element={<PrivateRoute element={<ViewPlacementResults />} />} />  {/* Route for ViewPlacementResults page */}
            <Route path='/ViewNotificationMsg' element={<PrivateRoute element={<ViewNotificationMsg />} />} />  {/* Route for ViewNotificationMsg page */}
            <Route path='/ListOfStudents' element={<PrivateRoute element={<ListOfStudents />} />} />  {/* Route for ListOfStudents page */}
            <Route path='/BatchEntryForm' element={<PrivateRoute element={<BatchEntryForm />} />} />  {/* Route for BatchEntryForm page */}
            <Route path='/AddPlacementResults' element={<PrivateRoute element={<AddPlacementResults />} />} />  {/* Route for AddPlacementResults page */}
            <Route path='/MsgEntryForm' element={<PrivateRoute element={<MsgEntryForm />} />} />  {/* Route for MsgEntryForm page */}
            <Route path='/AddNotification' element={<PrivateRoute element={<AddNotification />} />} />  {/* Route for AddNotification page */}
            <Route path='/ListOfUsers' element={<PrivateRoute element={<ListOfUsers />} />} /> {/* Route for ListOfUsers page */}
            <Route path='/TechSupport' element={<PrivateRoute element={<TechSupport />} />} /> {/* Route for TechSupport page */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
