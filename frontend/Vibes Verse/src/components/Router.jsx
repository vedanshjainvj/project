import React from 'react'
import {Routes, Route} from "react-router-dom"
import Verifycertificate from './Verifycertificate'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Stipend from './Stipend'
import Sidebar from './Sidebar'
import RegistrationData from './RegistrationData'
import UpdateIntern from './UpdateIntern'
// import ProtectedRoutes from '../Services/ProtectedRoutes'

const routes = () => {
  return (
    <>
     <Routes>
      {/* <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
      </Route> */}
      <Route path="/" element={<Home />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/registration-data" element={<RegistrationData />} />
      <Route path="/stipend-data" element={<Stipend />} />
      <Route path="/verify-certificate" element={<Verifycertificate />} />
      <Route path="/UpdateIntern/:id" element={<UpdateIntern />} />      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default routes