import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Home from "./Home.jsx";
import Carousel from "./Carousel.jsx";
import TeamPoint from "./TeamPoint.jsx";
import Gallery from "./Gallery.jsx";
import VideoLink from "./VideoLink.jsx";
import Results from "./Results.jsx";
import VideoShow from "./VideoShow.jsx";
import Footer from "../components/Footer.jsx";
import { getFeatures } from "../api/apiCall.js";
import Theme from "./Theme.jsx";


function UserSide() {
  const [buttonShow, setButtonShow] = useState(false);
  const [features, setFeatures] = useState([]);

  // Fetch features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const result = await getFeatures();
        setFeatures(result || []);
      } catch (error) {
        console.error("Error fetching features:", error);
        toast.error("Something went wrong while fetching features.");
      }
    };

    fetchFeatures();
  }, []);

  // Mapping of feature keys to components
  const featureComponents = {
    live: <VideoLink />,
    videos: <VideoShow />,
    gallery: <Gallery />,
    results: <Results />,
    teamPoints: <TeamPoint />,
    theme: <Theme/>,
  };

  // Show scroll-to-top button logic
  useEffect(() => {
    const handleScroll = () => {
      setButtonShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper to check if a feature is enabled
  const isFeatureEnabled = (key) =>
    features.some((feature) => feature.name === key && feature.enabled);

  return (
    <>
      <Home />

      <div>
        {Object.entries(featureComponents).map(([key, Component]) =>
          isFeatureEnabled(key) ? <div key={key}>{Component}</div> : null
        )}
      </div>

      <Footer />

      {buttonShow && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 flex size-11 items-center justify-center rounded-full bg-[#e8002c] text-white"
        >
          <span
            className="iconify text-xl lg:text-2xl"
            data-icon="mdi:arrow-up"
          ></span>
        </button>
      )}

    
    </>
  );
}

export default UserSide;
