import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.svg";
import Search from "./Search";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 shadow-md relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <a href="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10 object-cover" />
        </a>

        <Search onSearch={onSearch} />

        <div className="flex items-center space-x-4 text-white relative">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/favorites")}
          >
            <FaHeart
              className="text-xl hover:text-yellow-500"
              title="Favourites"
            />

            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1 rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          {!user ? (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-md text-black font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-1 border border-yellow-500 rounded-md text-yellow-500 hover:bg-yellow-500 hover:text-black font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div
              onClick={handleUserClick}
              className="cursor-pointer relative"
              ref={dropdownRef}
            >
              <FaUser
                className="text-xl hover:text-yellow-500"
                title={`Logged in as ${user.email}`}
              />
              {user?.email && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                  {user.email[0].toUpperCase()}
                </span>
              )}

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-700 text-white rounded-md shadow-lg z-50">
                  <div className="p-4 border-b border-gray-600">
                    <p className="font-semibold">
                      {user.username || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-300">
                      {user.email || "No email"}
                    </p>
                    {user.isAdmin && (
                      <p className="text-xs text-yellow-400 font-medium">
                        Admin
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => alert("Settings clicked!")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                  >
                    Settings
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
