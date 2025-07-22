import React, { useEffect, useState } from "react";
import {
  getYoutubeLink,
  addYoutubeLink,
  deleteYoutubeLink,
} from "../api/apiCall";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import LiveUpload from "./LiveUpload";

const AddYoutubeLink = () => {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [savedLink, setSavedLink] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await toast.promise(getYoutubeLink(), {
          loading: "Fetching link...",
          success: "Link fetched!",
          error: "Error fetching link",
        });
        setSavedLink(response?.url);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);



const handleDelete = (indexToDelete, id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete the video link.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedLinks = savedLink.filter((_, i) => i !== indexToDelete);

      async function fetchData() {
        try {
          const response = await toast.promise(deleteYoutubeLink(id), {
            loading: "Deleting link...",
            success: "Link deleted!",
            error: "Error deleting link",
          });

          if (response.success) {
            setSavedLink(updatedLinks);
          }
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchData();
    }
  });
};


  const isValidYoutubeUrl = (url) => {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = link.trim();
    if (!isValidYoutubeUrl(trimmed)) {
      setError("Please enter a valid YouTube video link.");
      return;
    }

    try {

      const response = await toast.promise(addYoutubeLink({ url: trimmed }), {
        loading: "Saving...",
        success: "YouTube link saved!",
        error: "Failed to save link",
      });
      console.log(response);

      setSavedLink((prev) => [{ url: response.url }, ...prev]);
      setLink("");
      setError("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (<>
  <LiveUpload/>
  
    <div className="border border-black w-full flex justify-center items-center flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Add YouTube Link</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 flex flex-col gap-4"
      >
        <label className="w-full">
          YouTube URL:
          <input
            type="text"
            className={`w-full border p-2 mt-1 ${
              error ? "border-red-500" : "border-black"
            }`}
            placeholder="Enter YouTube video URL"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </label>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 hover:bg-gray-800"
        >
          Save Link
        </button>
      </form>
      {savedLink.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-xl mb-4">Saved Video Preview:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  className="w-full relative border p-2 rounded shadow"
                >
                  {embedUrl ? (
                    <>
                      <iframe
                        className="w-full h-64 rounded"
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title={`YouTube video ${index + 1}`}
                        onError={() => console.log("Embedding not allowed")}
                      />
                      <div className="text-center mt-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </>
                  ) : (
                    <p className="text-red-500 text-sm">Invalid video link</p>
                  )}
                  <button
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                    onClick={() => handleDelete(index, link._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Toaster />
    </div>
    </>
  );
};

export default AddYoutubeLink;
