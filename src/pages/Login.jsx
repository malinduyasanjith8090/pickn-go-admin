// src/pages/Login.jsx
import React, { useState } from "react";
import logo from "../assets/logo.jpeg";

const users = [
  { email: "sasinphoto2139@gmail.com", password: "123456", name: "Sasin" },
  { email: "kaweesha.nj@gmail.com", password: "123456", name: "Kaweesha" },
  { email: "mavithashehar@gmail.com", password: "123456", name: "Shehar" },
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    onLogin(foundUser); // Send the full user data to parent
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
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8 border border-gray-200 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="PickNGo Logo"
            className="w-20 h-20 object-cover rounded-full border-2 border-[var(--color-primary)]"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          PickNGo Admin Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-sm text-red-500">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
