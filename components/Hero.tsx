import React from 'react';
import { Link } from 'react-router-dom';
import PixelBlast from './PixelBlast';

const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <PixelBlast
        className="absolute inset-0"
        variant="square"
        color="#6366F1"
        pixelSize={4}
        patternScale={2.5}
        patternDensity={0.8}
        liquid={true}
        liquidStrength={0.15}
        liquidRadius={1}
        enableRipples={true}
        rippleIntensityScale={1.2}
        rippleThickness={0.1}
        rippleSpeed={0.4}
        speed={0.4}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:py-32">
        <div
          className="bg-white/5 dark:bg-white/5 bg-white/80 backdrop-blur-md rounded-2xl p-10 sm:p-12 lg:p-16 shadow-2xl border border-white/10 dark:border-white/10 border-gray-200 animate-fade-in-up"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Reuniting What's Lost, <br /> Sharing What's Found.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
            The central hub for our campus community to report lost items,
            post found belongings, and access shared academic notes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/lost-and-found" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transform transition">
              🔎 Explore Lost & Found
            </Link>
            <Link to="/notes" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/10 dark:border-white/10 border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 transition">
              📘 Browse Notes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
