import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import LoginAndRegister from './Pages/Login_Register';
import ViewProfile from './Pages/ViewProfile';
import UpdateProfile from './Pages/UpdateProfile';
import ViewPlacementResults from './Pages/ViewPlacementResults';
import ViewNotificationMsg from './Pages/ViewNotificationMsg';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App