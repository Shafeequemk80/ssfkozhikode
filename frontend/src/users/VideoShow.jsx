import React, { useEffect, useState, useRef } from "react";
import { get3YoutubeLink } from "../api/apiCall";
import { useNavigate } from "react-router-dom";

function VideoShow() {
  const [savedLink, setSavedLink] = useState([]);
  const iframeRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get3YoutubeLink();
        setSavedLink(response?.url || []);
      } catch (err) {
        console.error("Error fetching video links:", err.message);
      }
    }

    fetchData();
  }, []);

  // Function to request fullscreen
  const requestFullScreen = (iframe) => {
    const requestMethod =
      iframe.requestFullscreen ||
      iframe.webkitRequestFullscreen ||
      iframe.mozRequestFullScreen ||
      iframe.msRequestFullscreen;

    if (requestMethod) {
      requestMethod.call(iframe);
    }
  };

  // Function to send play command and fullscreen
  const handlePlay = (index) => {
    const iframe = iframeRefs.current[index];
    if (!iframe) return;

    // Send play command via postMessage
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: [],
      }),
      "*"
    );

    // Try to request fullscreen
    requestFullScreen(iframe);
  };

  return (
    <div id="videos" className="bg-yellow-100 py-10">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-10">
        Videos
      </h2>

      {savedLink.length > 0 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl px-4">
            {savedLink.map((link, index) => {
              const match = link.url.match(
                /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
              );
              const videoId = match ? match[1] : null;
              const embedUrl = videoId
                ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0`
                : "";

              return (
            <div
  key={index}
  className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] max-w-xs border rounded shadow relative"
>
  {embedUrl ? (
    <div className="relative pt-[177.78%]"> {/* 16:9 = 56.25%, 9:16 = 177.78% */}
      <iframe
        ref={(el) => (iframeRefs.current[index] = el)}
        className="absolute top-0 left-0 w-full h-full rounded"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title={`YouTube video ${index + 1}`}
      />
      <button
        onClick={() => handlePlay(index)}
        className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
      >
        ▶ Fullscreen
      </button>
    </div>
  ) : (
    <p className="text-red-500 text-sm p-2">Invalid video link</p>
  )}
</div>

              )
            })}

           
          </div>

          
        </div>
        
      )}
      <div className="flex justify-center mt-5">
         <div className="">
              <button
                onClick={() => navigate("/videopage")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform"
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
                See More Videos
              </button>
            </div>
      </div>
    </div>
  );
}

export default VideoShow;
