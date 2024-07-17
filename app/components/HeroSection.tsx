import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-900 to-blue-500 text-white py-16">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/hero-background.jpg"
          alt="Tech Solutions Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center md:h-screen">
        <div className="text-center">
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            Welcome to Tech Solutions
          </h2>
          <p className="text-lg mb-8">
            Your partner in innovative technology solutions.
          </p>
          <button className="bg-white text-blue-900 py-2 px-6 rounded-full font-bold shadow-md hover:bg-blue-100 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
