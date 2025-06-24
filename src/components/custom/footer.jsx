import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Increment visitor count in localStorage (client-side only)
    const count = Number(localStorage.getItem('visitorCount') || 0) + 1;
    localStorage.setItem('visitorCount', count);
    setVisitorCount(count);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 py-3 px-2 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Left: Crafted with love AiGo */}
        <div className="flex items-center mb-3 md:mb-0">
          <span className="mr-1 text-lg md:text-xl font-bold">Crafted with</span>
          <span
            role="img"
            aria-label="love"
            className="text-[#f56551] animate-pulse mx-1 text-lg md:text-xl"
          >
            ❤️
          </span>
          <span className="text-[#f56551] ml-1 text-lg md:text-xl font-bold">Ai</span>
          <span className="text-gray-700 ml-1 text-lg md:text-xl font-bold">Go</span>
        </div>

        {/* Right: Navigation, visitor count, copyright */}
        <div className="flex flex-col items-center md:items-end">
          <nav className="flex space-x-6 mb-2 md:mb-1">
            <Link
              to="/"
              className="text-gray-700 text-base font-medium pb-0.5 border-b-2 border-transparent hover:border-[#f56551] hover:text-[#f56551] transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/create-trip"
              className="text-gray-700 text-base font-medium pb-0.5 border-b-2 border-transparent hover:border-[#f56551] hover:text-[#f56551] transition-all duration-200"
            >
              Create Trip
            </Link>
          </nav>
          {/* Visitor Count */}
          <div className="flex flex-col items-center mb-1">
            <span className="text-gray-600 text-xs font-semibold mb-0.5">Page Visitors</span>
            <span className="text-[#f56551] text-lg font-bold animate-bounce transition-all duration-500">
              {visitorCount.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 mt-0.5 animate-fade-in">Thank you for visiting!</span>
          </div>
          <div className="text-gray-500 text-xs text-center md:text-right">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-700">AiGO</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
