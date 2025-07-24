import React, { useEffect, useState } from "react";
import { get3fromGallery, getGallery } from "../api/apiCall";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function Gallery() {
  // const images = [
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
  //   "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
  // ];

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Define async function inside useEffect
    async function fetchData() {
      try {
        const res = await get3fromGallery(); // 👈 Call your API function
        const data = res;
        if (data) {
          setImages(data.data);
        } // 👈 Update state with image data
      } catch (err) {
        console.error("Failed to fetch gallery:", err.message);
      }
    }

    fetchData(); // Call the async function
  }, []);

  return (
    <div id="gallery" className="container  mx-auto px-4 py-8">
      <div className="flex justify-center mb-10">
        <h2 className="text-4xl lg:text-5xl  font-bold">Gallery</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images &&
          images.map((src, index) => (
            <div
              key={index}
              className="border-8 border-[#c7d9a7] overflow-hidden ¸ˇ"
            >
              <img
                src={src.path}
                alt={`gallery-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => navigate("/gallerypage")}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          See Gallery
        </button>
      </div>
    </div>
  );
}

export default Gallery;
