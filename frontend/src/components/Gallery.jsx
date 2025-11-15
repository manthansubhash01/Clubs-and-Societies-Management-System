import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Gallery = () => {
  const galleryImages = [];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f6efe6]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#f3e6d9]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="font-['Playfair_Display'] text-6xl text-[#12202b] mb-6 font-normal text-center">
            Gallery
          </h1>
          <p className="text-center text-[#7b6f61] text-xl max-w-3xl mx-auto">
            Explore our vibrant community through photos from our events,
            activities, and gatherings. These moments capture the essence of our
            diverse and inclusive club culture.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          {galleryImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#7b6f61] text-lg">
                No images available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className={`${image.span} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
