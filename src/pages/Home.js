import React from "react";
import { Link } from "react-router-dom";
import Banner from "../component/Banner";
import Hero from "../component/Hero";
import Services from "../component/Services";
import FeaturedRoom from "../component/FeaturedRoom";

export default function Home() {
  return (
    <>
      <Hero>
        <Banner title="luxurious room" subtitle="deluxe rooms starting at $299">
          <Link to="/rooms" className="btn-primary">
            OUR ROOMS
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRoom />
    </>
  );
}
