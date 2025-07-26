import React from "react";

function MapPage() {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-[#2b1914] p-4">
      <div>
        <h2 className="py-5 md:py-10 text-4xl lg:text-5xl text-white font-bold">
          Maps View
        </h2>
      </div>
      <div>
        <img
          src="/Routmap.jpg"
          alt="Route Map"
          className="max-w-full h-auto rounded shadow-md"
        />
      </div>
    </div>
  );
}

export default MapPage;
