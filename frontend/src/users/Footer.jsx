import React, { useState, useEffect } from "react";
import { getBrochure, getDescription } from '../api/apiCall'
import UnderFooter from "../components/UnderFooter";
function Footer() {
  const [description, setDescription] = useState('')
  const [brochure, setBrochure] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const responce = await getDescription()
        setDescription(responce.data)
        toast.success(`Yes, ${responce.message}}`);

      } catch (error) {
      }
    }
    fetchData()
  }, [])



  useEffect(() => {
    async function fetchData() {
      const response = await getBrochure()

      setBrochure(response.data)

    }
    fetchData()
  }, [])
  return (
    <>

      <div className="flex flex-col gap-8 py-14 mt-4 text-center w-full px-10 xl:px-56">
        <h2 className="text-4xl lg:text-5xl  font-bold">
          What's Theme
        </h2>
        <p className="text-lg lg:text-xl font-thin text-justify">{description} </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 px-10 xl:px-56">


        {Object.values(brochure || {}).map((imgObj, index) => (
          imgObj?.path && (
            <img
              key={index}
              src={imgObj.path}
              className="object-cover h-full w-full rounded-md "
              alt={`Gallery ${index + 1}`}
            />
          )
        ))} 

        {/* <img
          src="/image2.jpg"
          className="object-cover h-full w-full rounded-md"
          alt="Gallery"
        /> */}
      </div>

     <UnderFooter/>

    </>
  )
}

export default Footer
