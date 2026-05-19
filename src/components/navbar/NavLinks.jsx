"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/all-facilities" },
];

const privateLinks = [
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Facility", href: "/add-facility" },
  { label: "Manage My Facilities", href: "/manage-facilities" },
];

// All links for desktop nav
const allLinks = [...publicLinks, ...privateLinks];

export default function NavLinks({ onClose, isLoggedIn }) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  // ===== DESKTOP =====
  if (!onClose) {
    return (
      <nav className="hidden md:flex items-center gap-1">
        {allLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(link.href)
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }

  // ===== MOBILE =====
  // When logged in → show only public links here.
  // Private links are rendered below the user card in Navbar.jsx.
  const mobileLinks = isLoggedIn ? publicLinks : allLinks;

  return (
    <div className="flex flex-col gap-1">
      {mobileLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive(link.href)
              ? "bg-green-50 text-green-600 font-semibold border-l-4 border-green-500"
              : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}