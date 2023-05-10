import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";

import AllListings from "../components/AllListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />

      <AllListings />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
