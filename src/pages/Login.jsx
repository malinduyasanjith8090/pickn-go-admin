// src/pages/Login.jsx
import React, { useState } from "react";
import logo from "../assets/logo.jpeg";

// List of allowed admin emails
const ADMIN_EMAILS = [
  "sasinphoto2139@gmail.com",
  "kaweesha.nj@gmail.com",
  "mavithashehar@gmail.com",
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Check if admin
      if (!ADMIN_EMAILS.includes(email)) {
        setError("Access denied. Only admins can log in.");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Trigger parent login handler
      onLogin(data);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('https://www.goodwood.com/globalassets/.road--racing/road/news/2020/6-june/list-dan-trent-luxury-cars-2020/best-luxury-cars-2020-1-rolls-royce-phantom-goodwood-25062020.jpg?rxy=0.5,0.5&width=1280&height=720')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8 border border-gray-200 z-10">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="PickNGo Logo"
            className="w-20 h-20 object-cover rounded-full border-2 border-[var(--color-primary)]"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          PickNGo Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
