import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './pages/userPages/RegistrationPage';
import React from 'react';
import LoginPage from './pages/userPages/LoginPage';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import HomePage from './pages/userPages/HomePage';
import EditPage from './pages/userPages/EditPage';
import AdminLoginPage from './pages/adminPages/AdminLoginPage';
import AdminDashboardPage from './pages/adminPages/AdminDashboardPage';
import RequireAuthLogin from './redux/protect/RequireAuthLogin';
import RequireAuth from './redux/protect/RequireAuth';
import RequireAdminLogin from './redux/protect/RequireAdminLogin';
import RequireAdminAuth from './redux/protect/RequireAdminAuth';
import AdminAddPage from './pages/userPages/AdminAddPage';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <RequireAuthLogin>
              <Registration/>
            </RequireAuthLogin>
            
            }/>
          <Route path='/login' element={
            <RequireAuthLogin>
              <LoginPage/>
            </RequireAuthLogin>
            
            }/>
          <Route path='/home' element={
            <RequireAuth>
              <HomePage/>
            </RequireAuth>
            
            }/>
          <Route path='/edit-profile' element={
            <RequireAuth>
              <EditPage/>
            </RequireAuth>
            
            }/>
          <Route path='/admin/login' element={
            <RequireAdminLogin>
              <AdminLoginPage/>
            </RequireAdminLogin>
            }/>
          <Route path='/admin/dashboard' element= {
            <RequireAdminAuth>
              <AdminDashboardPage/>
            </RequireAdminAuth>

            }/>
            <Route path='/admin/addUser' element={
              <RequireAdminAuth>
                <AdminAddPage/>
              </RequireAdminAuth>
               

            }/>
        </Routes>
      </BrowserRouter>
      </Provider>
      
      
    </div>
  )
}

export default App
