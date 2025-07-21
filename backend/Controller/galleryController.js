
const Gallery = require("../models/galleryModel");
const cloudinary = require('../util/cloudinary')
const saveGalleryImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No image uploaded" });

    const newImage = await Gallery.create({
      path: file.path,        // Cloudinary secure_url
      publicId: file.filename,    // Cloudinary public_id
      });

    res.status(201).json({ success: true, data: newImage });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ success: false, message: "Failed to upload image" });
  }
};
const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 }); // 👈 Latest first
    
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
};

// DELETE /gallery/:id
const deleteGalleryImage = async (req, res) => {
  try {
    const id = req.params.id;

    // Find image in DB
    const image = await Gallery.findById(id);
    if (!image) return res.status(404).json({ success: false, message: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    res.json({ success: true, message: "Image deleted from DB and Cloudinary" });
  } catch (err) {
    console.error("Delete failed:", err.message);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
const get3Images = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 }).limit(3); // 👈 Latest first
    
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
};


module.exports={
    saveGalleryImage,
    getAllImages,
    deleteGalleryImage,
    get3Images
}