import React, { useEffect, useState } from 'react';
import VideoShow from './VideoShow';
import { getlivelink } from '../api/apiCall';

function VideoLink() {
  const [stage, setStage] = useState('First Stage');
  const [lives, setLives] = useState([{ url: '' }, { url: '' }]);

  // Fetch live links on component mount
  useEffect(() => {
    const fetchLiveLinks = async () => {
      try {
        const response = await getlivelink();
        if (response && response?.data?.live1 && response?.data?.live2) {
         
          
setLives([
    { url: convertToEmbedUrl(response.data.live1.url) },
    { url: convertToEmbedUrl(response.data.live2.url) },
  ]);
        }
      } catch (error) {
        console.error('Failed to fetch live links:', error);
      }
    };

    fetchLiveLinks();
  }, []);
const convertToEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : '';
};

  const handleStageSwitch = () => {
    setStage((prev) => (prev === 'First Stage' ? 'Second Stage' : 'First Stage'));
  };

  const currentUrl = stage === 'First Stage' ? lives[0]?.url : lives[1]?.url;


  
  return (
    <div id="videos" className="flex flex-col items-center pt-6 pb-10 bg-black ">
      <h2 className="py-5 md:py-10 text-4xl lg:text-5xl text-white font-bold">Videos</h2>
      <h2 className="text-xl text-white font-semibold mb-4">{stage}</h2>

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-md">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          {currentUrl ? (
       <iframe
  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
  src={currentUrl}
  title="YouTube Live Stream"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 text-white">
              Loading video...
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleStageSwitch}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
      >
        Switch to {stage === 'First Stage' ? 'Second Stage' : 'First Stage'}
      </button>
    </div>
  );
}

export default VideoLink;
