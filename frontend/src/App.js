import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OTPSignup from "./pages/OTPSignup";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import AdminLayouts from "./components/layouts/AdminLayouts";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminUpdate from "./pages/AdminUpdate";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import OTPLogin from "./pages/OTPLogin";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpinput" element={<OTPSignup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/otplogin" element={<OTPLogin />} />
          <Route path="/profile" element={<Profile />}>
            {/* <Route path=":id/edit" element={<ProfileEdit />} /> */}
          </Route>
          <Route path="/profileEdit" element={<ProfileEdit />} />

          <Route path="/admin" element={<AdminLayouts />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="bg-white h-screen w-full"></div> */}
    </>
  );
}

export default App;
