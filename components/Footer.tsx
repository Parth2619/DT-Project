import React from 'react';
import { LogoIcon } from '../constants';

const Footer = () => {
  return (
    <footer className="dark:bg-neutral-dark/50 bg-neutral-light border-t dark:border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center gap-3">
            <LogoIcon className="h-7 w-7" />
            <span className="text-xl font-semibold tracking-tight">
              L&F Portal
            </span>
          </a>
          <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">
            A central hub for our campus community. Reuniting what's lost, sharing what's found.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              About
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              Contact
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;