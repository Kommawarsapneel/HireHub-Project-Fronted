import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Homepage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import JobSeekerDashboard from "./Dashboard/JobSeekerDashboard/JobSeekerDashboard";
import RecruiterDashboard from "./Dashboard/RecriterDashboard/RecriterDashboard";
import Navbar from "./Componets/Navbar";
import React from 'react'
export const baseURL="https://hirehub-project-1.onrender.com";
export const App = () => {
  return (
    <Routes>
              <Route element={<Navbar/>}/>
             <Route path="/" element={<Home />} />
             <Route path="/signup" element={<Signup/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/JobSeekerDashboard" element={<JobSeekerDashboard/>}/>
             <Route path="/RecruiterDashboard"  element={<RecruiterDashboard/>}/>
      
    </Routes>
  )
}
export default App;






















