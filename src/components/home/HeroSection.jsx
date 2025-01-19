import React from "react";
import heroBackground from "../../assets/pictures/hero_background.jpg";

const HeroSection = () => {
  return (
    <section className="text-black py-20 mt-32 relative ">
      <div className="container mx-auto text-center">
        <img
          src={heroBackground}
          alt="Hero Background"
          className="absolute inset-0 w-full h-[45vh] object-cover opacity-90"
        />
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          Buy, Sell & Exchange Used Electronics
        </h1>
        <p className="mt-4 text-xl text-white drop-shadow-md">
          Join our community and find the best deals on used devices.
        </p>
        <button className="mt-6 inline-block bg-blue-500 px-12 py-5 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105">
          Join Our Community
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
