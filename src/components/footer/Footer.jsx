import Link from "next/link";
import { MdSportsSoccer } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/all-facilities" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Facility", href: "/add-facilities" },
  { label: "Manage My Facilities", href: "/manage-facilities" },
];

const facilityTypes = [
  { label: "Football Turf", href: "/facilities?type=football" },
  { label: "Badminton Court", href: "/facilities?type=badminton" },
  { label: "Swimming Lane", href: "/facilities?type=swimming" },
  { label: "Tennis Court", href: "/facilities?type=tennis" },
  { label: "Basketball Court", href: "/facilities?type=basketball" },
];

const socialLinks = [
  {
    icon: <FaFacebookF />,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:bg-blue-600",
  },
  {
    icon: <FaXTwitter />,
    href: "https://x.com",
    label: "X",
    color: "hover:bg-black",
  },
  {
    icon: <FaInstagram />,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:bg-pink-600",
  },
  {
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:bg-blue-700",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com",
    label: "YouTube",
    color: "hover:bg-red-600",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

         
          <div className="flex flex-col gap-5">
           
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-green-600 p-1.5 rounded-lg">
                <MdSportsSoccer className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl text-white">
                Sport<span className="text-green-500">Nest</span>
              </span>
            </Link>

           
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop platform for booking sports facilities. Find and
              reserve football turfs, badminton courts, swimming lanes, and
              more — all in one place.
            </p>

           
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base tracking-wide">
              Quick Links
            </h3>
            <div className="w-10 h-0.5 bg-green-500 rounded-full" />
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-green-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base tracking-wide">
              Facility Types
            </h3>
            <div className="w-10 h-0.5 bg-green-500 rounded-full" />
            <ul className="flex flex-col gap-2.5">
              {facilityTypes.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-green-400 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base tracking-wide">
              Contact Us
            </h3>
            <div className="w-10 h-0.5 bg-green-500 rounded-full" />
            <ul className="flex flex-col gap-4">
              {/* location */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                  <MdLocationOn className="text-green-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <p className="text-sm text-gray-400">
                    123 Sports Avenue, Dhaka, Bangladesh
                  </p>
                </div>
              </li>

             
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                  <MdPhone className="text-green-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <a
                    href="tel:+8801700000000"
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    +880 1700-000000
                  </a>
                </div>
              </li>

             
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                  <MdEmail className="text-green-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a
                    href="mailto:support@sportnest.com"
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    support@sportnest.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {currentYear}{" "}
            <span className="text-green-500 font-medium">SportNest</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/contact"
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}