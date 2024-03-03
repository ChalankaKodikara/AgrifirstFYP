import React, { useState, useRef, useEffect } from 'react';
import { axiosInstance } from './axios.config';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/features/userSlice';
import Home from './components/Home/Home';
// import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Footer from './components/Footer/Footer';
import Forum from './components/DiseaseDetection/Forum';
import LoadingBar from 'react-top-loading-bar';
import './components/i18n/i18n';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    axiosInstance
      .get('/api/auth/account')  // Assuming your Express API is under /api
      .then((response) => {
        console.log(response.data.user);
        dispatch(login(response.data.user));
        ref.current.complete();
      })
      .catch((error) => {
        console.log(error);
        ref.current.complete();
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingBar color="#22E089" ref={ref} height="3px" />

      <div className="flex flex-grow">
        <div className="col p-0 m-0 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/dashbord" element={<Dashboard/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
