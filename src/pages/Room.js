import React from "react";
import { Link } from "react-router-dom";
import Banner from "../component/Banner";
import Hero from "../component/Hero";
import RoomContainer from "../component/RoomContainer";

export default function Room() {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="OUR ROOMS">
          <Link to="/" className="btn-primary">
            return Home
          </Link>
        </Banner>
      </Hero>
      <RoomContainer />
    </>
  );
}
