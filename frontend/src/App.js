import "./App.css";
import React, { useEffect, useRef } from "react";
import { axiosInstance } from "./axios.config";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/features/userSlice";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import Teleconsulting from "./components/Teleconsulting/Teleconsulting";
import Forum from "./components/DiseaseDetection/Forum";
// import GoogleTranslate from "./components/GoogleTranslate";
import LoadingBar from "react-top-loading-bar";
import "./components/i18n/i18n";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    axiosInstance
      .get("/auth/account")
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            {user ? <Route path="/forum" element={<Forum />} /> : <></>}
            <Route path="/teleconsulting" element={<Teleconsulting />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
