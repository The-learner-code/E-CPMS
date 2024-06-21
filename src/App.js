import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import LoginAndRegister from './Pages/Login_Register';
import ViewProfile from './Pages/ViewProfile';
import UpdateProfile from './Pages/UpdateProfile';
import ViewPlacementResults from './Pages/ViewPlacementResults';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App