import React from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaClipboardList, FaUsers, FaListAlt, FaSignOutAlt, FaHome, FaImages, FaLayerGroup, FaEnvelopeOpenText, FaVideo } from "react-icons/fa";
import { MdOutlinePowerSettingsNew,MdDashboardCustomize } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { Toaster } from "react-hot-toast";

function AdminDashboard() {
  const navigate = useNavigate();
  const cards = [
    { title: "Add Image", icon: <FaImage />, color: "bg-blue-500", path: "/admin/addImage" },
    { title: "Add Result", icon: <FaClipboardList />, color: "bg-emerald-500", path: "/admin/addresult" },
    { title: "Add Team", icon: <FaLayerGroup />, color: "bg-indigo-500", path: "/admin/addteam" },
    { title: "Add Category", icon: <FaClipboardList />, color: "bg-cyan-500", path: "/admin/addcategory" },
    { title: "Add Item", icon: <FaClipboardList />, color: "bg-teal-500", path: "/admin/additem" },
    { title: "Add Gallery", icon: <GrGallery />, color: "bg-purple-500", path: "/admin/addgallery" },
    { title: "All Results", icon: <FaListAlt />, color: "bg-violet-500", path: "/admin/allresult" },
    { title: "Add Team Point", icon: <FaUsers />, color: "bg-amber-500", path: "/admin/addteampoint" },
    { title: "Add Brochure", icon: <FaImages />, color: "bg-rose-500", path: "/admin/addbrochure" },
    {title: "Add Theme",icon: <FaEnvelopeOpenText />,color: "bg-purple-500", path: "/admin/addtheme"},
    {title: "Add Videos",icon: <FaVideo />, color: "bg-blue-500", path: "/admin/addvideos"},
    {title: "Customize",icon: <MdDashboardCustomize />,color: "bg-green-500", path: "/admin/featuretoggle"}


  ];
  
  

  const handleLogout = () => {
   const log= localStorage.removeItem("isAdminLoggedIn");
   if(!log){
     navigate("/admin/login");
   }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-5 md:mx-52   px-4 py-8 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`p-6 rounded-lg shadow-lg ${card.color} text-white flex flex-col items-center justify-center  hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
          ))}
        </div>

        {/* Home and Logout Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/")}
            className="p-4 rounded-lg shadow-lg bg-indigo-500 text-white flex  flex-col items-center justify-center hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="text-4xl mb-2">
              <FaHome />
            </div>
            <h3 className="text-lg font-semibold">Go to Home</h3>
          </div>
          <div
            onClick={() => navigate("/admin/start")}
            className="p-4 rounded-lg shadow-lg bg-amber-500 text-white flex  flex-col items-center justify-center hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="text-4xl mb-2">
              <MdOutlinePowerSettingsNew />
            </div>
            <h3 className="text-lg font-semibold">Start</h3>
          </div>

          <div
            onClick={handleLogout}
            className="p-4 rounded-lg shadow-lg bg-red-500 text-white flex flex-col  items-center justify-center hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="text-4xl mb-2">
              <FaSignOutAlt />
            </div>
            <h3 className="text-lg font-semibold">Logout</h3>
          </div>
        </div>
      </div>
    </div>
      <Toaster />
      </>
  );
}

export default AdminDashboard;
