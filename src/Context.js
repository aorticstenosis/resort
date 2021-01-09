import React, { Component } from "react";
import item from "./data";

const RoomContext = React.createContext();

class RoomsProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
  };
  //get data
  componentDidMount() {
    let rooms = this.formatData(item);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    this.setState({ rooms, featuredRooms, sortedRooms: rooms, loading: false });
  }
  formatData(data) {
    let tempItems = data.map((items) => {
      let id = items.sys.id;
      let images = items.fields.images.map((image) => image.fields.file.url);
      let room = { ...items.fields, id, images };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRoom = [...this.state.rooms];
    const eachRoom = tempRoom.find((room) => room.slug === slug);
    return eachRoom;
  };
  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomsProvider, RoomConsumer, RoomContext };
