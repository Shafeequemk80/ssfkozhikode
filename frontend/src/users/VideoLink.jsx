import React, { useEffect, useState } from "react";
import { getlivelink } from "../api/apiCall";

function VideoLink() {
  const [stage, setStage] = useState("First Stage");
  const [lives, setLives] = useState([{ url: null }, { url: null }]);

  useEffect(() => {
    const fetchLiveLinks = async () => {
      try {
        const response = await getlivelink();

        if (response?.data) {
          const live1Url = response.data.live1?.url || null;
          const live2Url = response.data.live2?.url || null;

          const embeddedLive1 = convertToEmbedUrl(live1Url);
          const embeddedLive2 = convertToEmbedUrl(live2Url);

          setLives([{ url: embeddedLive1 }, { url: embeddedLive2 }]);

          // If only live2 exists, default to Second Stage
          if (!embeddedLive1 && embeddedLive2) {
            setStage("Second Stage");
          }
        }
      } catch (error) {
        console.error("Failed to fetch live links:", error);
      }
    };

    fetchLiveLinks();
  }, []);

  const convertToEmbedUrl = (url) => {
    const match = url?.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
      : null;
  };

  const handleStageSwitch = () => {
    if (stage === "First Stage" && lives[1]?.url) {
      setStage("Second Stage");
    } else if (stage === "Second Stage" && lives[0]?.url) {
      setStage("First Stage");
    }
  };

  const currentUrl = stage === "First Stage" ? lives[0]?.url : lives[1]?.url;
  const hasLive1 = !!lives[0]?.url;
  const hasLive2 = !!lives[1]?.url;
  const showSwitchButton = hasLive1 && hasLive2;

  return (
    <div id="videos" className="flex flex-col items-center pt-6 pb-10 bg-black">
      <h2 className="py-5 md:py-10 text-4xl lg:text-5xl text-white font-bold">
        Live Stream
      </h2>

      {(hasLive1 || hasLive2) && (
        <h2 className="text-xl text-white font-semibold mb-4">{stage}</h2>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-md">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {currentUrl ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
              src={`${currentUrl}?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0`}
              title="YouTube Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 text-white">
              No live stream available
            </div>
          )}
        </div>
      </div>

      {showSwitchButton && (
        <button
          onClick={handleStageSwitch}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
        >
          Switch to {stage === "First Stage" ? "Second Stage" : "First Stage"}
        </button>
      )}
    </div>
  );
}

export default VideoLink;
