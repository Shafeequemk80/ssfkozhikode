import React, { useEffect, useState } from 'react';
import { addBrochure, getBrochure } from '../api/apiCall';
import toast, { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";

const dummy = "https://dummyimage.com/350x350/000/fff.png&text=Please+Click+me";
const imageClass = 'object-cover w-full h-full rounded-md cursor-pointer transition-transform hover:scale-105';

function AddBrochure() {
  const [loading, setLoading] = useState(false);
  const [brochure, setBrochure] = useState([null, null, null]);
  const [uploadFiles, setUploadFiles] = useState([null, null, null]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await toast.promise(
          getBrochure(),
          {
            loading: 'Fetching brochure...',
            success: (res) => `Loaded successfully: ${res.message}`,
            error: 'Failed to fetch brochure. Please try again.',
          }
        );
        const data = response.data;
        const newImage = [
          data.image1?.path || null,
          data.image2?.path || null,
          data.image3?.path || null,
        ];
        setBrochure(newImage);
      } catch (error) {
        console.error("Error fetching brochure:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Revoke blob URLs on unmount
    return () => {
      brochure.forEach(url => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [brochure]);

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...brochure];
      newImages[index] = URL.createObjectURL(file);
      setBrochure(newImages);

      const newUploadFiles = [...uploadFiles];
      newUploadFiles[index] = file;
      setUploadFiles(newUploadFiles);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    uploadFiles.forEach((file, index) => {
      if (file) {
        formData.append(`image${index + 1}`, file);
      }
    });

    await toast.promise(
      addBrochure(formData),
      {
        loading: 'Saving...',
        success: 'Brochure saved successfully!',
        error: 'Failed to save Brochure.',
      }
    );
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <BarLoader />
        </div>
      ) : (
        <div className="w-full bg-lime-50 flex  flex-col items-center">
          <div className="my-10">
            <h3 className="font-bold text-3xl text-center">Add Brochure</h3>
          </div>

          <div className="w-full grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-10 xl:px-56 pb-16">
            {brochure.map((img, index) => (
              <div key={index} className=" w-full">
                <img
                  src={img || dummy}
                  alt={`Brochure ${index + 1}`}
                  className={imageClass}
                  onClick={() => handleImageClick(index)}
                />
                <input
                  type="file"
                  id={`fileInput${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !uploadFiles.some(file => file)}
            className={`px-9 py-2 mb-10 font-semibold rounded-md transition 
              ${loading || !uploadFiles.some(file => file)
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-[#5d772f] text-black hover:bg-[#8aa857]'}`}>
            Submit
          </button>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default AddBrochure;
