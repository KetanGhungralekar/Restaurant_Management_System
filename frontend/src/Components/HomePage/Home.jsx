import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_restaurants } from "../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

// Mock data for restaurants
const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: "Gourmet Haven",
    cuisine: "Contemporary Fusion",
    description: "Experience modern culinary artistry",
  },
  {
    id: 2,
    name: "Spice Route",
    cuisine: "Indian Cuisine",
    description: "Authentic flavors from India",
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japanese",
    description: "Fresh and authentic Japanese dishes",
  },
  {
    id: 4,
    name: "Mediterranean Delight",
    cuisine: "Mediterranean",
    description: "Flavors of the Mediterranean coast",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    description: "Authentic Mexican street food",
  },
  {
    id: 6,
    name: "Pasta Paradise",
    cuisine: "Italian",
    description: "Handmade pasta and authentic sauces",
  },
  {
    id: 7,
    name: "Dragon Wok",
    cuisine: "Chinese",
    description: "Traditional Chinese cuisine",
  },
  {
    id: 8,
    name: "BBQ Kingdom",
    cuisine: "American BBQ",
    description: "Smoked meats and classic sides",
  },
];

const ScrollableSection = ({ children, title }) => {
  const scrollLeft = () => {
    const container = document.getElementById(title);
    container.scrollLeft -= container.offsetWidth / 2;
  };

  const scrollRight = () => {
    const container = document.getElementById(title);
    container.scrollLeft += container.offsetWidth / 2;
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-900/50 p-2 rounded-r-lg hover:bg-blue-800/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-900/50 p-2 rounded-l-lg hover:bg-blue-800/50 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      <div
        id={title}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 py-4 px-8"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(get_all_restaurants(token));
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const scrollPosition = window.scrollY + window.innerHeight;
      const newIsVisible = {};

      document.querySelectorAll("[data-scroll-section]").forEach((element) => {
        const position = element.offsetTop;
        newIsVisible[element.id] = scrollPosition > position;
      });
      setIsVisible(newIsVisible);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(restaurant);
  const FadeInSection = ({ children, id }) => {
    const fadeClass = isVisible[id]
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10";

    return (
      <div
        id={id}
        data-scroll-section
        className={`transform transition-all duration-1000 ${fadeClass}`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 opacity-20">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 100}ms`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div
          className="text-center z-10 px-4"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            FeastFinder Hub
          </h1>
          <p className="text-xl md:text-3xl text-blue-200">
            Experience Culinary Excellence
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Featured Meals Section */}
      {/* <FadeInSection id="featured">
        <section className="py-20 px-4 md:px-10">
          <h2 className="text-3xl font-bold text-white mb-12 relative px-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Featured Meals
            </span>
            <div className="absolute -bottom-2 left-8 w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          </h2>
          <ScrollableSection title="featured-meals">
            {MOCK_RESTAURANTS.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex-none w-72 bg-blue-900/30 backdrop-blur-sm rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-blue-800/50"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/api/placeholder/400/300"
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-blue-200">{item.description}</p>
                </div>
              </div>
            ))}
          </ScrollableSection>
        </section>
      </FadeInSection> */}

      {/* Restaurant Grid Section */}
      <FadeInSection id="restaurants">
        <section className="py-20 px-4 md:px-10 bg-blue-950/50">
          <h2 className="text-3xl font-bold text-white mb-12 relative px-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Popular Restaurants
            </span>
            <div className="absolute -bottom-2 left-8 w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          </h2>
          <ScrollableSection title="popular-restaurants">
            {restaurant.restarants?.map((item) => (
              <div key={item.id} className="flex-none w-80">
                <RestaurantCard
                  item={item}
                  // Optional custom styling could be passed as props if needed in RestaurantCard
                />
              </div>
            ))}
          </ScrollableSection>
        </section>
      </FadeInSection>
    </div>
  );
};
