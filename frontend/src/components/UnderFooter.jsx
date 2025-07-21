import React, { useEffect, useState } from 'react'

function UnderFooter() {

  return (
    <footer className=" bottom-0 left-0 w-full px-5 md:px-10 lg:px-10 xl:px-36 bg-[#151622] flex flex-col items-center justify-center">
      <h1 className="text-white mt-4 font-semibold text-sm lg:text-xl">
      Kozhikode South Committee
      </h1>
      <h1 className="text-gray-100 mt-1 mb-4  text-sm">
        <span className="text-xl">&copy;</span> Designed <a href="https://wa.link/m0k31s" className="underline">By Shafeeque Sa'adi</a>
      </h1>
    </footer>
  )
}

export default UnderFooter;
