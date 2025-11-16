import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Cultural Night 2024",
      date: "15",
      month: "DEC",
      year: "2024",
      description:
        "Experience diverse cultures through music, dance, and cuisine from around the world",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      category: "Cultural",
      attendees: 120,
    },
    {
      id: 2,
      title: "International Food Festival",
      date: "20",
      month: "DEC",
      year: "2024",
      description:
        "Taste authentic dishes from around the world prepared by our international students",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Grounds",
      category: "Social",
      attendees: 200,
    },
    {
      id: 3,
      title: "Language Exchange Meetup",
      date: "05",
      month: "JAN",
      year: "2025",
      description:
        "Practice languages and make new friends in a casual, fun environment",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
      time: "4:00 PM - 6:00 PM",
      location: "Student Lounge",
      category: "Educational",
      attendees: 45,
    },
    {
      id: 4,
      title: "Tech Hackathon 2025",
      date: "18",
      month: "JAN",
      year: "2025",
      description:
        "48-hour coding challenge to build innovative solutions for real-world problems",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
      time: "9:00 AM - 9:00 PM",
      location: "Tech Hub",
      category: "Technical",
      attendees: 80,
    },
  ];

  const ongoingEvents = [
    {
      id: 5,
      title: "Annual Sports Week",
      date: "10",
      month: "NOV",
      year: "2024",
      endDate: "17 NOV",
      description:
        "Week-long sports tournament featuring cricket, football, basketball, and more",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
      time: "All Day",
      location: "Sports Complex",
      category: "Sports",
      attendees: 350,
    },
    {
      id: 6,
      title: "Art Exhibition Week",
      date: "12",
      month: "NOV",
      year: "2024",
      endDate: "19 NOV",
      description:
        "Showcase of artwork from talented students across various mediums",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
      time: "10:00 AM - 6:00 PM",
      location: "Art Gallery",
      category: "Arts",
      attendees: 150,
    },
  ];

  const pastEvents = [
    {
      id: 7,
      title: "Freshers Welcome Party",
      date: "15",
      month: "SEP",
      year: "2024",
      description:
        "Grand welcome celebration for new students with performances and activities",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
      time: "5:00 PM - 10:00 PM",
      location: "Main Grounds",
      category: "Social",
      attendees: 450,
    },
    {
      id: 8,
      title: "Alumni Meetup 2024",
      date: "22",
      month: "SEP",
      year: "2024",
      description:
        "Networking event connecting current students with successful alumni",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
      time: "6:00 PM - 9:00 PM",
      location: "Conference Hall",
      category: "Networking",
      attendees: 200,
    },
    {
      id: 9,
      title: "Robotics Workshop",
      date: "05",
      month: "OCT",
      year: "2024",
      description:
        "Hands-on workshop on building and programming autonomous robots",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
      time: "2:00 PM - 6:00 PM",
      location: "Engineering Lab",
      category: "Technical",
      attendees: 60,
    },
    {
      id: 10,
      title: "Diwali Celebration",
      date: "01",
      month: "NOV",
      year: "2024",
      description:
        "Traditional Diwali festival celebration with lights, music, and sweets",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      time: "7:00 PM - 11:00 PM",
      location: "Main Auditorium",
      category: "Cultural",
      attendees: 300,
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f6efe6]">
      <Navbar />

      <section className="pt-32 pb-12 bg-gradient-to-b from-[#f3e6d9] to-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="font-['Playfair_Display'] text-6xl text-[#12202b] mb-6 font-normal text-center">
            Events
          </h1>
          <p className="text-center text-[#7b6f61] text-xl max-w-3xl mx-auto">
            Join us for exciting events that celebrate diversity, culture, and
            community. From cultural festivals to educational workshops, there's
            something for everyone.
          </p>
        </div>
      </section>

      <section className="py-8 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-[#FFC107] mb-2">
                {upcomingEvents.length}
              </div>
              <div className="text-[#7b6f61] text-sm tracking-wider">
                UPCOMING EVENTS
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-[#FFC107] mb-2">
                {ongoingEvents.length}
              </div>
              <div className="text-[#7b6f61] text-sm tracking-wider">
                ONGOING EVENTS
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-[#FFC107] mb-2">
                {pastEvents.length}
              </div>
              <div className="text-[#7b6f61] text-sm tracking-wider">
                PAST EVENTS
              </div>
            </div>
          </div>
        </div>
      </section>

      {ongoingEvents.length > 0 && (
        <section className="py-16 bg-[#f6efe6]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-['Playfair_Display'] text-4xl text-[#12202b] font-normal">
                Ongoing Events
              </h2>
              <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-sm font-bold">LIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded-lg text-center font-bold shadow-lg">
                      <span className="block text-2xl leading-none">
                        {event.date}
                      </span>
                      <span className="block text-xs tracking-widest uppercase">
                        {event.month}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#12202b] px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                      {event.category}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider animate-pulse">
                      LIVE NOW
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-[#7b6f61] mb-4 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                        <svg
                          className="w-4 h-4 text-[#b8894a]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                        <svg
                          className="w-4 h-4 text-[#b8894a]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                        <svg
                          className="w-4 h-4 text-[#b8894a]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    <button className="w-full bg-[#FFC107] text-[#12202b] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8894a] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      Join Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-[#f3e6d9]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#12202b] mb-8 font-normal">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded-lg text-center font-bold shadow-lg">
                    <span className="block text-2xl leading-none">
                      {event.date}
                    </span>
                    <span className="block text-xs tracking-widest uppercase">
                      {event.month}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#12202b] px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-[#7b6f61] mb-4 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#b8894a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#12202b] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#12202b] mb-8 font-normal">
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#FFC107] text-[#12202b] px-4 py-2 rounded-lg text-center font-bold shadow-lg">
                    <span className="block text-2xl leading-none">
                      {event.date}
                    </span>
                    <span className="block text-xs tracking-widest uppercase">
                      {event.month}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#12202b] px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-2xl text-[#12202b] mb-3 font-semibold line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-[#7b6f61] mb-4 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#7b6f61]">
                      <svg
                        className="w-4 h-4 text-[#b8894a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#ECD6B4] text-[#12202b] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8894a] hover:text-white transition-all">
                    View Highlights
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
