import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Experience Global Connections and Unity",
      subtitle:
        "Join our club and celebrate diversity, culture, and meaningful connections. Be a part of a vibrant international community",
      image:
        "https://images.unsplash.com/photo-1590161311659-852a5207c5b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Connect with Students Worldwide",
      subtitle:
        "Build lasting friendships and expand your global network through our diverse community events",
      image:
        "https://images.unsplash.com/photo-1714976326749-a51805fa9c20?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cultural Events and Celebrations",
      subtitle:
        "Experience the richness of different cultures through our exciting events and activities",
      image:
        "https://images.unsplash.com/photo-1744232255607-cad8c181b221?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcHVzJTIwY2x1YiUyMGV2ZW50fGVufDB8fDB8fHww",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <section className="relative h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 flex items-center ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
              <div className="relative z-10 max-w-[1400px] mx-auto px-12 text-white">
                <h1 className="font-['Playfair_Display'] text-6xl font-normal leading-tight mb-6 max-w-[700px] drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl leading-relaxed mb-10 max-w-[600px] opacity-95">
                  {slide.subtitle}
                </p>
                <button className="bg-[#FFC107] text-[#12202b] px-12 py-4 rounded font-bold text-base tracking-widest hover:bg-black hover:text-[#FFC107] transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border-none text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border-none text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full border-none transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1683121680448-ef3047b9351a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <h2 className="font-['Playfair_Display'] text-5xl text-[#12202b] mb-6 font-normal">
                About Our Platform
              </h2>
              <p className="text-[#7b6f61] text-lg leading-relaxed mb-6">
                Welcome to the central hub for all clubs and societies at our
                university. Our platform connects students with diverse
                organizations spanning cultural, technical, sports, arts, and
                social causes.
              </p>
              <p className="text-[#7b6f61] text-lg leading-relaxed mb-6">
                Discover clubs that match your interests, stay updated on
                upcoming events, and become part of a vibrant campus community.
                Whether you're looking to develop new skills, pursue your
                passions, or make lasting friendships, there's a club for
                everyone.
              </p>
              <button className="bg-[#b8894a] text-white px-10 py-3.5 rounded font-semibold hover:bg-[#12202b] transition-all hover:-translate-y-0.5 mt-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f3e6d9]" id="events">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-5xl text-[#12202b] text-center mb-12 font-normal">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                  alt="Event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded text-center font-bold shadow-lg">
                  <span className="block text-2xl leading-none">15</span>
                  <span className="block text-xs tracking-widest">DEC</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold">
                  Cultural Night 2024
                </h3>
                <p className="text-[#7b6f61] mb-6 leading-relaxed">
                  Experience diverse cultures through music, dance, and cuisine
                </p>
                <button className="w-full bg-[#b8894a] text-white px-8 py-2.5 rounded font-semibold hover:bg-[#12202b] transition-all">
                  Register Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80"
                  alt="Event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded text-center font-bold shadow-lg">
                  <span className="block text-2xl leading-none">20</span>
                  <span className="block text-xs tracking-widest">DEC</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold">
                  International Food Festival
                </h3>
                <p className="text-[#7b6f61] mb-6 leading-relaxed">
                  Taste authentic dishes from around the world
                </p>
                <button className="w-full bg-[#b8894a] text-white px-8 py-2.5 rounded font-semibold hover:bg-[#12202b] transition-all">
                  Register Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80"
                  alt="Event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded text-center font-bold shadow-lg">
                  <span className="block text-2xl leading-none">05</span>
                  <span className="block text-xs tracking-widest">JAN</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold">
                  Language Exchange Meetup
                </h3>
                <p className="text-[#7b6f61] mb-6 leading-relaxed">
                  Practice languages and make new friends
                </p>
                <button className="w-full bg-[#b8894a] text-white px-8 py-2.5 rounded font-semibold hover:bg-[#12202b] transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f6efe6]" id="gallery">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-5xl text-[#12202b] mb-12 font-normal">
            Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1761901219072-491a18f3ccd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gallery 1"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1731160352698-cb7e2f142d7a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gallery 2"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                alt="Gallery 3"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80"
                alt="Gallery 4"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gallery 5"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
                alt="Gallery 6"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <img
                src="https://images.unsplash.com/photo-1695771079040-ef65e928944b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gallery 7"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/gallery")}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#12202b] text-[#12202b] px-8 py-3 rounded font-semibold hover:bg-[#12202b] hover:text-white transition-all"
            >
              VIEW ALL
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f3e6d9]">
        <div className="max-w-[1300px] mx-auto px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 py-24 px-8 text-center text-white">
              <p className="text-lg mb-2 tracking-wide">Newsletter</p>
              <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl font-normal mb-6">
                Stay Updated
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed opacity-95">
                "Never miss an update! Subscribe to our newsletter and get the
                latest news on events, activities, and opportunities directly in
                your inbox."
              </p>

              <form className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 w-full sm:w-auto px-6 py-4 rounded-lg text-[#12202b] text-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
                />
                <button className="w-full sm:w-auto bg-[#8B6F47] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#12202b] transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#062937] text-center">
        <div className="max-w-[700px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-5xl text-white mb-4 font-normal">
            Ready to Join Our Community?
          </h2>
          <p className="text-[#f3e6d9] text-xl mb-10">
            Become a part of our vibrant international community today
          </p>
          <button className="bg-[#FFC107] text-[#12202b] px-12 py-4 rounded font-bold text-lg tracking-wide hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl">
            Apply for Membership
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
