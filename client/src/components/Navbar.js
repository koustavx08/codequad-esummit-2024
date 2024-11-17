import React, { useState } from 'react';
import Logout from './Logout';

const Navbar = ({ onShowEvent, onShowCoding, onShowVideo, currentStep }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getButtonClass = (step) => {
    return `animated-button ${currentStep === step ? 'bg-blue-700' : ''}`;
  };

  return (
    <nav className="bg-black p-4 text-white fixed w-full top-0 shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="hidden md:flex space-x-4">
          <button
            onClick={onShowEvent}
            className={getButtonClass('event')}
          >
            Event Form
          </button>
          <button
            onClick={onShowCoding}
            className={getButtonClass('coding')}
          >
            Online Coding
          </button>
          <button
            onClick={onShowVideo}
            className={getButtonClass('video')}
          >
            Live Video
          </button>
          <Logout />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <button
            onClick={onShowEvent}
            className={`${getButtonClass('event')} w-full text-left mb-2`}
          >
            Event Form
          </button>
          <button
            onClick={onShowCoding}
            className={`${getButtonClass('coding')} w-full text-left mb-2`}
          >
            Online Coding
          </button>
          <button
            onClick={onShowVideo}
            className={`${getButtonClass('video')} w-full text-left mb-2`}
          >
            Live Video
          </button>
          <Logout />
        </div>
      )}
    </nav>
  );
};

export default Navbar;