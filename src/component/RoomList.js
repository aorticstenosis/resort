import React from "react";
import RoomComponent from "./RoomComponent";

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately no room matches your search filters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((item) => {
          return <RoomComponent key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
}
