import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

function ImageDownload({ results, category, item, color, image, positions }) {
  const downloadImageRef = useRef(null);

  // Define class names in variables
  const containerClass = "mx-auto drop-shadow-xl   ";

  const imageContainerClass = "relative h-[350px] w-[350px] mb-24";
  const backgroundImageClass = "max-w-full object-cover h-full w-full";
  const overlayClass =
    "absolute top-2 left-5 md:left-5 md:top-2 right-0 bottom-0 flex flex-col p-4";
  const flexRowClass = "flex flex-row";
  const resultTextClass = `text-3xl  poppins-bold ${color}`;
  const categoryTextClass = `text-sm poppins-bold ${color}`;
  const unitTextClass = `text-sm/[14px]  poppins-bold ${color}`;
  const unitSmallTextClass = `text-[10px] mb-1 poppins-light  ${color}`;
  const buttonClass =
    "mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50";

  const handleDownloadImage = async () => {
    toast.loading("Downloading");
    const element = downloadImageRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 6, // Increase the scale to improve image quality
    });
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    link.href = data;
    link.download = `${category}-${item}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.dismiss();
  };

  return (
    <>
      {results?.result && (
        <div className="">
          <div
            className="relative mx-auto drop-shadow-xl  text-center   h-[350px] w-[350px] mb-24"
            ref={downloadImageRef}
            id="downloadImage"
          >
            <img
              className="max-w-full object-cover  h-full w-full"
              src={image}
              alt="Background"
            />
            <div
              className="absolute  flex flex-col"
           style={{
  top: `${positions.y}px`,
  left: `${positions.x}px`,
}}
            >
              <div className="text-start ">
                <div className={`text-[10px] poppins-light ${color}`}>
                  {category}
                </div>
                <div
                  className={`text-[13px] poppins-medium -mt-[6px]  ${color}`}
                >
                  {item}
                </div>
              </div>

              <div className="text-start mt-[12px] pl-[10px]">
                {results?.result.map((result, index) => (
                  <div key={index}>
                    <div className={`text-[11px] poppins-semibold ${color}`}>
                      {result?.firstPrize ||
                      result?.secPrize ||
                      result?.thirdPrize
                        ? (
                            result?.firstPrize ||
                            result?.secPrize ||
                            result?.thirdPrize
                          )
                            .toLowerCase()
                            .replace(/^\w/, (c) => c.toUpperCase())
                        : ""}
                    </div>

                    <div
                      className={`text-[8px] mb-[7px] -mt-[2px] poppins-light ${color}`}
                    >
                      {result?.firstTeam ||
                        result?.secTeam ||
                        result?.thirdTeam}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <button
              onClick={handleDownloadImage}
              className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
            >
              Download
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageDownload;
