import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
'https://img.freepik.com/free-vector/sun-light-with-clouds-sky-background_1017-38299.jpg?t=st=1739713605~exp=1739717205~hmac=bea221f2a840a79942b147937d2b2c9a41e377dc1e5de836bd1d89eb4cc5b1d7',
'https://static.vecteezy.com/system/resources/thumbnails/010/360/100/small_2x/shining-blue-sky-and-orange-sand-background-free-vector.jpg'
  ];

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div className="relative   h-96 md:h-[100vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute flex items-center justify-center  h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity  duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover "
            />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col  items-center justify-center">
         
        {/* <h1 className="flex flex-col items-center text-center mt-10 justify-center xl:gap-2">
  <img
    className="md:w-[400px] w-sm px-20 animate-[slideInFromTop_1s_ease-out] mb-4"
    src="/heading/Asset 1.png"
    alt="Sahithyolsav"
    style={{
      animationDelay: "0s",
    }}
  />
  <img
    className="md:w-[600px] w- px-20 animate-[slideInFromBottom_1s_ease-out] mb-4"
    src="/heading/Asset 2.png"
    alt="Sahithyolsav"
    style={{
      animationDelay: "0.5s",
    }}
  />
  <img
    className="md:w-[600px] w-sm px-20 animate-[slideInFromLeft_1s_ease-out]"
    src="/heading/Asset 4.png"
    alt="Sahithyolsav"
    style={{
      animationDelay: "1s",
    }}
  />
</h1> */}

          <div className="pt-14 lg:pt-20">
            <button onClick={() => scrollToElement("results")}>
              <span
                className="iconify text-3xl lg:text-4xl rounded-full p-1 animate-bounce transition-all duration-500 text-white mt-20 bg-blue-600"
                data-icon="mdi:chevron-down"
              ></span>
            </button>
          </div>
        </div>
      </div>
      {/* Slider indicators */}
      {/* <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-white'}`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            data-carousel-slide-to={index}
          />
        ))}
      </div> */}
      {/* Slider controls */}
      {/* <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button> */}
      {/* <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button> */}
    </div>
  );
};

export default Carousel;
