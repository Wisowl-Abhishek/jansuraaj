import {
  SiTcs,
  SiAccenture,
  SiWipro,
  SiInfosys,
  SiHcl,
  SiGoogle,
  SiCognizant,
  SiFlipkart,
  SiZoho,
  SiNvidia,
} from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserAuth } from "../../context/AuthContext";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const companies = [
  { name: "TCS", icon: <SiTcs size={48} className="text-blue-600" /> },
  { name: "Infosys", icon: <SiInfosys size={48} className="text-sky-500" /> },
  { name: "Wipro", icon: <SiWipro size={48} className="text-purple-500" /> },
  { name: "Accenture", icon: <SiAccenture size={48} className="text-indigo-500" /> },
  { name: "HCL", icon: <SiHcl size={48} className="text-blue-400" /> },
  { name: "Google", icon: <SiGoogle size={48} className="text-red-500" /> },
  { name: "Cognizant", icon: <SiCognizant size={48} className="text-blue-500" /> },
  { name: "Flipkart", icon: <SiFlipkart size={48} className="text-yellow-500" /> },
  { name: "Zoho", icon: <SiZoho size={48} className="text-red-600" /> },
  { name: "NVIDIA", icon: <SiNvidia size={48} className="text-green-500" /> },
];

export default function TopCompaniesSection() {
  const { appUrl } = UserAuth();
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Top Companies Hiring Now
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Exclusive opportunities from India&apos;s leading employers. 
          Find roles that match your skills and increase your chances of getting hired.
        </p>

        {/* ✅ Swiper Carousel Replaces Grid */}
        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 3 },
              480: { slidesPerView: 3 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 7 },
            }}
            spaceBetween={30}
          >
            {companies.map((c) => (
              <SwiperSlide key={c.name}>
                <div className="w-20 h-20 bg-white rounded-xl shadow flex items-center justify-center hover:shadow-lg hover:scale-105 transition mx-auto">
                  {c.icon}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div 
          className="mt-10"
          onClick={()=>{
            if (typeof window !== "undefined" && window.gtag) {
             window.gtag("event", "ClickBrowseMatchingJobsButton", {
             event_category: "LandingPage",
        });
          }}}
          >
          <a
            href={`${appUrl}/signup`} target="_blank"
            className="inline-block bg-brand-gold text-brand-midnight hover:text-brand-midnight font-medium px-6 py-3 rounded shadow hover:bg-brand-amber transition rounded-full"
          >
            Browse Matching Jobs
          </a>
        </div>

      </div>
    </section>
  );
}
