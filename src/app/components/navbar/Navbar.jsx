"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdSportsSoccer } from "react-icons/md";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <MdSportsSoccer className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl text-gray-800">
              Sport<span className="text-green-600">Nest</span>
            </span>
          </Link>

          {/* ===== DESKTOP NAV LINKS ===== */}
          <NavLinks />

          {/* ===== DESKTOP AUTH BUTTONS ===== */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={'/login'}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-green-600 border border-green-500 hover:bg-green-50 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href={'/signup'}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
             Sign Up
            </Link>
          </div>

          {/* ===== HAMBURGER ===== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
          >
            {isOpen
              ? <HiX className="text-2xl" />
              : <HiMenuAlt3 className="text-2xl" />
            }
          </button>

        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">

          {/* mobile nav links */}
          <NavLinks onClose={() => setIsOpen(false)} />

          {/* mobile auth buttons */}
          <div className="flex flex-col gap-2 mt-4 px-1">
            <Link
              href={'/login'}
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-green-600 border border-green-500 hover:bg-green-50 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href={'/signup'}
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}