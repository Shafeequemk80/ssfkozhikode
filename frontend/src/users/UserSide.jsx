import React, { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer.jsx";

import axios from "axios";

import Home from "./Home.jsx";
import Carousel from "./Carousel.jsx";
import TeamPoint from "./TeamPoint.jsx";

import Gallery from "./Gallery.jsx";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import VideoLink from "./VideoLink.jsx";
import Results from "./Results.jsx";
import Layout from "./RightSidebarLayout.jsx";
import VideoShow from "./VideoShow.jsx";

function UserSide() {
  const [buttonShow, setButtonShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the screen height is greater than 500px and scroll position is more than 100px
      if (window.scrollY > 100) {
        setButtonShow(true);
      } else {
        setButtonShow(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Home />
      {/* <VideoLink />
   <VideoShow/>
      <Results />
      <TeamPoint />
      <Gallery />
      <div className="flex justify-center">
        <p
          onClick={() => navigate("/gallerypage")}
          className="text-blue-500 flex items-center gap-2 cursor-pointer hover:underline"
        >
          See more Images <FaLongArrowAltRight />
        </p>
      </div>
      <Footer />
      {buttonShow && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center z-50 fixed bottom-10 right-10  size-11 bg-[#e8002c] text-white rounded-full"
        >
          <span
            className="iconify text-xl lg:text-2xl"
            data-icon="mdi:arrow-up"
          ></span>
        </button>
      )}
      <Toaster /> */}
    </>
  );
}

export default UserSide;
