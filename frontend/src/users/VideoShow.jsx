import React from 'react'
import { useEffect } from 'react';
import { get3YoutubeLink } from '../api/apiCall';
import { useState } from 'react';

function VideoShow() {

      const [savedLink, setSavedLink] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get3YoutubeLink();
        setSavedLink(response?.url);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div  className='flex items-center justify-center h-[300px] '>

      {savedLink.length > 0 && (
              <div className="mt-6 w-full ">
                
                <div className="grid grid-cols-1 p-10 md:p-4 md:grid-cols-4  gap-6">
                  {savedLink.map((link, index) => {
                    const match = link.url.match(
                      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
                    );
                    const videoId = match ? match[1] : null;
                    const embedUrl = videoId
                      ? `https://www.youtube.com/embed/${videoId}`
                      : "";
      
                    return (
                      <div
                        key={index}
                        className="w-full relative border  rounded shadow"
                      >
                        {embedUrl ? (
                          <>
                            <iframe
                              className="w-full rounded"
                              src={embedUrl}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              title={`YouTube video ${index + 1}`}
                              onError={() => console.log("Embedding not allowed")}
                            />
                         
                          </>
                        ) : (
                          <p className="text-red-500 text-sm">Invalid video link</p>
                        )}
                      
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            
    </div>
  )
}

export default VideoShow
