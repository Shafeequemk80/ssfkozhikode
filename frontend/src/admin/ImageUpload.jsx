import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, ImageUploadServer } from "../api/apiCall";
import toast, { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import Draggable from "react-draggable";

const ImageUpload = () => {
  const dummy = "/350x350.png";
  const [images, setImages] = useState([null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState([null, null, null]);
  const [positions, setPositions] = useState([
    { x: 45, y: 140 },
    { x: 45, y: 140 },
    { x: 45, y: 140 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/showImage`);
        const data = response.data.data;

        const newImages = [
          data?.image1?.image || null,
          data?.image2?.image || null,
          data?.image3?.image || null,
        ];

        const newColor = [
          data?.image1?.color || null,
          data?.image2?.color || null,
          data?.image3?.color || null,
        ];
        const newPositions = [
          data.image1.positions ? data.image1.positions : { x: 45, y: 140 },
          data.image2.positions ? data.image2.positions : { x: 45, y: 140 },
          data.image3.positions ? data.image3.positions : { x: 45, y: 140 },
        ];
        setImages(newImages);
        setColor(newColor);
        setPositions(newPositions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);

      const updatedFiles = [...uploadedFiles];
      updatedFiles[index] = file;
      setUploadedFiles(updatedFiles);
    }
  };

  const handleColorChange = (index, newColor) => {
    const updated = [...color];
    updated[index] = newColor;
    setColor(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Uploading...");
      const formData = new FormData();
      formData.append("positions", JSON.stringify(positions));
      formData.append(`color`, color);

      uploadedFiles.forEach((file, i) => {
        if (file) {
          formData.append(`image${i + 1}`, file);
        }
      });

      await ImageUploadServer(formData);
      toast.dismiss();
      toast.success("Successfully Uploaded!");
    } catch (error) {
      toast.dismiss();
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <BarLoader />
        </div>
      ) : (
        <div className="px-4 py-6 sm:px-8 sm:py-8 bg-[#ffe7b0] lg:px-32 lg:py-12 overflow-scroll hide-scrollbar">
          <div className="text-center mb-10">
            <h2 className="text-lg md:text-2xl font-semibold">
              Upload your results here
            </h2>
            <p className="text-red-600 pt-3">
              Make sure the image is square (1:1 aspect ratio) and don't forget
              to select the background color type.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {images.map((image, index) => (
                  <div key={index}>
                    <div className="relative border-8 border-[#c7d9a7] h-[350px] w-[350px] drop-shadow">
                      <img
                        src={image || dummy}
                        alt={`Design ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      />
                      <input
                        id={`fileInput${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, index)}
                      />

                      {/* Draggable Placeholder */}
                      <Draggable
                        bounds="parent"
                        defaultPosition={positions[index]} // only used on first render
                        onStop={(e, data) => {
                          const updatedPositions = [...positions];
                          updatedPositions[index] = { x: data.x, y: data.y };
                          setPositions(updatedPositions);
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            padding: "4px",
                            cursor: "move",
                          }}
                          className="flex flex-col"
                        >
                          <div
                            className={`text-[10px] oboto-regular-wide ${color[index]}`}
                          >
                            Category Name
                          </div>
                          <div
                            className={`text-[13px] poppins-medium -mt-[6px] ${color[index]}`}
                          >
                            item Name
                          </div>

                          <div className="mt-2 pl-[10px] text-start">
                            {[...Array(3)].map((_, idx) => (
                              <div key={idx}>
                                <div
                                  className={`text-[12px] oboto-regular-wide ${color[index]}`}
                                >
                                  Muhammed shafeeque
                                </div>
                                <div
                                  className={`text-[8px] -mt-[2px] mb-[6px] poppins-light ${color[index]}`}
                                >
                                  Participants Team
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Draggable>

                      {/* Color Selection */}
                      <div className="absolute top-2 right-2 bg-white p-1 rounded shadow">
                        <button
                          type="button"
                          className={`w-6 h-6 rounded-full border ${
                            color[index] === "text-white"
                              ? "bg-black"
                              : "bg-white border-black"
                          }`}
                          onClick={() =>
                            handleColorChange(
                              index,
                              color[index] === "text-white"
                                ? "text-black"
                                : "text-white"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="px-4 py-2 bg-[#9fb973] text-black font-semibold rounded-md hover:bg-[#c7d9a7] focus:outline-none focus:ring-2"
              >
                Submit Images
              </button>
            </div>
          </form>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default ImageUpload;
