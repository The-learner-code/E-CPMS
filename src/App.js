import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import LoginAndRegister from './Pages/Login_Register';
import ViewProfile from './Pages/ViewProfile';
import UpdateProfile from './Pages/UpdateProfile';
import ViewPlacementResults from './Pages/ViewPlacementResults';
import ViewNotificationMsg from './Pages/ViewNotificationMsg';
import ListOfStudents from './Pages/ListOfStudents';
import BatchEntryForm from './Pages/BatchEntryForm';
import AddPlacementResults from './Pages/AddPlacementResults';
import MsgEntryForm from './Pages/MsgEntryForm';
import AddNotification from './Pages/AddNotification';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/LoginAndRegister' element={<LoginAndRegister />} />
          <Route path='/ViewProfile' element={<ViewProfile />} />
          <Route path='/UpdateProfile' element={<UpdateProfile />} />
          <Route path='/ViewPlacementResults' element={<ViewPlacementResults />} />
          <Route path='/ViewNotificationMsg' element={<ViewNotificationMsg />} />
          <Route path='/ListOfStudents' element={<ListOfStudents />} />
          <Route path='/BatchEntryForm' element={<BatchEntryForm />} />
          <Route path='/AddPlacementResults' element={<AddPlacementResults />} />
          <Route path='/MsgEntryForm' element={<MsgEntryForm />} />
          <Route path='/AddNotification' element={<AddNotification />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App