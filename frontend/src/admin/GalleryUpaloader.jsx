import React, { useRef, useState } from "react";
import { addToGallery } from "../api/apiCall";
import AddGallery from "./AddGallery";

const GalleryUpaloader = ({images,setImages}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

    const handleUpload = async () => {
        if (!selectedImage) return alert("No image selected!");

        setIsUploading(true);

        const formData = new FormData();
    formData.append("image", selectedImage);
        try {
        const res = await addToGallery(formData)
        
    if (res) {
        if (res && res.data) {
        // Add new image to beginning of the gallery
        setImages((prev) => [res.data, ...prev]);
        alert("Upload successful! ✅");
        setSelectedImage(null);
        setPreviewUrl(null);
      }    }
        } catch (error) {
        console.error("Upload error:", error.message);
        alert("Upload failed ❌");
        } finally {
        setIsUploading(false);
        }
    };

  return (
    <>
    <div className="flex flex-col items-center space-y-4 p-4">
             <h1 className="text-black text-2xl font-bold mb-5">Add Gallery </h1>
      <div
        onClick={handleImageClick}
className="w-96 h-64 border border-gray-400 cursor-pointer flex items-center justify-center overflow-hidden bg-gray-100"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected"
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src="/image.png"
            alt="Dummy"
            className="object-contain w-full h-full opacity-70"
          />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-gray-600 text-white px-10 py-2 rounded hover:bg-black"
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </div>


    </>
  );
};

export default GalleryUpaloader;
