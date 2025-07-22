import React, { useEffect, useState } from 'react'
import { addDescription, getDescription } from '../api/apiCall'
import toast, { Toaster } from 'react-hot-toast'



function AddTheme() {
  const [description, setDescription] = useState('')
  const maxLength = 10000 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDescription()
   
        
        setDescription(response?.data)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [])

  async function handleSaveDescription() {
    try {
      const response = await toast.promise(
        addDescription(description),
        {
          loading: 'Saving...',
          success: 'Description saved successfully!',
          error: 'Failed to save description.',
        }
      )
      setDescription(response.data ) // fallback
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  return (
    <>
      <div className="w-screen mt-10 px-5 flex flex-col h-full  items-center">
      
        <h1 className="text-black text-2xl font-bold mb-5">Add Theme</h1>

        <div className="relative w-full max-w-4xl  mb-5">
          <textarea
            className="w-full rounded-lg border border-gray-300 px-4 py-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 shadow-sm transition resize-none overflow-y-aut"
            value={description}
            rows={8}
            wrap="soft"

            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type the description"
            maxLength={maxLength}
          ></textarea>

          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{description?.length}/{maxLength}</span>
            <button
              onClick={handleSaveDescription}
              className="bg-blue-700 px-10 py-1 text-xl text-white rounded hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Optional: Preview */}
   {description && (
          <div className="w-full max-w-4xl px-5 py-3  bg-gray-50 border rounded-lg shadow-sm break-words whitespace-pre-wrap">
            <p className="text-base md:text-lg lg:text-xl font-light text-justify text-gray-800 whitespace-pre-line">
              {description}
            </p>
          </div>
        )} 
      </div>
      <Toaster />

    </>
  )
}

export default AddTheme
