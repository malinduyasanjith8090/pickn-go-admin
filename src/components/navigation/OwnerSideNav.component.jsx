// components/navigation/OwnerSideNav.component.jsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiClipboard,
  FiTruck,
  FiGrid,
  FiBookmark,
} from "react-icons/fi";
import logo from "../../assets/logo.jpeg"; // <-- Import logo image

const sections = [
  {
    id: "top",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: FiHome },
      { to: "/admin/booking", label: "Booking", icon: FiClipboard },
      { to: "/admin/profile", label: "Profile", icon: FiUser },
      {
        to: "/admin/vehical-management",
        label: "Vehicle Management",
        icon: FiTruck,
      },
      { to: "/admin/customer-profile", label: "Customer", icon: FiUser },
      { to: "/admin/feedback", label: "Customer Feedback", icon: FiBookmark },
    ],
  },
  {
    id: "middle",
    items: [{ to: "/admin/catalog", label: "Catalog", icon: FiGrid }],
  },
  {
    id: "bottom",
    items: [
      { to: "/admin/settings", label: "Settings", icon: FiSettings },
      { to: "/logout", label: "Log Out", icon: FiLogOut },
    ],
  },
];

function Item({ to, label, Icon, isOpen, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group relative flex items-center rounded-lg px-3 py-2",
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/60",
          isActive
            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
            : "text-gray-700 hover:bg-white hover:ring-1 hover:ring-amber-100",
        ].join(" ")
      }
      aria-label={label}
    >
      <Icon className="text-xl shrink-0" />
      <span
        className={[
          "ml-3 text-sm whitespace-nowrap transition-all duration-300 overflow-hidden",
          isOpen ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0",
        ].join(" ")}
      >
        {label}
      </span>
      {!isOpen && (
        <span className="pointer-events-none absolute left-16 z-10 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {label}
        </span>
      )}
    </NavLink>
  );
}

export default function OwnerSideNav({
  mobileOpen = false,
  setMobileOpen = () => {},
  onLogout,
}) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [isOpen, setIsOpen] = useState(() => {
    try {
      return localStorage.getItem("owner_sidebar_open") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("owner_sidebar_open", String(isOpen));
    } catch {}
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isOpen ? "16rem" : "4rem"
    );
  }, [isOpen]);

  /* Handle Logout */
  const handleLogout = () => {
    setShowLogoutModal(true); // Show confirmation modal
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    navigate("/"); // redirect to login
  };

  /* DESKTOP */
  const Desktop = (
    <aside
      className={[
        "fixed left-0 top-0 z-40 hidden h-screen flex-col justify-between md:flex",
        "border-r border-gray-200 bg-gray-50/90 backdrop-blur",
        "w-[var(--sidebar-width,4rem)] transition-[width] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]",
        "overflow-visible",
      ].join(" ")}
    >
      {/* Logo clickable -> Home */}
      <NavLink
        to="/owner/dashboard"
        className="relative flex h-14 items-center border-b border-gray-200 px-3"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Replace Yellow Box with Logo */}
          <img
            src={logo}
            alt="Pick & Go Logo"
            className="h-12 w-12 rounded-full object-cover shrink-0"
          />
          <span
            className={[
              "text-base font-semibold text-gray-800 transition-all duration-300 whitespace-nowrap overflow-hidden",
              isOpen ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0",
            ].join(" ")}
          >
            Pick & Go
          </span>
        </div>
      </NavLink>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute right-[-18px] top-7
           h-10 w-10 flex items-center justify-center
           rounded-full shadow-lg ring-1 ring-black/5 
           bg-indigo-600 text-white hover:bg-indigo-500"
      >
        <FiChevronRight
          className={`text-lg transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <nav className="flex flex-1 flex-col gap-4 px-2 py-4 overflow-hidden">
        <div className="flex flex-col gap-2">
          {sections[0].items.map((it) => (
            <Item key={it.to} {...it} Icon={it.icon} isOpen={isOpen} />
          ))}
        </div>
        <div className="my-1 h-px w-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          {sections[1].items.map((it) => (
            <Item key={it.to} {...it} Icon={it.icon} isOpen={isOpen} />
          ))}
        </div>
      </nav>

      {/* Bottom section with Logout */}
      <div className="flex flex-col gap-2 border-t border-gray-200 px-2 py-3 overflow-hidden">
        {sections[2].items.map((it) =>
          it.label === "Log Out" ? (
            <button
              key="logout"
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white hover:ring-1 hover:ring-amber-100"
            >
              <FiLogOut className="text-xl" />
              <span
                className={[
                  "text-sm whitespace-nowrap transition-all duration-300 overflow-hidden",
                  isOpen ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0",
                ].join(" ")}
              >
                Log Out
              </span>
            </button>
          ) : (
            <Item key={it.to} {...it} Icon={it.icon} isOpen={isOpen} />
          )
        )}
      </div>
    </aside>
  );

  /* MOBILE */
  const Mobile = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 md:hidden",
          "transform transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-col",
        ].join(" ")}
      >
        {/* Logo clickable -> Home */}
        <NavLink
          to="/owner/dashboard"
          onClick={() => setMobileOpen(false)}
          className="relative flex h-14 items-center border-b border-gray-200 px-3"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={logo}
              alt="Pick & Go Logo"
              className="h-8 w-8 rounded-full object-cover shrink-0"
            />
            <span className="text-base font-semibold text-gray-800">
              Pick & Go
            </span>
          </div>
        </NavLink>

        <nav className="flex flex-1 flex-col gap-4 px-2 py-4 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {sections[0].items.map((it) => (
              <Item
                key={it.to}
                {...it}
                Icon={it.icon}
                isOpen={true}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>

          <div className="my-1 h-px w-full bg-gray-200" />

          <div className="flex flex-col gap-2">
            {sections[1].items.map((it) => (
              <Item
                key={it.to}
                {...it}
                Icon={it.icon}
                isOpen={true}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Mobile Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 m-2 rounded-lg text-gray-700 hover:bg-white hover:ring-1 hover:ring-amber-100"
        >
          <FiLogOut className="text-xl" />
          <span className="text-sm">Log Out</span>
        </button>
      </aside>
    </>
  );

  /* Logout Confirmation Modal */
  const LogoutModal = showLogoutModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {Desktop}
      {Mobile}
      {LogoutModal}
    </>
  );
}
