import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, ImageUploadServer } from "../api/apiCall";
import toast, { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";

const ImageUpload = () => {
  let dummy="/350x350.png"
  const [images, setImages] = useState([null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState([null, null, null]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/showImage`);
        const data = response.data.data;

        const newImages = [
          data.image1.image
            ? data.image1.image
            : null,
          data.image2.image
            ? data.image2.image
            : null,
          data.image3.image
            ? data.image3.image
            : null,
        ];

        const newColor = [
          data.image1.color ? data.image1.color : null,
          data.image2.color ? data.image2.color : null,
          data.image3.color ? data.image3.color : null,
        ]

        setImages(newImages);
        setColor(newColor)


        // Logging the URLs directly
      
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);

      const newUploadedFiles = [...uploadedFiles];
      newUploadedFiles[index] = file;
      setUploadedFiles(newUploadedFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Waiting...");
      const formData = new FormData();
      formData.append(`color`, color);
      uploadedFiles.forEach((file, i) => {
        if (file) {
          formData.append(`image${i + 1}`, file);
        }
      });

      const response = await ImageUploadServer(formData);
      toast.dismiss();
      toast.success("Successfully Added!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.dismiss();
      toast.error("Failed to upload image.");
    }
  };
  const handleColortype = (index) => (e) => {
    const cl = e.target.value;
    const newcolor = [...color];
    newcolor[index] = cl;
    setColor(newcolor);
  };
  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
          <BarLoader />
        </div>
      ):
(
      <div className="px-4 py-6 sm:px-8 sm:py-8 bg-[#ffe7b0] lg:px-32 lg:py-12 overflow-scroll hide-scrollbar">
        <div className="flex flex-col text-center  w-full justify-center mb-10">

          <h2 className="text-lg md:text-2xl w-full   font-semibold ">
            Upload your results here </h2>
          <p className="text-red-600 pt-3">Make sure the image is square (1:1 aspect ratio) and don't forget to select the background color type.</p>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <div

              className="grid grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 gap-10">
              {images.map((image, index) => (
                <div>
                  <div
                    key={index}
                    className="relative drop-shadow   border-solid border-8  border-[#c7d9a7] h-[350px] w-[350px]"
                  >
                    <img
                      src={image ||dummy }
                      alt={`Design ${index + 1}`}
                      className="w-full h-full  object-cover  cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    />
                    <input
                      id={`fileInput${index}`}
                      type="file"
                      name={`image${index + 1}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, index)}
                    />

                  </div>
                  <div className="mt-2 flex flex-col  text-center mb-5  justify-center">
                    <div className="mb-4 mt-2">
                      <label className="poppins-regular ">Select Backgorund type</label>
                    </div>
                    <div>
                      <select
                        value={color[index]}
                        onChange={handleColortype(index)}
                        className="p-2  font-mediumpx-4 py-2 bg-black text-white font-semibold rounded-md  focus:outline-none focus:ring-2 "
                        required
                      >

                        <option value={"white"}>Dark</option>
                        <option defaultChecked={true} value={"black"}>Light</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="px-4 py-2 bg-[#9fb973] text-black font-semibold rounded-md hover:bg-[#c7d9a7] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Images
            </button>
          </div>
        </form>
       
      </div>)}
  
        <Toaster />
    </>
  );
};

export default ImageUpload;
