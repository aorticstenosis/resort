import React, { Component } from "react";
import { RoomContext } from "../Context";
import Loading from "./Loading";
import RoomComponent from "./RoomComponent";
import Title from "./Title";

//the context needs to be assessed by the whole app, hence using Context API
export default class FeaturedRoom extends Component {
  static contextType = RoomContext;

  render() {
    let { loading, featuredRooms: rooms } = this.context;
    rooms = rooms.map((room) => {
      return <RoomComponent key={room.id} room={room} />;
    });

    return (
      <section className="featured-rooms">
        <Title title="Featured Rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
