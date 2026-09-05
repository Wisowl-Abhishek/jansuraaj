import React, { useRef } from "react";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Software Developer",
    feedback:
      "Jan Suraaj helped me get matched with roles that actually fit my skills. Within 2 weeks, I received interview calls from 3 companies!",
    image: <User size={48} className="text-gray-400" />,
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Associate",
    feedback:
      "Instead of applying everywhere, Jan Suraaj suggested the right jobs. Saved so much time, and got my offer letter in 21 days.",
    image: <User size={48} className="text-gray-400" />,
  },
  {
    name: "Rohan Verma",
    role: "Data Analyst",
    feedback:
      "I had zero responses before. With Jan Suraaj, I matched with top companies hiring for freshers. Highly recommended!",
    image: <User size={48} className="text-gray-400" />,
  },
  {
    name: "Priya Nair",
    role: "UI/UX Designer",
    feedback:
      "My resume got shortlisted by 4 companies thanks to Jan Suraaj’s job match and resume enhancer tools!",
    image: <User size={48} className="text-gray-400" />,
  },
  {
    name: "Vikram Singh",
    role: "Customer Support Executive",
    feedback:
      "Within a month, I landed a full-time role in a reputed company. Jan Suraaj truly changes the game.",
    image: <User size={48} className="text-gray-400" />,
  },
  {
    name: "Sneha Aggarwal",
    role: "Content Writer",
    feedback:
      "Got 6 interviews lined up in 3 weeks. Jan Suraaj is the best platform if you're tired of ‘no response’!",
    image: <User size={48} className="text-gray-400" />,
  },
];

export default function TestimonialsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 bg-gray-50 relative">
       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Real Stories from Real Job Seekers
        </h2>
        <p className="mt-3 text-gray-600 text-center">
          Join thousands who have transformed their job search with Jan Suraaj.
        </p>
      <div className="max-w-6xl mx-auto px-4 text-center relative">
        {/* ✅ Arrows aligned inside carousel, no background */}
        <button
          ref={prevRef}
          className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 p-1 cursor-pointer bg-white"
        >
          <ChevronLeft className="h-8 w-8 text-gray-600 hover:text-gray-900 transition" />
        </button>

        <button
          ref={nextRef}
          className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 p-1 cursor-pointer bg-white"
        >
          <ChevronRight className="h-8 w-8 text-gray-600 hover:text-gray-900 transition" />
        </button>

        <div className="mt-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-gray-50 p-6 rounded-xl border transition border-gray-200">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
                      {t.image}
                    </div>
                  </div>

                  <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>

                  <div className="flex justify-center mb-2">
                    <Star fill="#eab308" className="h-5 w-5 text-yellow-500" />
                    <Star fill="#eab308" className="h-5 w-5 text-yellow-500" />
                    <Star fill="#eab308" className="h-5 w-5 text-yellow-500" />
                    <Star fill="#eab308" className="h-5 w-5 text-yellow-500" />
                    <Star fill="#eab308" className="h-5 w-5 text-yellow-500" />
                  </div>

                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
