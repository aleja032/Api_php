import React, {useState, useEffect} from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Nav from "./components/Nav";
import Login from "./components/Login";
import Card from "./components/Card";
import Home from "./components/Home";
import AddUser from "./components/AddUser";

function App(){
  return(
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/"/>
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/AddUser" element={<AddUser/>} />
      <Route path="/Card" element={<Card />} />
      {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  </BrowserRouter>

  )
}export default App