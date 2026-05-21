"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdSportsSoccer } from "react-icons/md";
import { Avatar } from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);     // mobile menu
  const [dropOpen, setDropOpen] = useState(false); // desktop dropdown

  const dropdownRef = useRef(null);

  // ✅ Better Auth Session
  const session = authClient.useSession();
  const user = session.data?.user;

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
    setDropOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="rounded-lg bg-green-600 p-1.5">
              <MdSportsSoccer className="text-xl text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Sport<span className="text-green-600">Nest</span>
            </span>
          </Link>

          {/* ===== DESKTOP NAV LINKS ===== */}
          <NavLinks />

          {/* ===== DESKTOP RIGHT SIDE ===== */}
          <div className="hidden items-center gap-2 md:flex">
            {user ? (

              /* ── CUSTOM DROPDOWN ── */
              <div className="relative" ref={dropdownRef}>

                {/* TRIGGER: Avatar + Name */}
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all hover:bg-gray-100"
                >
                  <Avatar
                    src={user.image || undefined}
                    name={user.name || "User"}
                    size="sm"
                    color="success"
                    showFallback
                    className="transition-transform hover:scale-105"
                  />
                  <span className="max-w-[120px] truncate text-sm font-semibold text-gray-800">
                    {user.name}
                  </span>
                  {/* caret */}
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      dropOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* DROPDOWN PANEL */}
                {dropOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    {/* User info header */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3">
                      <Avatar
                        src={user.image || undefined}
                        name={user.name || "User"}
                        size="sm"
                        color="success"
                        showFallback
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Menu items */}
                    <div className="p-1.5">
                      <Link
                        href="/my-bookings"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <span>📅</span> My Bookings
                      </Link>

                      <Link
                        href="/add-facilities"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <span>➕</span> Add Facility
                      </Link>

                      <Link
                        href="/manage-facilities"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <span>⚙️</span> Manage My Facilities
                      </Link>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Logout */}
                    <div className="p-1.5">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-green-500 px-4 py-1.5 text-sm font-semibold text-green-600 transition-colors duration-200 hover:bg-green-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 md:hidden"
          >
            {isOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenuAlt3 className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-gray-100 bg-white px-4 py-4">

          {/* Public links (+ private links when logged out) */}
          <NavLinks onClose={() => setIsOpen(false)} isLoggedIn={!!user} />

          {/* ── LOGGED IN: user card + private links ── */}
          {user && (
            <>
              {/* User info card */}
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <Avatar
                  src={user.image || undefined}
                  name={user.name || "User"}
                  size="sm"
                  color="success"
                  showFallback
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Private links — only here, not in NavLinks */}
              <div className="mt-1 flex flex-col gap-0.5">
                <Link
                  href={"/my-bookings"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-green-600"
                >
                  📅 My Bookings
                </Link>

                <Link
                  href={"/add-facilities"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-green-600"
                >
                  ➕ Add Facility
                </Link>

                <Link
                  href={"/manage-facilities"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-green-600"
                >
                  ⚙️ Manage My Facilities
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </div>
            </>
          )}

          {/* ── LOGGED OUT: login + signup ── */}
          {!user && (
            <div className="mt-4 flex flex-col gap-2 px-1">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl border border-green-500 px-4 py-2.5 text-center text-sm font-semibold text-green-600 transition-colors duration-200 hover:bg-green-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}