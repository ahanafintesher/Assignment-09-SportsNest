import {
  MdVerified,
  MdAccessTime,
  MdSupportAgent,
  MdFlashOn,
} from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

const features = [
  {
    icon: <MdFlashOn className="text-3xl text-green-500" />,
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
    title: "Instant Booking",
    description:
      "Book your favorite sports facility in seconds. No waiting, no phone calls — just pick a slot and confirm instantly.",
  },
  {
    icon: <RiSecurePaymentLine className="text-3xl text-blue-500" />,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    title: "Secure Payment",
    description:
      "Your transactions are fully encrypted and protected. Pay with confidence using our trusted payment gateway.",
  },
  {
    icon: <MdVerified className="text-3xl text-purple-500" />,
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
    title: "Verified Facilities",
    description:
      "Every facility listed on SportNest is manually verified for quality, safety, and accurate information.",
  },
  {
    icon: <MdAccessTime className="text-3xl text-yellow-500" />,
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    iconBg: "bg-yellow-100",
    title: "Flexible Time Slots",
    description:
      "Choose from a wide range of available time slots that fit your schedule — morning, evening, or weekend.",
  },
  {
    icon: <MdSupportAgent className="text-3xl text-rose-500" />,
    bg: "bg-rose-50",
    border: "border-rose-100",
    iconBg: "bg-rose-100",
    title: "24/7 Support",
    description:
      "Our support team is always available to help you with bookings, cancellations, or any facility-related queries.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* badge */}
          <span className="px-4 py-1.5 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
            Why SportNest
          </span>

          {/* title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
              Us?
            </span>
          </h2>

          {/* subtitle */}
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            We make sports facility booking simple, fast, and reliable. Here is
            what sets SportNest apart from the rest.
          </p>

          {/* divider */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-10 h-1 bg-green-500 rounded-full" />
            <div className="w-3 h-1 bg-green-300 rounded-full" />
            <div className="w-1.5 h-1 bg-green-200 rounded-full" />
          </div>
        </div>

        {/* ===== CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 p-6 rounded-2xl border ${feature.bg} ${feature.border} hover:shadow-lg transition-all duration-300 group`}
            >
              {/* icon */}
              <div
                className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* bottom accent */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  #{index + 1} Feature
                </span>
              </div>
            </div>
          ))}

          {/* ===== EXTRA CARD — CTA ===== */}
          <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-200 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <MdFlashOn className="text-3xl text-white" />
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <h3 className="text-lg font-bold">Ready to Book?</h3>
              <p className="text-sm text-green-100 leading-relaxed">
                Join thousands of sports enthusiasts already using SportNest
                every day.
              </p>
            </div>
            <a
              href="/facilities"
              className="mt-2 px-6 py-2.5 bg-white text-green-600 font-bold text-sm rounded-xl hover:bg-green-50 transition-colors"
            >
              Explore Now
            </a>
          </div>
        </div>

        {/* ===== BOTTOM STATS BAR ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { number: "500+", label: "Facilities Listed" },
            { number: "10K+", label: "Happy Customers" },
            { number: "50+", label: "Cities Covered" },
            { number: "99%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-white border border-gray-100 rounded-2xl px-4 py-5 shadow-sm hover:border-green-200 transition-all"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-green-500">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}