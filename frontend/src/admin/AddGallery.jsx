import React, { useEffect, useState } from 'react'
import UnderFooter from '../components/UnderFooter';
import { getGallery ,deleteGalleryImage} from '../api/apiCall';
import GalleryUpaloader from './GalleryUpaloader';
import { MdDelete } from "react-icons/md";
<MdDelete />
function AddGallery() {


  const [images, setImages] = useState([]);
  useEffect(() => {
    // Define async function inside useEffect
    async function fetchData() {
      try {
        const res = await getGallery(); // 👈 Call your API function
        const data= res
     if (data) {
         
        
        setImages(data.data);  
     }     // 👈 Update state with image data
      } catch (err) {
        console.error("Failed to fetch gallery:", err.message);
      }
    }

    fetchData(); // Call the async function
  }, []);

//   const images1 = [
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
//     "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
//   ];


const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this image?");
  if (!confirmDelete) return;

  try {
    await deleteGalleryImage(id);
    // Remove image from UI
    setImages((prev) => prev.filter((img) => img._id !== id));
  } catch (err) {
    console.error("Delete failed:", err.message);
    alert("Failed to delete image ❌");
  }
};

  return (
    <>
 <GalleryUpaloader images={images} setImages={setImages}/>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images && images.map((img, index) => (
  <div key={index} className="relative border-8 border-[#c7d9a7] overflow-hidden">
    <img
      src={img.path}
      alt={`gallery-${index}`}
      className="w-full h-full object-cover"
    />
    <button
      onClick={() => handleDelete(img._id)}
      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
    >
      <MdDelete />
    </button>
  </div>
))}
      </div>
    </div>
<div className="fixed bottom-0 w-full z-50">
  <UnderFooter />
</div>

    </>
  );
}




export default AddGallery
