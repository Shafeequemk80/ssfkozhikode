import React from "react";

function Maps() {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-[400px] rounded-lg shadow overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3911.563552654755!2d75.86181397505054!3d11.366555588820399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDIxJzU5LjYiTiA3NcKwNTEnNTEuOCJF!5e0!3m2!1sen!2sin!4v1753490288065!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
     
      </div>
    </div>
  );
}

export default Maps;
