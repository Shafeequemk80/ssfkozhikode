import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./global.css";
import "./index.css";

import RightSidebarLayout from "./users/RightSidebarLayout.jsx";
import AdminSide from "./admin/AddResults.jsx";
import ImageUpload from "./admin/ImageUpload.jsx";
import AllResult from "./admin/AllResult.jsx";
import ScoreAd from "./admin/ScoreAd.jsx";
import Login from "./admin/Login.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AddBrochure from "./admin/AddBrochure.jsx";
import AddTeam from "./admin/AddTeam.jsx";
import AddTheme from "./admin/AddTheme.jsx";
import AddCategory from "./admin/AddCategory.jsx";
import AddItem from "./admin/AddItem.jsx";
import StartProgram from "./admin/StartProgram.jsx";
import AddResults from "./admin/AddResults.jsx";
import GalleryPage from "./users/GalleryPage.jsx";
import AddGallery from "./admin/AddGallery.jsx";
import GalleryUpaloader from "./admin/GalleryUpaloader.jsx";

const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RightSidebarLayout />} />
        <Route path="/gallerypage" element={<GalleryPage />} />
        <Route path="/admin/login" element={isAdminLoggedIn?<Navigate to={'/admin'}/>: <Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/addImage"
          element={
            <ProtectedRoute>
              <ImageUpload />
            </ProtectedRoute>
          }
        />
    
        <Route
          path="admin/allresult"
          element={
            <ProtectedRoute>
              <AllResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/addteampoint"
          element={
            <ProtectedRoute>
              <ScoreAd />
            </ProtectedRoute>
          }
        />
         <Route
          path="admin/addbrochure"
          element={
            <ProtectedRoute>
              <AddBrochure />
            </ProtectedRoute>
          }
        />
         <Route
          path="admin/addteam"
          element={
            <ProtectedRoute>
              <AddTeam />
            </ProtectedRoute>
          }
        />
         <Route
          path="admin/addtheme"
          element={
            <ProtectedRoute>
              <AddTheme />
            </ProtectedRoute>
          }
          />
         <Route
          path="admin/addcategory"
          element={
            <ProtectedRoute>
              <AddCategory/>
            </ProtectedRoute>
          }
        />
         <Route
          path="admin/additem"
          element={
            <ProtectedRoute>
              <AddItem/>
            </ProtectedRoute>
          }
        />
         <Route
          path="admin/start"
          element={
            <ProtectedRoute>
              <StartProgram/>
            </ProtectedRoute>
          }
        />
          <Route
          path="admin/addresult"
          element={
            <ProtectedRoute>
              <AddResults/>
            </ProtectedRoute>
          }
        />
          <Route
          path="admin/addgallery"
          element={
            <ProtectedRoute>
              <AddGallery/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>

);