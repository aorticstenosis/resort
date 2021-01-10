import React, { Component } from "react";
// import item from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomsProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  //get data from contentful
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort",
        order: "sys.createdAt",
      });
      console.log(response);
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getData();
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

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRoom
    );
  };
  filterRoom = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    //get all the rooms
    let tempRoom = [...rooms];

    //parse value
    capacity = parseInt(capacity);
    price = parseInt(price);
    //filter by type
    if (type !== "all") {
      tempRoom = tempRoom.filter((room) => room.type === type);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRoom = tempRoom.filter((room) => room.capacity >= capacity);
    }
    //filter by price
    tempRoom = tempRoom.filter((room) => room.price <= price);

    //filter by room size
    tempRoom = tempRoom.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    tempRoom = tempRoom.filter((room) => room.breakfast === true);

    //filter by pets
    tempRoom = tempRoom.filter((room) => room.pets === true);
    this.setState({ sortedRooms: tempRoom });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomsProvider, RoomConsumer, RoomContext };
