// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";

// Placeholder pages
const Profile = () => <div className="p-6">Profile Page</div>;
const VehicleManagement = () => <div className="p-6">Vehicle Management Page</div>;
const CustomerProfile = () => <div className="p-6">Customer Profile Page</div>;
const Feedback = () => <div className="p-6">Customer Feedback Page</div>;
const Catalog = () => <div className="p-6">Catalog Page</div>;
const Settings = () => <div className="p-6">Settings Page</div>;

// Admin email → name mapping
const ADMIN_NAMES = {
  "sasinphoto2139@gmail.com": "Sasin",
  "kaweesha.nj@gmail.com": "Kaweesha",
  "mavithashehar@gmail.com": "Shehar",
};

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    const name = ADMIN_NAMES[loggedInUser.email] || "Admin";
    setUser({ ...loggedInUser, name });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        {user && (
          <>
            <Route path="/admin/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/admin/booking" element={<Booking user={user} onLogout={handleLogout} />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/vehicle-management" element={<VehicleManagement />} />
            <Route path="/admin/customer-profile" element={<CustomerProfile />} />
            <Route path="/admin/feedback" element={<Feedback />} />
            <Route path="/admin/catalog" element={<Catalog />} />
            <Route path="/admin/settings" element={<Settings />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
