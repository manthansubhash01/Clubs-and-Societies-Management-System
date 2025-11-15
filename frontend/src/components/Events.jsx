import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Cultural Night 2024",
      date: "15",
      month: "DEC",
      description:
        "Experience diverse cultures through music, dance, and cuisine from around the world",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
    },
    {
      id: 2,
      title: "International Food Festival",
      date: "20",
      month: "DEC",
      description:
        "Taste authentic dishes from around the world prepared by our international students",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Grounds",
    },
    {
      id: 3,
      title: "Language Exchange Meetup",
      date: "05",
      month: "JAN",
      description:
        "Practice languages and make new friends in a casual, fun environment",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
      time: "4:00 PM - 6:00 PM",
      location: "Student Lounge",
    },
    {
      id: 4,
      title: "Global Music Night",
      date: "12",
      month: "JAN",
      description:
        "Live performances featuring music from different cultures and traditions",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80",
      time: "7:00 PM - 10:00 PM",
      location: "Theater Hall",
    },
    {
      id: 5,
      title: "Sports Tournament",
      date: "20",
      month: "JAN",
      description:
        "Friendly competition featuring traditional sports from various countries",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
      time: "9:00 AM - 5:00 PM",
      location: "Sports Complex",
    },
    {
      id: 6,
      title: "Art Exhibition",
      date: "28",
      month: "JAN",
      description:
        "Showcase of artwork created by our talented international student community",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
      time: "10:00 AM - 6:00 PM",
      location: "Art Gallery",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f3e6d9]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="font-['Playfair_Display'] text-6xl text-[#12202b] mb-6 font-normal text-center">
            Upcoming Events
          </h1>
          <p className="text-center text-[#7b6f61] text-xl max-w-3xl mx-auto">
            Join us for exciting events that celebrate diversity, culture, and
            community. From cultural festivals to educational workshops, there's
            something for everyone.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-[#f3e6d9]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded text-center font-bold shadow-lg">
                    <span className="block text-2xl leading-none">
                      {event.date}
                    </span>
                    <span className="block text-xs tracking-widest">
                      {event.month}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold">
                    {event.title}
                  </h3>
                  <p className="text-[#7b6f61] mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[#7b6f61]">
                      <span className="font-semibold text-[#12202b]">
                        Time:
                      </span>{" "}
                      {event.time}
                    </p>
                    <p className="text-sm text-[#7b6f61]">
                      <span className="font-semibold text-[#12202b]">
                        Location:
                      </span>{" "}
                      {event.location}
                    </p>
                  </div>
                  <button className="w-full bg-[#b8894a] text-white px-8 py-2.5 rounded font-semibold hover:bg-[#12202b] transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
