import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './pages/userPages/RegistrationPage';
import React from 'react';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration/>}/>
          <Route path='/hi' element={<Registration/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
