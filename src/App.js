import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './redux/feature/auth/authService';
import { SET_LOGIN } from './redux/feature/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/auth/Register';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Forget from './pages/auth/Forget';
import Reset from './pages/auth/Reset';
import Sidebar from './components/Sidebar/Sidebar';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      //  const status = await getLoginStatus();
      dispatch(SET_LOGIN(true));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />
        <Route
          path='/dashboard'
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path='/add-product'
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
