import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold text-white">SPOILERS</h1>
            <p className="text-sm mt-1">Social film discovery</p>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-yellow-500 transition">HOME</a>
            <a href="/about" className="hover:text-yellow-500 transition">ABOUT</a>
            <a href="/contact" className="hover:text-yellow-500 transition">CONTACT</a>
          </div>

          <div className="flex gap-5 text-lg">
            <a href="#" className="hover:text-yellow-500 transition"><FaGithub /></a>
            <a href="#" className="hover:text-yellow-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-500 transition"><FaLinkedin /></a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
