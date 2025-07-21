import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaVideo,
  FaTrophy,
  FaInfoCircle,
  FaChartBar,
} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti"; // Menu icon
import UserSide from "./UserSide";

export default function RightSidebarLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Static top-right menu icon */}
      {!isOpen && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="text-3xl text-white focus:outline-none"
          >
            <TiThMenu />
          </button>
        </div>
      )}

      {/* Main content */}
      <div>
        <UserSide />
      </div>

      {/* Sidebar and overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Sidebar content */}

          <div
            ref={sidebarRef}
            className="absolute right-0 top-0 h-full w-64 bg-gradient-to-b from-white to-gray-100 shadow-2xl p-6 transition-transform duration-300 rounded-l-2xl"
          >
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
              📂 Menu
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <FaHome /> Home
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <FaVideo /> Videos
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <FaTrophy /> Result
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <FaInfoCircle /> About
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <FaChartBar /> Total Point
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
