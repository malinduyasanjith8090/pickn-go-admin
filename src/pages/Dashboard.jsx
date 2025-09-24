// src/pages/Dashboard.jsx
import React, { useState } from "react";
import OwnerSideNav from "../components/navigation/OwnerSideNav.component";
import { FiUser } from "react-icons/fi";

export default function Dashboard({ onLogout, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <OwnerSideNav
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-width,4rem)" }}
      >
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Admin Dashboard
          </h1>

          {/* Right Side User Info */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">
              Hi, {user?.name}
            </span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <FiUser className="text-xl" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 bg-[var(--color-light)] flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">Card 1</div>
            <div className="bg-white rounded-lg p-4 shadow">Card 2</div>
            <div className="bg-white rounded-lg p-4 shadow">Card 3</div>
          </div>
        </main>
      </div>
    </div>
  );
}
