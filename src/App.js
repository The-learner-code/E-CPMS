import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App