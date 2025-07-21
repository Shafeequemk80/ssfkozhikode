import React, { useState } from 'react';

function VideoLink() {
  const [stage, setStage] = useState('First Stage');

  const handleStageSwitch = () => {
    setStage((prev) => (prev === 'First Stage' ? 'Second Stage' : 'First Stage'));
  };

  return (
    <div id='videos' className="flex flex-col items-center pt-6 pb-10 bg-black min-h-screen">
 <h2 className="py-5 md:py-10 text-4xl lg:text-5xl  text-white font-bold">
          Videos
        </h2>
              <h2 className="text-xl  text-white font-semibold mb-4">{stage}</h2>

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-md">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
            src="https://www.youtube.com/embed/c4CqK5N2iCE?si=h8piFMlOve-47d6j"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <button
        onClick={handleStageSwitch}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
      >
        Switch to {stage === 'First Stage' ? 'Second Stage' : 'First Stage'}
      </button>
    </div>
  );
}

export default VideoLink;
