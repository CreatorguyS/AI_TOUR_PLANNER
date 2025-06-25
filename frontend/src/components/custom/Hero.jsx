import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col items-center px-4 md:px-20 lg:px-56 gap-8 text-center">
      <h2 className="font-extrabold text-[40px] sm:text-[50px] md:text-[60px] mt-16 leading-tight">
        <span className="text-[#f56551]">Discover Your Next Adventure with </span>
        AI: Personalized Itineraries at Your Fingertips
      </h2>

      <p className="text-lg md:text-xl text-gray-500">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
      </p>

      <Link to="/create-trip">
        <Button>Get Started, It's free</Button>
      </Link>

      <div className="w-full max-w-[1000px] h-[400px] mt-8">
        <img
          src="/travel.jpg"
          alt="Travel"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
