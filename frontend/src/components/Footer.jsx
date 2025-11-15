import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1419] text-[#f3e6d9] py-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-3xl text-[#FFC107] mb-4">
              Clubs & Society
            </h3>
            <p className="text-[#b8894a] leading-relaxed">
              Building bridges across cultures and creating lasting connections
            </p>
          </div>
          <div>
            <h4 className="text-white text-xl mb-4 font-semibold">
              Quick Links
            </h4>
            <ul className="list-none p-0">
              <li className="mb-2.5">
                <a
                  href="/dashboard"
                  className="text-[#b8894a] no-underline hover:text-[#FFC107] transition-colors"
                >
                  Home
                </a>
              </li>
              <li className="mb-2.5">
                <a
                  href="/events"
                  className="text-[#b8894a] no-underline hover:text-[#FFC107] transition-colors"
                >
                  Events
                </a>
              </li>
              <li className="mb-2.5">
                <a
                  href="/gallery"
                  className="text-[#b8894a] no-underline hover:text-[#FFC107] transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li className="mb-2.5">
                <a
                  href="/clubs"
                  className="text-[#b8894a] no-underline hover:text-[#FFC107] transition-colors"
                >
                  Clubs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xl mb-4 font-semibold">
              Contact Us
            </h4>
            <ul className="list-none p-0">
              <li className="mb-2.5 text-[#b8894a]">
                Email: info@clubsandsociety.com
              </li>
              <li className="mb-2.5 text-[#b8894a]">Phone: +1 234 567 890</li>
              <li className="mb-2.5 text-[#b8894a]">
                Location: Campus Building A
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[#b8894a]/20 text-[#7b6f61]">
          <p>&copy; 2024 Clubs & Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
