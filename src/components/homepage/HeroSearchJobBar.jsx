"use client"

import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Search, MapPin } from "lucide-react"; // ✅ Import Icons
import { searchCookieHandler } from "../../utils/searchCookieHandler";

export default function HeroSearchJobBar({ onSearch }) {
  const [keywords, setKeywords] = useState("");
  const [experience, setExperience] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const { appUrl } = UserAuth();

  const availableLocations = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan", "Vasai", "Varanasi", "Srinagar",
    "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad (Prayagraj)", "Ranchi", "Howrah", "Coimbatore",
    "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur",
    "Hubli-Dharwad", "Bareilly", "Mysore", "Tiruchirappalli", "Gurgaon", "Aligarh", "Jalandhar", "Bhubaneswar",
    "Salem", "Mira-Bhayandar", "Warangal", "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur",
    "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar",
    "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Loni", "Ujjain",
    "Jhansi", "Jammu", "Belgaum", "Mangalore", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala",
    "Tiruppur", "Davanagere", "Kozhikode", "Kurnool", "Rajahmundry", "Bokaro", "South Dumdum", "All", "Greater Noida", "Greater Noida West"
  ];

  const filteredSuggestions = availableLocations.filter(
    (loc) =>
      loc.toLowerCase().includes(locationInput.toLowerCase()) &&
      !locations.includes(loc)
  );

  const addLocation = (value) => {
    if (!value) return;
    if (!locations.includes(value)) {
      setLocations([...locations, value]);
    }
    setLocationInput("");
    setShowSuggestions(false);
    setHighlightIndex(-1);
  };

  const removeLocation = (loc) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  const submitSearch = () => {
    onSearch({ keywords, experience, locations });
  };

  return (
    <>
      <div className="w-full bg-none md:bg-white px-4 py-2 rounded-full border-none md:border space-y-3 text-black font-sm  shadow-none md:shadow-md shadow-black/20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

          {/* ✅ SKILLS SEARCH FIELD WITH ICON */}
          <div className="relative md:col-span-4">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Skills / Designation / Company"
              className="pl-10 py-2 w-full outline-none border-r border-gray-300 rounded-md md:rounded-none placeholder:text-black bg-white"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className="md:col-span-3 pr-0 md:pr-3 border-r border-transparent md:border-gray-300">
            <select
              className="px-3 py-2 w-full outline-none  rounded-md md:rounded-none bg-white"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Select Experience</option>
              <option value="0-1">Fresher</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5-10">5 - 10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>

          {/* ✅ LOCATION INPUT WITH MAP ICON */}
          <div className="relative w-full md:col-span-3">
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Add Location"
              className="pl-10 pr-3 py-2 w-full outline-none border-none rounded-md md:rounded-none placeholder:text-black bg-white"
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (highlightIndex >= 0) {
                    addLocation(filteredSuggestions[highlightIndex]);
                  } else {
                    addLocation(locationInput);
                  }
                }
                if (e.key === "ArrowDown") {
                  setHighlightIndex((prev) =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                  );
                }
                if (e.key === "ArrowUp") {
                  setHighlightIndex((prev) =>
                    prev > 0 ? prev - 1 : -1
                  );
                }
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />

            {/* ✅ Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute w-full bg-white border rounded shadow max-h-40 overflow-y-auto mt-1 z-10">
                {filteredSuggestions.map((loc, index) => (
                  <li
                    key={loc}
                    onClick={() => addLocation(loc)}
                    className={`px-3 py-2 cursor-pointer hover:bg-brand-indigo/10 ${highlightIndex === index ? "bg-brand-indigo/10" : ""
                      }`}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {locations.length > 0 && (
            <div className="grid-cols-1 md:grid-cols-12 grid sm:hidden">
              <div className="md:col-span-7"></div>
              <div className="md:col-span-5 flex gap-2 mt-1 flex-wrap">
                {locations.map((loc) => (
                  <span
                    key={loc}
                    className="bg-brand-indigo text-white pl-2 rounded-full text-sm relative pr-6"
                  >
                    {loc}
                    <button
                      className="text-red-500 font-bold p-0 absolute w-4 h-4 hover:border-transparent text-[10px] leading-none top-[2px] right-[2px]"
                      onClick={() => removeLocation(loc)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => {
              let finalLocations = [...locations];

              // ✅ If user typed location but didn’t press Enter
              if (locationInput.trim() && !finalLocations.includes(locationInput.trim())) {
                finalLocations.push(locationInput.trim());
              }
              const searchData = {
                keywords,
                experience,
                locations
              };
              // 🔹 Save search data in cookie
              searchCookieHandler(searchData);
              console.log("Search Data Saved in Cookie:", searchData);
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", 'ClickSignupButtonHeroBanner', {
                  event_category: 'LandingPage'
                });
              }
              window.open(`${appUrl}/signup`, '_blank')
              // window.open("http://localhost:3000/signup", '_blank')
            }}
            className="bg-brand-gold text-brand-midnight px-4 py-2 rounded-full w-full md:col-span-2 hover:bg-brand-amber transition font-medium"
          >
            Search
          </button>

        </div>
      </div>
      {/* ✅ Chips */}
      {locations.length > 0 && (
        <div className="grid-cols-1 md:grid-cols-12 hidden sm:grid">
          <div className="md:col-span-7"></div>
          <div className="md:col-span-5 flex gap-2 mt-2 flex-wrap">
            {locations.map((loc) => (
              <span
                key={loc}
                className="bg-brand-indigo text-white pl-2 rounded-full text-sm relative pr-6"
              >
                {loc}
                <button
                  className="text-red-500 font-bold p-0 absolute w-4 h-4 hover:border-transparent text-[10px] leading-none top-[2px] right-[2px]"
                  onClick={() => removeLocation(loc)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
