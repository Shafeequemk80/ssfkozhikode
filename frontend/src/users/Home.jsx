import React from 'react';

function Home() {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  };

  return (
    <div id='home'
      className="relative text-center w-full h-screen p-0 flex flex-col items-center justify-center pt-10"
    >
      {/* Background for Desktop and Mobile */}
     <div
  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/bgmobile.jpg')",
  }}
></div>

      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/bcslide.jpg')", // Background for desktop
        }}
      ></div>

      {/* Foreground text or logo */}
      <img
        className="absolute w-[300px] -mt-[300px] md:w-[600px]"
        src="/sahiText.png"
        alt="Sahithyolsav"
      />

      {/* Scroll-down button */}
      <div className="-mt-[100px] lg:mt-20 z-10">
        <button onClick={() => scrollToElement('results')}>
          <span
            className="iconify text-3xl lg:text-4xl rounded-full p-1 animate-bounce transition-all duration-500 bg-white"
            data-icon="mdi:chevron-down"
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Home;
