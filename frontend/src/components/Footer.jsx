import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full px-5 md:px-10 lg:px-10 xl:px-36 bg-[#151622] flex flex-col items-center justify-center py-6">
      <h1 className="text-white font-semibold text-sm lg:text-xl">
        Kozhikode South Committee
      </h1>

      <div className="flex gap-5 mt-3 mb-4 text-white text-xl">
        <a
          href="https://www.instagram.com/ssfkozhikodesouth"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <FaInstagram />
        </a>
        <a
          href="https://whatsapp.com/channel/0029Vayw1pAElagzmo2AS53n"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://facebook.com/SSFKozhikodeSouth"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://youtube.com/@ssfkozhikodesouth"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          <FaYoutube />
        </a>
      </div>

      {/* Optional credit line */}
      {/* <h1 className="text-gray-100 text-sm">
        <span className="text-xl">&copy;</span> Designed <a href="https://wa.link/m0k31s" className="underline">By Shafeeque Sa'adi</a>
      </h1> */}
    </footer>
  );
}

export default Footer;
