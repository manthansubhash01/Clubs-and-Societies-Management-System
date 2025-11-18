import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const galleryImages = [
    // {
    //   id: 1,
    //   src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   alt: "Students collaborating on project",
    //   category: "Events",
    //   title: "Tech Workshop 2024",
    //   date: "Nov 2024",
    // },
    // {
    //   id: 2,
    //   src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    //   alt: "Cultural event celebration",
    //   category: "Cultural",
    //   title: "Cultural Night",
    //   date: "Oct 2024",
    // },
    // {
    //   id: 3,
    //   src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    //   alt: "Workshop session in progress",
    //   category: "Workshops",
    //   title: "Leadership Summit",
    //   date: "Sep 2024",
    // },
    // {
    //   id: 4,
    //   src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    //   alt: "Student meetup gathering",
    //   category: "Social",
    //   title: "Welcome Party",
    //   date: "Aug 2024",
    // },
    // {
    //   id: 5,
    //   src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    //   alt: "Group discussion session",
    //   category: "Workshops",
    //   title: "Innovation Lab",
    //   date: "Nov 2024",
    // },
    // {
    //   id: 6,
    //   src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    //   alt: "Team activity event",
    //   category: "Sports",
    //   title: "Sports Day",
    //   date: "Oct 2024",
    // },
    // {
    //   id: 7,
    //   src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    //   alt: "Community gathering",
    //   category: "Events",
    //   title: "Annual Meetup",
    //   date: "Sep 2024",
    // },
    // {
    //   id: 8,
    //   src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    //   alt: "Presentation session",
    //   category: "Cultural",
    //   title: "Art Exhibition",
    //   date: "Nov 2024",
    // },
    // {
    //   id: 9,
    //   src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    //   alt: "Social event gathering",
    //   category: "Social",
    //   title: "Networking Night",
    //   date: "Oct 2024",
    // },
    // {
    //   id: 10,
    //   src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    //   alt: "Study group session",
    //   category: "Workshops",
    //   title: "Study Session",
    //   date: "Nov 2024",
    // },
    // {
    //   id: 11,
    //   src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    //   alt: "Team meeting discussion",
    //   category: "Events",
    //   title: "Team Building",
    //   date: "Sep 2024",
    // },
    // {
    //   id: 12,
    //   src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    //   alt: "Sports tournament",
    //   category: "Sports",
    //   title: "Cricket Tournament",
    //   date: "Oct 2024",
    // },
  ];

  const categories = [
    "all",
    ...new Set(galleryImages.map((img) => img.category)),
  ];

  const filteredImages =
    filterCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filterCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f6efe6]">
      <Navbar />

      <section className="pt-32 pb-12 bg-gradient-to-b from-[#f3e6d9] to-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="font-['Playfair_Display'] text-6xl text-[#12202b] mb-6 font-normal text-center">
            Gallery
          </h1>
          <p className="text-center text-[#7b6f61] text-xl max-w-3xl mx-auto mb-8">
            Explore our vibrant community through photos from our events,
            activities, and gatherings. These moments capture the essence of our
            diverse and inclusive club culture.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm tracking-wider transition-all ${
                  filterCategory === category
                    ? "bg-[#FFC107] text-[#12202b] shadow-lg"
                    : "bg-white text-[#7b6f61] hover:bg-[#ECD6B4]"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f6efe6]">
        <div className="max-w-[1400px] mx-auto px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#ECD6B4] mb-6">
                <svg
                  className="w-12 h-12 text-[#7b6f61]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-['Playfair_Display'] text-[#12202b] mb-3">
                No Images Yet
              </h3>
              <p className="text-[#7b6f61] text-lg">
                Check back soon for amazing photos from our events!
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-[#7b6f61] text-sm tracking-wider">
                  SHOWING {filteredImages.length}{" "}
                  {filteredImages.length === 1 ? "IMAGE" : "IMAGES"}
                </p>
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="break-inside-avoid group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-white font-semibold text-lg mb-1">
                            {image.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">
                              {image.category}
                            </span>
                            <span className="text-white/80 text-sm">
                              {image.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-[#FFC107] text-[#12202b] px-3 py-1 rounded-full text-xs font-semibold tracking-wider shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-[#FFC107] transition-colors z-10"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 text-white hover:text-[#FFC107] transition-colors z-10"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 text-white hover:text-[#FFC107] transition-colors z-10"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-['Playfair_Display'] mb-2">
                {selectedImage.title}
              </h3>
              <div className="flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {selectedImage.category}
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {selectedImage.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
