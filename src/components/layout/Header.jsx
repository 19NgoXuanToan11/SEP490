import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import original from "../../assets/pictures/logo/original.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div>
          <img src={original} alt="ReTech Logo" className="h-24" />
        </div>
    
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-10">
          <Link
            to="#home"
            className="flex items-center text-white hover:text-blue-300 transition duration-300 text-lg font-semibold"
          >
            <HomeOutlined className="mr-1" /> Home
          </Link>
          <Link
            to="#features"
            className="flex items-center text-white hover:text-blue-300 transition duration-300 text-lg font-semibold"
          >
            <AppstoreAddOutlined className="mr-1" /> Features
          </Link>
          <Link
            to="#services"
            className="flex items-center text-white hover:text-blue-300 transition duration-300 text-lg font-semibold"
          >
            <SettingOutlined className="mr-1" /> Services
          </Link>
          <Link
            to="#about"
            className="flex items-center text-white hover:text-blue-300 transition duration-300 text-lg font-semibold"
          >
            <InfoCircleOutlined className="mr-1" /> About
          </Link>
          <Link
            to="#contact"
            className="flex items-center text-white hover:text-blue-300 transition duration-300 text-lg font-semibold"
          >
            <PhoneOutlined className="mr-1" /> Contact
          </Link>
          <Link
            to="#login"
            className="flex items-center bg-white px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-100 transition duration-300 text-lg font-semibold shadow-md"
          >
            <LoginOutlined className="mr-1" /> Login
          </Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-700 text-white md:hidden">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <Link
                to="#home"
                className="flex items-center hover:text-blue-300 transition duration-300 text-lg"
              >
                <HomeOutlined className="mr-1" /> Home
              </Link>
              <Link
                to="#features"
                className="flex items-center hover:text-blue-300 transition duration-300 text-lg"
              >
                <AppstoreAddOutlined className="mr-1" /> Features
              </Link>
              <Link
                to="#services"
                className="flex items-center hover:text-blue-300 transition duration-300 text-lg"
              >
                <SettingOutlined className="mr-1" /> Services
              </Link>
              <Link
                to="#about"
                className="flex items-center hover:text-blue-300 transition duration-300 text-lg"
              >
                <InfoCircleOutlined className="mr-1" /> About
              </Link>
              <Link
                to="#contact"
                className="flex items-center hover:text-blue-300 transition duration-300 text-lg"
              >
                <PhoneOutlined className="mr-1" /> Contact
              </Link>
              <Link
                to="#login"
                className="flex items-center bg-blue-700 px-5 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-300 text-lg"
              >
                <LoginOutlined className="mr-1" /> Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
