import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-800 text-white p-4 justify-between">
      <h1 className="mx-auto text-2xl font-bold">Maria Area</h1>
      <nav>
        <ul className="flex items-center space-x-5">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
